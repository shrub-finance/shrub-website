import React, { useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import './Genesis.css';

const Genesis = () => {
  const canvasRef = useRef(null);

  // ── Body class (mount/unmount) ──
  useEffect(() => {
    document.body.classList.add('genesis-active');
    return () => document.body.classList.remove('genesis-active');
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
      return Math.atan2(-(n2 - n1) / eps, (n3 - n1) / eps);
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
          setTimeout(() => entry.target.classList.add('on'), i * 120);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="genesis-page">
      <canvas id="genesis-flow" ref={canvasRef} />
      <div className="genesis-wrapper">

        {/* HERO */}
        <section className="genesis-hero">
          <p className="genesis-hero-label">Fixed-Rate Lending &nbsp;&middot;&nbsp; Built on Aave</p>
          <h1 className="genesis-hero-title">SHRUB<br /><span>LEND</span></h1>
          <p className="genesis-hero-sub">A quiet engine for fixed-rate borrowing</p>
          <div className="genesis-hero-divider">
            <div className="genesis-hero-divider-line"></div>
            <div className="genesis-hero-divider-dot"></div>
            <div className="genesis-hero-divider-dot" style={{ opacity: 0.4 }}></div>
            <div className="genesis-hero-divider-dot" style={{ opacity: 0.15 }}></div>
            <div className="genesis-hero-divider-line" style={{ transform: 'scaleX(-1)' }}></div>
          </div>
          <p className="genesis-hero-desc">
            Borrow USDC against your ETH.<br />
            <em>Fixed rate. Locked at entry.</em><br />
            No variable surprises. No selling your assets.
          </p>
          <div className="genesis-scroll-cue">
            <div className="genesis-scroll-cue-line"></div>
            <div className="genesis-scroll-cue-txt">scroll</div>
          </div>
        </section>

        {/* STORY 1 */}
        <div className="genesis-story">
          <div className="genesis-story-label genesis-reveal">What happened</div>
          <p className="genesis-reveal">The vaults went dark. Billions vanished. The people who trusted centralized lenders were left holding nothing.</p>
          <p className="genesis-reveal">The industry moved on. <strong>Chased the next narrative.</strong> Built new speculation engines. But nobody went back to fix the thing that actually broke: <em>simple, trustworthy borrowing.</em></p>
          <p className="genesis-reveal">Shrub Lend exists because that gap never closed. A fixed-rate lending protocol built on Aave — where your collateral stays yours, your rate locks at entry, and there are no keys for anyone to take.</p>
        </div>

        {/* STORY 2 */}
        <div className="genesis-story">
          <div className="genesis-story-label genesis-reveal">How we build</div>
          <p className="genesis-reveal">Real protocols aren't launched. <strong>They're forged.</strong></p>
          <p className="genesis-reveal">We started with five. Five people who understood what was missing. They tested every edge of the engine on Base Sepolia testnet — every tier, every failure mode, every liquidation path. <em>The engine held.</em></p>
          <p className="genesis-reveal">Now five more join. Then more after that. Each chapter written by the people who show up — not for hype, not for announcements, but because they felt something was missing and decided to help build it.</p>
          <p className="genesis-reveal">From one to five. From five to ten. <strong>From ten to many.</strong> The new chapters are written by believers, not spectators.</p>
        </div>

        {/* CHAPTERS */}
        <div className="genesis-chapters">
          <div className="genesis-story-label genesis-reveal">Chapters</div>
          <div className="genesis-chapter genesis-reveal">
            <div className="genesis-ch-num">01</div>
            <div>
              <div className="genesis-ch-title">Genesis — Cell Zero</div>
              <div className="genesis-ch-status"><span className="genesis-ch-done">Five operatives. Testnet stress test. Engine validated.</span></div>
            </div>
          </div>
          <div className="genesis-chapter genesis-reveal">
            <div className="genesis-ch-num">02</div>
            <div>
              <div className="genesis-ch-title">Cell One — Second Wave</div>
              <div className="genesis-ch-status"><em>Selecting five more.</em> Gates sealed until called.</div>
            </div>
          </div>
          <div className="genesis-chapter genesis-reveal">
            <div className="genesis-ch-num">03</div>
            <div>
              <div className="genesis-ch-title">Mainnet</div>
              <div className="genesis-ch-status">Every tester ships. The engine goes live.</div>
            </div>
          </div>
          <div className="genesis-chapter genesis-reveal">
            <div className="genesis-ch-num">04</div>
            <div>
              <div className="genesis-ch-title">The Doors Open</div>
              <div className="genesis-ch-status">Public access. The protocol belongs to everyone.</div>
            </div>
          </div>
        </div>

        {/* SIGNAL */}
        <section className="genesis-signal-wrap">
          <div className="genesis-signal-box genesis-reveal">
            <div className="genesis-sc tl"></div>
            <div className="genesis-sc tr"></div>
            <div className="genesis-sc bl"></div>
            <div className="genesis-sc br"></div>
            <div className="genesis-signal-pulse"></div>
            <div className="genesis-signal-title">The engine is running.<br />The build continues in silence.</div>
            <div className="genesis-signal-body">
              If this resonates — if you've felt what's missing —<br />
              the community is where the next chapters are written.
            </div>
            <div className="genesis-signal-links">
              <a className="genesis-sig-link" href="https://discord.gg/yAc9JQT9dk" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                </svg>
                Discord
              </a>
              <a className="genesis-sig-link" href="https://x.com/shrubfinance" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Twitter
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="genesis-footer">
          <div className="genesis-f-logo">
            <div className="genesis-f-dot"></div>
            <div className="genesis-f-name"><span>Shrub</span> Lend</div>
          </div>
          <div className="genesis-f-meta">Built on Aave V3 &nbsp;&middot;&nbsp; Base Sepolia Testnet</div>
        </footer>

      </div>
    </div>
  );
};

export default Genesis;
