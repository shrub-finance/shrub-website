'use client';

import { useEffect, useRef } from 'react';

/**
 * The universe behind the story: a fixed canvas of drifting stars that brighten and pull toward
 * the cursor. Pointer-events off; touch-only devices get the stars without the glow.
 */
export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let active = true;
    const mouse = { x: -200, y: -200 };
    const isHoverCapable = !window.matchMedia('(hover: none)').matches;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 500 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.2,
      speed: 0.002 + Math.random() * 0.006,
      phase: Math.random() * Math.PI * 2,
    }));

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    if (isHoverCapable) document.addEventListener('mousemove', onMouseMove);

    let animId = 0;
    const draw = () => {
      if (!active) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.phase += s.speed;
        let opacity = ((Math.sin(s.phase) + 1) / 2) * 0.6;
        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const proximity = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 180);
        opacity = Math.min(1, opacity + proximity * 0.7);
        const r = Math.round(255 - proximity * (255 - 56));
        const g = Math.round(255 - proximity * (255 - 246));
        const b = Math.round(255 - proximity * (255 - 201));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r + proximity * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
        ctx.fill();
      }
      if (isHoverCapable && mouse.x > 0 && mouse.y > 0) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
        grad.addColorStop(0, 'rgba(56, 246, 201, 0.18)');
        grad.addColorStop(0.3, 'rgba(56, 246, 201, 0.08)');
        grad.addColorStop(0.6, 'rgba(56, 246, 201, 0.03)');
        grad.addColorStop(1, 'rgba(56, 246, 201, 0)');
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      active = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="stars" />;
}
