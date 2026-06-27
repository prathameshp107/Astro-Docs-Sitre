// ─── Barrel export — re-exports from per-technology files ──────────────
import { JS_QUESTIONS } from './interview-questions/js.js';
import { REACT_QUESTIONS } from './interview-questions/react.js';
import { NEXT_QUESTIONS } from './interview-questions/next.js';
import { ANGULAR_QUESTIONS } from './interview-questions/angular.js';
import { CSS_QUESTIONS } from './interview-questions/css.js';
import { DOCKER_QUESTIONS } from './interview-questions/docker.js';
import { DSA_QUESTIONS } from './interview-questions/dsa.js';
import { HTML_QUESTIONS } from './interview-questions/html.js';
import { MONGODB_QUESTIONS } from './interview-questions/mongodb.js';
import { MYSQL_QUESTIONS } from './interview-questions/mysql.js';
import { NODEJS_QUESTIONS } from './interview-questions/nodejs.js';
import { OOPS_QUESTIONS } from './interview-questions/oops.js';
import { PYTHON_QUESTIONS } from './interview-questions/python.js';
import { REDIS_QUESTIONS } from './interview-questions/redis.js';

export {
  JS_QUESTIONS, REACT_QUESTIONS, NEXT_QUESTIONS,
  ANGULAR_QUESTIONS, CSS_QUESTIONS, DOCKER_QUESTIONS, DSA_QUESTIONS,
  HTML_QUESTIONS, MONGODB_QUESTIONS, MYSQL_QUESTIONS, NODEJS_QUESTIONS,
  OOPS_QUESTIONS, PYTHON_QUESTIONS, REDIS_QUESTIONS
};

export const TABS = [
  { id: "js", label: "JavaScript", accent: "#f7df1e", dim: "#3a3308", questions: JS_QUESTIONS },
  { id: "react", label: "React", accent: "#61dafb", dim: "#0b2f3a", questions: REACT_QUESTIONS },
  { id: "next", label: "Next.js", accent: "#ffffff", dim: "#1e2030", questions: NEXT_QUESTIONS },
  { id: "angular", label: "Angular", accent: "#dd0031", dim: "#2d000a", questions: ANGULAR_QUESTIONS },
  { id: "nodejs", label: "Node.js", accent: "#68a063", dim: "#0d2b0a", questions: NODEJS_QUESTIONS },
  { id: "python", label: "Python", accent: "#306998", dim: "#091a33", questions: PYTHON_QUESTIONS },
  { id: "css", label: "CSS", accent: "#1572b6", dim: "#08233a", questions: CSS_QUESTIONS },
  { id: "html", label: "HTML", accent: "#e34f26", dim: "#2d0f05", questions: HTML_QUESTIONS },
  { id: "dsa", label: "DSA", accent: "#8b5cf6", dim: "#1f0d3f", questions: DSA_QUESTIONS },
  { id: "mongodb", label: "MongoDB", accent: "#47a248", dim: "#092e10", questions: MONGODB_QUESTIONS },
  { id: "mysql", label: "MySQL", accent: "#4479a1", dim: "#0f2638", questions: MYSQL_QUESTIONS },
  { id: "redis", label: "Redis", accent: "#dc382d", dim: "#2d0707", questions: REDIS_QUESTIONS },
  { id: "docker", label: "Docker", accent: "#2496ed", dim: "#05233d", questions: DOCKER_QUESTIONS },
  { id: "oops", label: "OOP", accent: "#ec4899", dim: "#2d0a1a", questions: OOPS_QUESTIONS },
];

export const STORAGE_KEY = "fiq_done";

/** Total number of interview questions across all topics */
export const TOTAL_QUESTIONS = TABS.reduce((sum, t) => sum + t.questions.length, 0);
