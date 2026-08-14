import React, { useEffect, useRef } from 'react';

/**
 * The universe behind the story — a fixed canvas of drifting stars that
 * brighten and pull toward the cursor. Ported from the app's gate page.
 * Pointer-events off; touch-only devices get the stars without the glow.
 */
const Starfield = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const activeRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    activeRef.current = true;

    // Skip mouse interaction on touch-only devices, but always render stars
    const isHoverCapable = !window.matchMedia('(hover: none)').matches;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const stars = [];
    for (let i = 0; i < 500; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.2,
        speed: 0.002 + Math.random() * 0.006,
        phase: Math.random() * Math.PI * 2,
      });
    }

    function onMouseMove(e) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }
    if (isHoverCapable) {
      document.addEventListener('mousemove', onMouseMove);
    }

    let animId;

    function draw() {
      if (!activeRef.current) return;
      const { x: mouseX, y: mouseY } = mouseRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of stars) {
        s.phase += s.speed;
        let opacity = (Math.sin(s.phase) + 1) / 2 * 0.6;
        const dx = s.x - mouseX;
        const dy = s.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / 180);
        opacity = Math.min(1, opacity + proximity * 0.7);

        const r = Math.round(255 - proximity * (255 - 56));
        const g = Math.round(255 - proximity * (255 - 246));
        const b = Math.round(255 - proximity * (255 - 201));
        const radius = s.r + proximity * 1.2;

        ctx.beginPath();
        ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
        ctx.fill();
      }

      if (isHoverCapable && mouseX > 0 && mouseY > 0) {
        const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 180);
        grad.addColorStop(0, 'rgba(56, 246, 201, 0.18)');
        grad.addColorStop(0.3, 'rgba(56, 246, 201, 0.08)');
        grad.addColorStop(0.6, 'rgba(56, 246, 201, 0.03)');
        grad.addColorStop(1, 'rgba(56, 246, 201, 0)');
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 180, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      activeRef.current = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="stars" />;
};

export default Starfield;
