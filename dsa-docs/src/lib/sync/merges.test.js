import { describe, test, expect } from 'vitest';
import { mergeJudge, mergePlans, mergeMcq } from './merges';

describe('mergeJudge', () => {
  test('fresh-account (empty both)', () => {
    const res = mergeJudge({}, {});
    expect(res.solved).toEqual({});
    expect(res.drafts).toEqual({});
    expect(res.submissions).toEqual({});
  });

  test('empty-local', () => {
    const remote = {
      solved: { 'two-sum': 'accepted' },
      drafts: { 'two-sum': { javascript: 'console.log("hello");' } },
      submissions: { 'two-sum': [{ ts: 1000, verdict: 'accepted' }] }
    };
    const res = mergeJudge({}, remote);
    expect(res).toEqual(remote);
  });

  test('empty-remote', () => {
    const local = {
      solved: { 'two-sum': 'accepted' },
      drafts: { 'two-sum': { javascript: 'console.log("hello");' } },
      submissions: { 'two-sum': [{ ts: 1000, verdict: 'accepted' }] }
    };
    const res = mergeJudge(local, {});
    expect(res).toEqual(local);
  });

  test('two-device-conflict: solved status and drafts', () => {
    const deviceA = {
      solved: { 'two-sum': 'attempted', 'three-sum': 'accepted' },
      drafts: {
        'two-sum': { javascript: { code: 'A', timestamp: 100 } }
      },
      submissions: {}
    };
    const deviceB = {
      solved: { 'two-sum': 'accepted', 'three-sum': 'attempted' },
      drafts: {
        'two-sum': { javascript: { code: 'B', timestamp: 200 } }
      },
      submissions: {}
    };
    
    const res = mergeJudge(deviceA, deviceB);
    
    // accepted should win over attempted
    expect(res.solved['two-sum']).toBe('accepted');
    expect(res.solved['three-sum']).toBe('accepted');
    
    // timestamp 200 should win over 100
    expect(res.drafts['two-sum'].javascript.code).toBe('B');
  });

  test('two-device-conflict: submissions union and deduplication', () => {
    const deviceA = {
      submissions: {
        'two-sum': [
          { ts: 100, verdict: 'wrong_answer' },
          { ts: 200, verdict: 'time_limit_exceeded' }
        ]
      }
    };
    const deviceB = {
      submissions: {
        'two-sum': [
          { ts: 200, verdict: 'accepted' }, // overlapping timestamp, accepted version preferred or later
          { ts: 300, verdict: 'accepted' }
        ]
      }
    };
    const res = mergeJudge(deviceA, deviceB);
    const subs = res.submissions['two-sum'];
    
    expect(subs.length).toBe(3);
    // sorted descending by timestamp
    expect(subs[0].ts).toBe(300);
    expect(subs[1].ts).toBe(200);
    expect(subs[2].ts).toBe(100);
    // overlapping timestamp deduplication should keep the preferred/accepted entry
    expect(subs[1].verdict).toBe('accepted');
  });
});

describe('mergePlans', () => {
  test('empty both', () => {
    const res = mergePlans({}, {});
    expect(res.active).toEqual([]);
    expect(res.progress).toEqual({});
  });

  test('two-device-conflict: union completed items and earliest start', () => {
    const local = {
      active: ['plan-1'],
      progress: {
        'plan-1': { startedAt: 1000, lastTouched: 2000, done: { '1:1': true } }
      }
    };
    const remote = {
      active: ['plan-1', 'plan-2'],
      progress: {
        'plan-1': { startedAt: 800, lastTouched: 2200, done: { '1:2': true } }
      }
    };
    const res = mergePlans(local, remote);
    
    expect(res.active).toContain('plan-1');
    expect(res.active).toContain('plan-2');
    
    const p1 = res.progress['plan-1'];
    expect(p1.startedAt).toBe(800); // min startedAt
    expect(p1.lastTouched).toBe(2200); // max lastTouched
    expect(p1.done).toEqual({ '1:1': true, '1:2': true }); // unioned done map
  });
});

describe('mergeMcq', () => {
  test('empty both', () => {
    const res = mergeMcq({}, {});
    expect(res.answeredQuestions).toEqual([]);
    expect(res.totalAnswered).toBe(0);
  });

  test('merging accuracy, xp and answered list', () => {
    const local = {
      xp: 200,
      level: 2,
      bestStreak: 5,
      currentStreak: 3,
      lastActive: 1000,
      answeredQuestions: [
        { id: 1, correct: true, timestamp: 100 },
        { id: 2, correct: false, timestamp: 200 }
      ],
      categoryProgress: {
        javascript: { answered: 2, correct: 1, topics: { Variables: { answered: 2, correct: 1 } } }
      }
    };
    const remote = {
      xp: 300,
      level: 3,
      bestStreak: 8,
      currentStreak: 1,
      lastActive: 1200,
      answeredQuestions: [
        { id: 2, correct: true, timestamp: 220 }, // Q2 answered correctly later on remote
        { id: 3, correct: true, timestamp: 300 }
      ],
      categoryProgress: {
        javascript: { answered: 1, correct: 1, topics: { Variables: { answered: 1, correct: 1 } } }
      }
    };

    const res = mergeMcq(local, remote);
    
    expect(res.xp).toBe(300); // Max XP
    expect(res.level).toBe(3); // Max Level
    expect(res.bestStreak).toBe(8); // Max bestStreak
    expect(res.currentStreak).toBe(1); // currentStreak of more active device
    
    // Q2 should be correct in merged results (correct beats wrong)
    const q2 = res.answeredQuestions.find(q => q.id === 2);
    expect(q2.correct).toBe(true);
    
    expect(res.totalAnswered).toBe(3); // Questions 1, 2, 3
    expect(res.totalCorrect).toBe(3); // All 3 correct now
  });
});
