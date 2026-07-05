import { describe, it, expect } from 'vitest';
import { schedule } from './sm2';

describe('SM-2 Scheduler', () => {
  const now = 1783262866000; // static base timestamp

  it('should initialize empty card correctly', () => {
    const card = schedule(null, 2, now); // Good grade
    expect(card.reps).toBe(1);
    expect(card.intervalDays).toBe(1);
    expect(card.ease).toBe(2.5);
    expect(card.dueTs).toBe(now + 1 * 24 * 60 * 60 * 1000);
  });

  it('should handle "Again" (grade 0) correctly', () => {
    const startCard = { reps: 3, intervalDays: 6, ease: 2.5, lapses: 0, dueTs: now };
    const card = schedule(startCard, 0, now);
    expect(card.reps).toBe(0);
    expect(card.intervalDays).toBe(0);
    expect(card.ease).toBe(2.3);
    expect(card.lapses).toBe(1);
    expect(card.dueTs).toBe(now + 10 * 60 * 1000); // 10 mins
  });

  it('should enforce ease floor of 1.3', () => {
    const startCard = { reps: 3, intervalDays: 6, ease: 1.4, lapses: 0, dueTs: now };
    const card = schedule(startCard, 0, now);
    expect(card.ease).toBe(1.3);
  });

  it('should schedule next reps correctly', () => {
    // Rep 1 -> Rep 2 (Good)
    const card1 = { reps: 1, intervalDays: 1, ease: 2.5, lapses: 0, dueTs: now };
    const result1 = schedule(card1, 2, now); // Good
    expect(result1.intervalDays).toBe(3);
    expect(result1.reps).toBe(2);

    // Rep 1 -> Rep 2 (Easy)
    const result1Easy = schedule(card1, 3, now); // Easy
    expect(result1Easy.intervalDays).toBe(4);

    // Rep 2 -> Rep 3 (Good)
    const card2 = { reps: 2, intervalDays: 3, ease: 2.5, lapses: 0, dueTs: now };
    const result2 = schedule(card2, 2, now); // Good
    // interval = Math.round(3 * 2.5 * 1) = 8
    expect(result2.intervalDays).toBe(8);

    // Rep 2 -> Rep 3 (Hard)
    const result2Hard = schedule(card2, 1, now); // Hard
    // ease = 2.5 - 0.15 = 2.35
    // interval = Math.round(3 * 2.35 * 0.8) = Math.round(5.64) = 6
    expect(result2Hard.ease).toBe(2.35);
    expect(result2Hard.intervalDays).toBe(6);
  });
});
