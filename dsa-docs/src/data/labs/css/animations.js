// ─── CSS Labs — Animations Data ───

import { testContains, testRegex } from "./validators.js";

export const CSS_ANIMATIONS = [
  {
    id: "anim-hover-effects",
    title: "Hover Effects",
    overview: "Create 5 different hover effects: lift, glow, scale, border slide, and icon rotate.",
    starterCode: `<div class="hover-lift">Lift</div>
<div class="hover-glow">Glow</div>
<div class="hover-scale">Scale</div>
<div class="hover-border">Border</div>`,
    solution: `.hover-lift, .hover-glow, .hover-scale, .hover-border {
  display: inline-block; padding: 1rem 2rem; background: #6366f1; color: white;
  border-radius: 8px; font-weight: 600; cursor: pointer; margin: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.hover-lift:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(99,102,241,0.3); }
.hover-glow:hover { box-shadow: 0 0 20px rgba(99,102,241,0.5); }
.hover-scale:hover { transform: scale(1.1); }
.hover-border { background: transparent; border: 2px solid #6366f1; color: #6366f1; }
.hover-border:hover { background: #6366f1; color: white; }`,
  },
  {
    id: "anim-loading-spinners",
    title: "Loading Spinners",
    overview: "Create 3 different loading spinners using CSS animations: circular, dots, and pulse.",
    starterCode: `<div class="spinner-circle"></div>
<div class="spinner-dots"><span></span><span></span><span></span></div>
<div class="spinner-pulse"></div>`,
    solution: `@keyframes spin { to { transform: rotate(360deg); } }
@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
@keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }

.spinner-circle {
  width: 40px; height: 40px; border: 4px solid #e2e8f0;
  border-top-color: #6366f1; border-radius: 50%;
  animation: spin 0.8s linear infinite; margin: 1rem;
}
.spinner-dots { display: flex; gap: 6px; margin: 1rem; }
.spinner-dots span {
  width: 12px; height: 12px; background: #6366f1;
  border-radius: 50%; animation: bounce 1s ease-in-out infinite;
}
.spinner-dots span:nth-child(2) { animation-delay: 0.15s; }
.spinner-dots span:nth-child(3) { animation-delay: 0.3s; }
.spinner-pulse {
  width: 40px; height: 40px; background: #6366f1;
  border-radius: 50%; animation: pulse 1.5s ease-in-out infinite; margin: 1rem;
}`,
  },
  {
    id: "anim-skeleton",
    title: "Skeleton Loaders",
    overview: "Create skeleton loading states for cards, text lines, and avatars using CSS gradients and animation.",
    starterCode: `<div class="skeleton-card">
  <div class="skeleton skeleton-img"></div>
  <div class="skeleton skeleton-text"></div>
  <div class="skeleton skeleton-text short"></div>
</div>`,
    solution: `@keyframes shimmer { 0% { background-position: -200px 0; } 100% { background-position: calc(200px + 100%) 0; } }
.skeleton {
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 37%, #f1f5f9 63%);
  background-size: 200px 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 4px;
}
.skeleton-card { padding: 1rem; background: white; border-radius: 12px; width: 300px; }
.skeleton-img { width: 100%; height: 150px; margin-bottom: 1rem; }
.skeleton-text { height: 14px; margin-bottom: 0.5rem; width: 100%; }
.skeleton-text.short { width: 60%; }`,
  },
  {
    id: "anim-page-transitions",
    title: "Page Transitions",
    overview: "Create page-level transition effects: fade-in, slide-up, blur-in, and staggered list animations.",
    starterCode: `<div class="fade-in">Fade In</div>
<div class="slide-up">Slide Up</div>
<ul class="stagger">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>`,
    solution: `@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes blurIn { from { opacity: 0; filter: blur(10px); } to { opacity: 1; filter: blur(0); } }

.fade-in { animation: fadeIn 0.5s ease; }
.slide-up { animation: slideUp 0.6s ease-out; }
.blur-in { animation: blurIn 0.5s ease; }
.stagger { list-style: none; padding: 0; }
.stagger li {
  padding: 0.75rem; background: #f1f5f9; margin-bottom: 0.5rem; border-radius: 8px;
  opacity: 0; animation: slideUp 0.4s ease forwards;
}
.stagger li:nth-child(1) { animation-delay: 0.1s; }
.stagger li:nth-child(2) { animation-delay: 0.2s; }
.stagger li:nth-child(3) { animation-delay: 0.3s; }`,
  },
  {
    id: "anim-keyframes",
    title: "CSS Keyframes Masterclass",
    overview: "Create 4 advanced @keyframes animations: float, shake, gradient shift, and typing effect.",
    starterCode: `<div class="float">Floating</div>
<div class="shake">Shake</div>
<div class="gradient-bg">Gradient</div>
<div class="typewriter">Typing effect</div>`,
    solution: `@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
@keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
@keyframes typing { from { width: 0; } to { width: 100%; } }
@keyframes blink { 50% { border-color: transparent; } }

.float { animation: float 3s ease-in-out infinite; padding: 1rem; }
.shake:hover { animation: shake 0.5s ease-in-out; }
.gradient-bg {
  padding: 2rem; color: white; font-weight: 700;
  background: linear-gradient(135deg, #6366f1, #ec4899, #f59e0b);
  background-size: 200% 200%; animation: gradientShift 4s ease infinite;
  border-radius: 12px; text-align: center;
}
.typewriter {
  overflow: hidden; white-space: nowrap; border-right: 2px solid #6366f1;
  animation: typing 3s steps(30) forwards, blink 0.8s step-end infinite;
  max-width: fit-content;
}`,
  },
  {
    id: "anim-interactive",
    title: "Interactive Components",
    overview: "Build animated interactive components: an animated toggle switch, progress bar, notification toast, and button ripple effect.",
    starterCode: `<label class="toggle"><input type="checkbox" /><span class="toggle-slider"></span></label>
<div class="progress-bar"><div class="progress-fill" style="width: 60%"></div></div>
<div class="toast">Notification</div>`,
    solution: `.toggle { position: relative; display: inline-block; width: 50px; height: 28px; cursor: pointer; }
.toggle input { opacity: 0; width: 0; height: 0; }
.toggle-slider {
  position: absolute; inset: 0; background: #cbd5e1; border-radius: 28px;
  transition: background 0.3s, transform 0.3s;
}
.toggle-slider::after {
  content: ""; position: absolute; top: 3px; left: 3px;
  width: 22px; height: 22px; background: white; border-radius: 50%;
  transition: transform 0.3s;
}
.toggle input:checked + .toggle-slider { background: #6366f1; }
.toggle input:checked + .toggle-slider::after { transform: translateX(22px); }

.progress-bar { width: 300px; height: 8px; background: #e2e8f0; border-radius: 8px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(90deg, #6366f1, #8b5cf6); border-radius: 8px; transition: width 0.5s ease; position: relative; }
.progress-fill::after { content: ""; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); animation: shimmer 2s infinite; }

@keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
.toast {
  padding: 0.75rem 1.5rem; background: #1e293b; color: white;
  border-radius: 8px; font-weight: 500;
  animation: slideInRight 0.3s ease-out;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}`,
  },
];
