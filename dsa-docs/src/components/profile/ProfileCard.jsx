import { getJudgeProblems } from '../../data/judge/index.js';
import { Award, CheckCircle, Calendar, Trophy, BookOpen, Brain } from 'lucide-react';

export default function ProfileCard({ profile, progressData = {} }) {
  if (!profile) {
    return (
      <div className="p-8 text-center bg-white/5 rounded-2xl border border-[var(--mcq-border)] max-w-xl mx-auto">
        <p className="text-sm text-[var(--mcq-text-secondary)]">Profile not found or is set to private.</p>
      </div>
    );
  }

  // 1. Calculate solved counts by difficulty
  const judgeData = progressData.judge || { solved: {} };
  const solvedProblemIds = Object.keys(judgeData.solved || {}).filter(
    (id) => judgeData.solved[id] === 'accepted'
  );

  const judgeProblems = getJudgeProblems();
  const difficultyCounts = { Easy: 0, Medium: 0, Hard: 0 };
  const difficultyTotals = { Easy: 0, Medium: 0, Hard: 0 };

  judgeProblems.forEach((p) => {
    const diff = p.difficulty || 'Easy';
    if (diff in difficultyTotals) {
      difficultyTotals[diff] += 1;
      if (solvedProblemIds.includes(p.id)) {
        difficultyCounts[diff] += 1;
      }
    }
  });

  const totalProblemsCount = judgeProblems.length;
  const totalSolvedCount = solvedProblemIds.length;

  // 2. MCQ Data
  const mcqData = progressData.mcq || {};
  const totalMcqAnswered = mcqData.totalAnswered || 0;
  const mcqAccuracy = totalMcqAnswered > 0 ? Math.round(((mcqData.totalCorrect || 0) / totalMcqAnswered) * 100) : 0;
  const level = mcqData.level || 1;
  const xp = mcqData.xp || 0;

  // 3. Plans Data
  const plansData = progressData.plans || { active: [], progress: {} };
  const activePlans = plansData.active || [];
  
  // Format join date
  const joinDate = new Date(profile.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Profile Header */}
      <div className="relative p-6 rounded-2xl border border-[var(--mcq-border)] bg-[var(--mcq-surface-20)]/80 backdrop-blur-md shadow-xl flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.username}
              className="w-20 h-20 rounded-full border-2 border-blue-500/30 object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-500/10 border-2 border-blue-500/30 text-blue-400 flex items-center justify-center text-3xl font-extrabold font-mono">
              {profile.username?.slice(0, 2).toUpperCase()}
            </div>
          )}
          <span className="absolute bottom-0 right-0 px-2 py-0.5 bg-blue-500 text-white text-[0.65rem] font-bold rounded-full font-mono">
            Lvl {level}
          </span>
        </div>

        <div className="text-center sm:text-left flex-1 space-y-1">
          <h1 className="text-2xl font-black text-[var(--mcq-text-primary)]">@{profile.username}</h1>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-xs text-[var(--mcq-text-muted)]">
            <span className="flex items-center gap-1">
              <Calendar size={13} /> Joined {joinDate}
            </span>
            <span className="flex items-center gap-1">
              <Trophy size={13} className="text-yellow-400" /> {xp} XP
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DSA Coding Stats */}
        <div className="p-6 rounded-2xl border border-[var(--mcq-border)] bg-[var(--mcq-surface-20)]/50 backdrop-blur-sm space-y-4">
          <h2 className="text-sm font-bold text-[var(--mcq-text-primary)] flex items-center gap-2 border-b border-[var(--mcq-border)]/50 pb-2">
            <Brain size={16} className="text-indigo-400" /> Coding Progress
          </h2>
          
          <div className="space-y-4 py-2">
            {/* Solved stats banner */}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[var(--mcq-text-primary)]">{totalSolvedCount}</span>
              <span className="text-xs text-[var(--mcq-text-muted)]">/ {totalProblemsCount} solved</span>
            </div>

            {/* Easy Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-emerald-400">Easy</span>
                <span className="text-[var(--mcq-text-secondary)]">{difficultyCounts.Easy} / {difficultyTotals.Easy}</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--mcq-border)] overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${(difficultyCounts.Easy / (difficultyTotals.Easy || 1)) * 100}%` }}
                />
              </div>
            </div>

            {/* Medium Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-amber-400">Medium</span>
                <span className="text-[var(--mcq-text-secondary)]">{difficultyCounts.Medium} / {difficultyTotals.Medium}</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--mcq-border)] overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${(difficultyCounts.Medium / (difficultyTotals.Medium || 1)) * 100}%` }}
                />
              </div>
            </div>

            {/* Hard Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-red-400">Hard</span>
                <span className="text-[var(--mcq-text-secondary)]">{difficultyCounts.Hard} / {difficultyTotals.Hard}</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--mcq-border)] overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full transition-all duration-500"
                  style={{ width: `${(difficultyCounts.Hard / (difficultyTotals.Hard || 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* MCQ Stats */}
        <div className="p-6 rounded-2xl border border-[var(--mcq-border)] bg-[var(--mcq-surface-20)]/50 backdrop-blur-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-[var(--mcq-text-primary)] flex items-center gap-2 border-b border-[var(--mcq-border)]/50 pb-2">
              <Award size={16} className="text-blue-400" /> MCQ Quiz Analytics
            </h2>

            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="p-3 bg-[var(--mcq-surface-30)]/80 rounded-xl border border-[var(--mcq-border)]/50 text-center">
                <span className="text-xl font-black text-blue-400 block">{totalMcqAnswered}</span>
                <span className="text-[0.65rem] font-bold text-[var(--mcq-text-muted)] uppercase tracking-wider">Answered</span>
              </div>
              <div className="p-3 bg-[var(--mcq-surface-30)]/80 rounded-xl border border-[var(--mcq-border)]/50 text-center">
                <span className="text-xl font-black text-emerald-400 block">{mcqAccuracy}%</span>
                <span className="text-[0.65rem] font-bold text-[var(--mcq-text-muted)] uppercase tracking-wider">Accuracy</span>
              </div>
            </div>
          </div>

          {/* Earned achievements mini summary */}
          <div className="space-y-2">
            <span className="text-xs text-[var(--mcq-text-secondary)] font-semibold block">Achievements Unlocked</span>
            {mcqData.achievements && mcqData.achievements.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {mcqData.achievements.slice(0, 5).map((ach) => (
                  <span
                    key={ach.id}
                    title={`${ach.name}: ${ach.desc}`}
                    className="w-8 h-8 rounded-lg bg-[var(--mcq-surface-30)] border border-[var(--mcq-border)]/50 flex items-center justify-center text-lg cursor-help transition-transform hover:scale-110"
                  >
                    {ach.icon}
                  </span>
                ))}
                {mcqData.achievements.length > 5 && (
                  <span className="h-8 px-2 rounded-lg bg-[var(--mcq-surface-30)] border border-[var(--mcq-border)]/50 flex items-center justify-center text-[0.65rem] font-bold text-[var(--mcq-text-muted)]">
                    +{mcqData.achievements.length - 5} more
                  </span>
                )}
              </div>
            ) : (
              <span className="text-xs text-[var(--mcq-text-muted)] italic">No achievements unlocked yet.</span>
            )}
          </div>
        </div>
      </div>

      {/* Active Study Plans */}
      <div className="p-6 rounded-2xl border border-[var(--mcq-border)] bg-[var(--mcq-surface-20)]/50 backdrop-blur-sm space-y-4">
        <h2 className="text-sm font-bold text-[var(--mcq-text-primary)] flex items-center gap-2 border-b border-[var(--mcq-border)]/50 pb-2">
          <BookOpen size={16} className="text-amber-400" /> Active Study Plans
        </h2>

        {activePlans.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activePlans.map((planId) => {
              const planProg = plansData.progress[planId] || { done: {} };
              const doneCount = Object.keys(planProg.done || {}).length;
              
              // We don't have the plan definition eagerly available inside the component unless we hardcode names,
              // but we can generate a friendly title based on planId.
              const formattedName = planId
                .replace(/-/g, ' ')
                .split(' ')
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ');

              return (
                <div key={planId} className="p-4 bg-[var(--mcq-surface-30)]/80 rounded-xl border border-[var(--mcq-border)]/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--mcq-text-primary)] truncate max-w-[70%]">{formattedName}</span>
                    <span className="text-[0.65rem] px-2 py-0.5 bg-amber-400/10 text-amber-400 font-bold rounded-full">
                      {doneCount} tasks done
                    </span>
                  </div>
                  
                  {/* Join date of the plan */}
                  {planProg.startedAt && (
                    <span className="text-[0.65rem] text-[var(--mcq-text-muted)] block">
                      Started: {new Date(planProg.startedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-xs text-[var(--mcq-text-muted)] italic">No active study plans found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
