import React, { useState, useEffect, useRef, useCallback } from 'react';
import { isMobile } from 'react-device-detect';
import './Genesis.css';

const Genesis = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const canvasRef = useRef(null);
  const curRef = useRef(null);
  const curRingRef = useRef(null);
  const creedWrapRef = useRef(null);

  // ── Body class (mount/unmount) ──
  useEffect(() => {
    if (!isMobile) document.body.classList.add('genesis-active');
    return () => document.body.classList.remove('genesis-active');
  }, []);

  // ── Custom cursor ──
  useEffect(() => {
    if (isMobile) return;
    const cur = curRef.current;
    const curR = curRingRef.current;
    if (!cur || !curR) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx + 'px';
      cur.style.top = my + 'px';
    };

    const ring = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      curR.style.left = rx + 'px';
      curR.style.top = ry + 'px';
      rafId = requestAnimationFrame(ring);
    };

    const onEnter = () => { cur.classList.add('big'); curR.classList.add('big'); };
    const onLeave = () => { cur.classList.remove('big'); curR.classList.remove('big'); };

    document.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(ring);

    const onOver = (e) => {
      if (e.target.closest('a, button')) onEnter();
    };
    const onOut = (e) => {
      if (e.target.closest('a, button')) onLeave();
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // ── Flow field canvas ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H;
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();

    // Perlin noise
    const perm = new Uint8Array(512);
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

    const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (a, b, t) => a + t * (b - a);
    const grad = (h, x, y) => {
      const g = h & 3;
      const u = g < 2 ? x : y, v = g < 2 ? y : x;
      return (g & 1 ? -u : u) + (g & 2 ? -v : v);
    };

    const noise = (x, y) => {
      const xi = Math.floor(x) & 255, yi = Math.floor(y) & 255;
      const xf = x - Math.floor(x), yf = y - Math.floor(y);
      const u = fade(xf), v = fade(yf);
      const aa = perm[perm[xi] + yi], ab = perm[perm[xi] + yi + 1];
      const ba = perm[perm[xi + 1] + yi], bb = perm[perm[xi + 1] + yi + 1];
      return lerp(
        lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u),
        lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u), v
      );
    };

    const flowAngle = (x, y, t) => {
      const scale = 0.0022;
      const eps = 0.4;
      const n1 = noise(x * scale + t * 0.12, y * scale + t * 0.08);
      const n2 = noise(x * scale + eps, y * scale + t * 0.08);
      const n3 = noise(x * scale + t * 0.12, y * scale + eps);
      const dx = (n3 - n1) / eps;
      const dy = -(n2 - n1) / eps;
      return Math.atan2(dy, dx);
    };

    const PARTICLE_COUNT = isMobile ? 400 : 1400;
    let particles = [];

    const initParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        age: Math.random() * 120,
        maxAge: 80 + Math.random() * 100,
        speed: 0.8 + Math.random() * 1.2,
        alpha: 0,
      }));
    };
    initParticles();

    let t = 0;
    const BG_COLOR = '#080e0b';
    const LINE_COLOR = [56, 246, 201];
    let animId;

    const step = () => {
      t += 0.003;
      ctx.fillStyle = 'rgba(8, 14, 11, 0.045)';
      ctx.fillRect(0, 0, W, H);

      particles.forEach((pt) => {
        const angle = flowAngle(pt.x, pt.y, t);
        const vx = Math.cos(angle) * pt.speed;
        const vy = Math.sin(angle) * pt.speed;

        const lifeRatio = pt.age / pt.maxAge;
        const alpha = lifeRatio < 0.15
          ? lifeRatio / 0.15
          : lifeRatio > 0.85
            ? (1 - lifeRatio) / 0.15
            : 1;
        const opacity = alpha * 0.38;

        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
        pt.x += vx;
        pt.y += vy;
        ctx.lineTo(pt.x, pt.y);
        ctx.strokeStyle = `rgba(${LINE_COLOR[0]},${LINE_COLOR[1]},${LINE_COLOR[2]},${opacity})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();

        pt.age++;

        if (pt.age > pt.maxAge || pt.x < -20 || pt.x > W + 20 || pt.y < -20 || pt.y > H + 20) {
          pt.x = Math.random() * W;
          pt.y = Math.random() * H;
          pt.age = 0;
          pt.maxAge = 80 + Math.random() * 100;
          pt.speed = 0.8 + Math.random() * 1.2;
        }
      });

      animId = requestAnimationFrame(step);
    };

    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, W, H);
    animId = requestAnimationFrame(step);

    const onResize = () => { resize(); initParticles(); };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // ── Scroll reveal ──
  useEffect(() => {
    const els = document.querySelectorAll('.genesis-reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('on'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ── Creed animation ──
  useEffect(() => {
    const wrap = creedWrapRef.current;
    if (!wrap) return;

    let creedDone = false;
    const timeouts = [];

    const animCreed = (lines, i) => {
      if (i >= lines.length) return;
      lines[i].classList.add('on');
      const tid = setTimeout(() => animCreed(lines, i + 1), 650);
      timeouts.push(tid);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !creedDone) {
        creedDone = true;
        const lines = wrap.querySelectorAll('[data-creed]');
        const tid = setTimeout(() => animCreed(lines, 0), 300);
        timeouts.push(tid);
      }
    }, { threshold: 0.45 });

    observer.observe(wrap);
    return () => {
      observer.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, []);

  // ── Modal Escape key + body overflow ──
  useEffect(() => {
    if (!modalOpen) return;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  const handleEnterClick = useCallback((e) => {
    e.preventDefault();
    setModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) setModalOpen(false);
  }, []);

  return (
    <div className="genesis-page">
      {/* Custom cursor (desktop only) */}
      {!isMobile && (
        <>
          <div className="genesis-cursor" ref={curRef} />
          <div className="genesis-cursor-ring" ref={curRingRef} />
        </>
      )}

      {/* Flow field canvas */}
      <canvas id="genesis-flow" ref={canvasRef} />

      <div className="genesis-wrapper">
        {/* HERO */}
        <section className="genesis-hero">
          <p className="genesis-hero-label">Base Sepolia &nbsp;&middot;&nbsp; Five Seats &nbsp;&middot;&nbsp; Genesis Week</p>
          <h1 className="genesis-hero-title">SHRUB<br /><span>LEND</span></h1>
          <p className="genesis-hero-tag">Genesis Protocol</p>
          <div className="genesis-hero-divider">
            <div className="genesis-hero-divider-line"></div>
            <div className="genesis-hero-divider-dot"></div>
            <div className="genesis-hero-divider-dot" style={{ opacity: 0.4 }}></div>
            <div className="genesis-hero-divider-dot" style={{ opacity: 0.15 }}></div>
            <div className="genesis-hero-divider-line" style={{ transform: 'scaleX(-1)' }}></div>
          </div>
          <p className="genesis-hero-desc">
            Borrow USDC against your ETH at a <em>fixed rate</em>.<br />
            <strong>No variable surprises. No selling your assets.</strong><br />
            Built on Aave. Secured by collateral. Locked by choice.
          </p>
          <a className="genesis-enter-btn" href="#" onClick={handleEnterClick}>
            <span>Enter the Protocol</span>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M9 1l4 4-4 4M1 5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <div className="genesis-scroll-cue">
            <div className="genesis-scroll-cue-line"></div>
            <div className="genesis-scroll-cue-txt">scroll</div>
          </div>
        </section>

        {/* PROTOCOL TIERS */}
        <div className="genesis-page-section">
          <div className="genesis-sec-label genesis-reveal">The Engine</div>
          <h2 className="genesis-sec-title genesis-reveal">
            Four tiers. Four fixed rates.<br />
            <em>Your rate locks at entry.</em><br />
            <strong>It never changes.</strong>
          </h2>
          <div className="genesis-tiers genesis-reveal">
            <div className="genesis-tier">
              <div className="genesis-tier-bar"></div>
              <div className="genesis-tier-rate">0%</div>
              <div className="genesis-tier-ltv">20% LTV</div>
              <div className="genesis-tier-name">Ultra Safe</div>
              <div className="genesis-tier-desc">5&times; collateral. ETH must fall 75% before any liquidation risk.</div>
              <div className="genesis-tier-safe">&minus;75% to liquidate</div>
            </div>
            <div className="genesis-tier">
              <div className="genesis-tier-bar"></div>
              <div className="genesis-tier-rate">1%</div>
              <div className="genesis-tier-ltv">25% LTV</div>
              <div className="genesis-tier-name">Conservative</div>
              <div className="genesis-tier-desc">4&times; collateral. Near-zero cost of capital for long-term holders.</div>
              <div className="genesis-tier-safe">&minus;69% to liquidate</div>
            </div>
            <div className="genesis-tier">
              <div className="genesis-tier-bar"></div>
              <div className="genesis-tier-rate">5%</div>
              <div className="genesis-tier-ltv">33.3% LTV</div>
              <div className="genesis-tier-name">Balanced</div>
              <div className="genesis-tier-desc">3&times; collateral. Enough liquidity to act on opportunity while protected.</div>
              <div className="genesis-tier-safe">&minus;59% to liquidate</div>
            </div>
            <div className="genesis-tier">
              <div className="genesis-tier-bar"></div>
              <div className="genesis-tier-rate">8%</div>
              <div className="genesis-tier-ltv">50% LTV</div>
              <div className="genesis-tier-name">Maximum Borrow</div>
              <div className="genesis-tier-desc">2&times; collateral. Maximum liquidity for disciplined operators.</div>
              <div className="genesis-tier-safe" style={{ borderColor: 'rgba(202,141,251,0.1)' }}>&minus;39% to liquidate</div>
            </div>
          </div>
          <p className="genesis-tiers-note genesis-reveal">1% origination fee &nbsp;&middot;&nbsp; no early repayment penalty &nbsp;&middot;&nbsp; built on Aave V3</p>
        </div>

        {/* CREED */}
        <section className="genesis-creed-wrap" ref={creedWrapRef}>
          <div className="genesis-creed-inner">
            <div className="genesis-creed-tag">The Creed of the Last Builders</div>
            <div className="genesis-creed-lines">
              <div className="genesis-creed-line" data-creed=""><strong>Activate</strong> the engine.</div>
              <div className="genesis-creed-line" data-creed="">Forge what <em>outlasts its builders.</em></div>
              <div className="genesis-creed-line" data-creed=""><strong>Focus</strong> is our armor.</div>
              <div className="genesis-creed-line" data-creed=""><em>Completion</em> is our signal.</div>
            </div>
          </div>
        </section>

        {/* ARCHETYPES */}
        <div className="genesis-page-section" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <div className="genesis-sec-label genesis-reveal" style={{ marginBottom: '20px' }}>The Genesis Cell</div>
          <h2 className="genesis-sec-title genesis-reveal" style={{ marginBottom: '40px' }}>Five Were Chosen</h2>
          <div className="genesis-arch-list">
            <div className="genesis-arch-row genesis-reveal">
              <div className="genesis-arch-num">01</div>
              <div><div className="genesis-arch-name">The Sentinel</div><div className="genesis-arch-role">Finds what breaks trust</div></div>
              <div className="genesis-arch-icon">🛡️</div>
            </div>
            <div className="genesis-arch-row genesis-reveal">
              <div className="genesis-arch-num">02</div>
              <div><div className="genesis-arch-name">The Explorer</div><div className="genesis-arch-role">Tests every edge, every boundary</div></div>
              <div className="genesis-arch-icon">🌑</div>
            </div>
            <div className="genesis-arch-row genesis-reveal">
              <div className="genesis-arch-num">03</div>
              <div><div className="genesis-arch-name">The Architect</div><div className="genesis-arch-role">Finds the logic flaws others miss</div></div>
              <div className="genesis-arch-icon">⚙️</div>
            </div>
            <div className="genesis-arch-row genesis-reveal">
              <div className="genesis-arch-num">04</div>
              <div><div className="genesis-arch-name">The Prime Mover</div><div className="genesis-arch-role">Stress tests until it breaks or holds</div></div>
              <div className="genesis-arch-icon">⚡</div>
            </div>
            <div className="genesis-arch-row genesis-reveal">
              <div className="genesis-arch-num">05</div>
              <div><div className="genesis-arch-name">The Witness</div><div className="genesis-arch-role">Documents the first history</div></div>
              <div className="genesis-arch-icon">📜</div>
            </div>
          </div>
        </div>

        {/* LOCKED */}
        <section className="genesis-locked-wrap">
          <div className="genesis-locked-box genesis-reveal">
            <div className="genesis-lc tl"></div>
            <div className="genesis-lc tr"></div>
            <div className="genesis-lc bl"></div>
            <div className="genesis-lc br"></div>
            <span className="genesis-locked-sym">&#9724; &#9724; &#9724;</span>
            <h2 className="genesis-locked-title">Access Is<br />By Invitation</h2>
            <p className="genesis-locked-body">
              The Genesis Cell is sealed.<br />
              If you were chosen, you have your link.<br />
              If you were not — <em>the next door opens</em><br />
              when the time comes.
            </p>
            <div className="genesis-locked-tag">Genesis Protocol &middot; Sealed</div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="genesis-footer">
          <div className="genesis-f-logo">
            <div className="genesis-f-dot"></div>
            <div className="genesis-f-name"><span>Shrub</span> Lend</div>
          </div>
          <div className="genesis-f-meta">
            Base Sepolia &middot; Genesis Week<br />
            Built on Aave V3 &middot; Fixed Rate Protocol<br />
            Last Builders Collective
          </div>
        </footer>
      </div>

      {/* MODAL */}
      <div
        className={`genesis-modal-bg ${modalOpen ? 'on' : ''}`}
        onClick={handleBackdropClick}
      >
        <div className="genesis-modal">
          <div className="genesis-mc tl"></div>
          <div className="genesis-mc tr"></div>
          <div className="genesis-mc bl"></div>
          <div className="genesis-mc br"></div>
          <span className="genesis-m-sym">&#9724; &#9724; &#9724;</span>
          <div className="genesis-m-title">Not Yet Chosen</div>
          <div className="genesis-m-body">
            The Genesis Cell is sealed at five.<br /><br />
            Each member was given a unique link.<br />
            If you have yours — use it.<br /><br />
            If you were not part of Genesis —<br />
            <em>the protocol opens publicly when the time comes.</em>
          </div>
          <button className="genesis-m-close" onClick={handleModalClose}>&larr; Return</button>
        </div>
      </div>
    </div>
  );
};

export default Genesis;
