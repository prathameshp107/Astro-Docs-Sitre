import { getCollection } from 'astro:content';
import { DSA_PROBLEMS } from '../data/dsa-problems.js';
import { TABS } from '../data/interview-questions-data.js';
import { MCQ_CATEGORIES, getQuestionsForCategory } from '../components/mcq/MCQData.js';

export const prerender = true;

function docUrl(id) {
  return `/${id.replace(/\/index$/, '')}`;
}

function clean(text) {
  return (text || '').replace(/[`*_#>[\]()]/g, '').trim().slice(0, 160);
}

function capitalize(word) {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}

export async function GET() {
  const docs = await getCollection('docs');
  const docItems = docs.map((entry) => ({
    type: 'doc',
    title: entry.data.title,
    subtitle: clean(entry.data.description) || 'Documentation',
    url: docUrl(entry.id),
  }));

  const problemItems = DSA_PROBLEMS.map((p) => ({
    type: 'problem',
    title: `#${p.number} ${p.title}`,
    subtitle: `${p.difficulty} · ${(p.topics || []).slice(0, 3).join(', ')}`,
    url: `/dsa/problems/${p.id}`,
    tags: p.topics || [],
  }));

  const interviewItems = TABS.flatMap((tab) =>
    tab.questions.map(([question, difficulty]) => ({
      type: 'interview',
      title: question,
      subtitle: `${tab.label} · ${capitalize(difficulty)}`,
      url: `/interview-questions?tab=${tab.id}`,
    }))
  );

  const mcqItems = MCQ_CATEGORIES.flatMap((cat) =>
    getQuestionsForCategory(cat.id).map((q) => ({
      type: 'mcq',
      title: clean(q.question),
      subtitle: `${cat.name} · ${q.topic}`,
      url: `/mcq/${cat.id}`,
      tags: q.tags || [],
    }))
  );

  const items = [...docItems, ...problemItems, ...interviewItems, ...mcqItems];

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json' },
  });
}
