// Dependency-free canvas confetti burst. Fire on first-time completions.
export default function celebrate(colors = ["#4ade80", "#60a5fa", "#f59e0b", "#a78bfa", "#f472b6"]) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:99999";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const rand = (min, max) => min + Math.random() * (max - min);
  const particles = [];
  const spawn = (x, y, angle, spread, count) => {
    for (let i = 0; i < count; i++) {
      const a = angle + rand(-spread, spread);
      const speed = rand(7, 15);
      particles.push({
        x, y,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed,
        w: rand(6, 11),
        h: rand(4, 7),
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: rand(0, Math.PI * 2),
        vr: rand(-0.25, 0.25),
        life: 1,
        decay: rand(0.008, 0.016),
      });
    }
  };

  // two side cannons + center pop
  spawn(0, canvas.height * 0.75, -Math.PI / 4, 0.45, 55);
  spawn(canvas.width, canvas.height * 0.75, Math.PI + Math.PI / 4, 0.45, 55);
  spawn(canvas.width / 2, canvas.height * 0.4, -Math.PI / 2, 0.9, 40);

  let raf;
  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = 0;
    for (const p of particles) {
      if (p.life <= 0) continue;
      alive++;
      p.vy += 0.35; // gravity
      p.vx *= 0.985;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life -= p.decay;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (alive > 0) {
      raf = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(raf);
      canvas.remove();
    }
  };
  raf = requestAnimationFrame(tick);
}
