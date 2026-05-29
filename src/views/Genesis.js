import React, { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import './Genesis.css';

const Genesis = () => {
  const canvasRef = useRef(null);
  const creedWrapRef = useRef(null);

  const [email, setEmail] = useState('');
  const [toggle, setToggle] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.body.classList.add('genesis-active');
    return () => document.body.classList.remove('genesis-active');
  }, []);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const hero = document.querySelector('.genesis-hero');
    if (!hero) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const heroH = hero.offsetHeight;
        const scrollY = window.scrollY;
        const progress = Math.max(0, Math.min(1, (scrollY - heroH * 0.5) / (heroH * 0.8)));
        canvas.style.opacity = 1 - (progress * 0.88);
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  useEffect(() => {
    const wrap = creedWrapRef.current;
    if (!wrap) return;
    const lines = wrap.querySelectorAll('[data-creed]');
    if (!lines.length) return;

    let done = false;
    const timers = [];

    const animate = (i) => {
      if (i >= lines.length) return;
      lines[i].classList.add('on');
      const id = setTimeout(() => animate(i + 1), 650);
      timers.push(id);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !done) {
        done = true;
        const id = setTimeout(() => animate(0), 300);
        timers.push(id);
        observer.unobserve(wrap);
      }
    }, { threshold: 0.45 });

    observer.observe(wrap);

    return () => {
      observer.disconnect();
      timers.forEach((id) => clearTimeout(id));
    };
  }, []);

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim());
  };

  const handleWaitlistSubmit = async (event) => {
    event.preventDefault();

    if (!email.length) {
      setMessage('Please enter an email below.');
      return;
    }

    if (!isValidEmail(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    try {
      await axios.post('https://api.getwaitlist.com/api/v1/signup', {
        email,
        waitlist_id: 20191,
        referral_link: typeof window !== 'undefined' ? window.location.href : 'https://shrub.finance/',
      });

      setMessage('');
      setToggle(true);
    } catch (error) {
      const apiMessage =
        error.response &&
        error.response.data &&
        (error.response.data.error_string || error.response.data.message || error.response.data.detail);
      setMessage(apiMessage || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="genesis-page">
      <canvas id="genesis-flow" ref={canvasRef} />
      <div className="genesis-wrapper">

        <section className="genesis-hero">
          <p className="genesis-hero-label">Fixed-Rate Lending &nbsp;&middot;&nbsp; Built on Aave</p>
          <h1 className="genesis-hero-title">SHRUB</h1>
          <p className="genesis-hero-sub">A quiet engine for fixed-rate borrowing</p>
          <div className="genesis-hero-divider">
            <div className="genesis-hero-divider-line"></div>
            <div className="genesis-hero-divider-dot"></div>
            <div className="genesis-hero-divider-dot" style={{ opacity: 0.4 }}></div>
            <div className="genesis-hero-divider-dot" style={{ opacity: 0.15 }}></div>
            <div className="genesis-hero-divider-line" style={{ transform: 'scaleX(-1)' }}></div>
          </div>
          <p className="genesis-hero-desc">
            Borrow USDC against your ETH at a <strong>fixed rate.</strong><br />
            No variable surprises. No selling your assets.<br />
            Built on Aave. Secured by collateral. <em>Locked by choice.</em>
          </p>
          <div className="genesis-scroll-cue">
            <div className="genesis-scroll-cue-line"></div>
          </div>
        </section>

        <div className="genesis-breath genesis-reveal">
          <div className="genesis-breath-label">What happened</div>
          <div className="genesis-breath-line">
            The vaults went dark. <strong>Billions vanished.</strong><br />
            The people who trusted centralized lenders<br />
            were left holding <em>nothing.</em>
          </div>
        </div>

        <div className="genesis-verse">
          <div className="genesis-verse-lines">
            <div className="genesis-verse-line genesis-reveal">The industry moved on. <strong>Chased the next narrative.</strong></div>
            <div className="genesis-verse-line genesis-reveal">Built new speculation engines.</div>
            <div className="genesis-verse-line genesis-reveal">But nobody went back to fix <em>the thing that actually broke:</em></div>
            <div className="genesis-verse-line genesis-reveal"><strong>simple, trustworthy borrowing.</strong></div>
            <div className="genesis-verse-break genesis-reveal"></div>
            <div className="genesis-verse-line genesis-reveal">Shrub exists because that gap <em>never closed.</em></div>
            <div className="genesis-verse-line genesis-reveal">Your collateral stays yours. Your rate locks at entry.</div>
            <div className="genesis-verse-line genesis-reveal"><strong>There are no keys for anyone to take.</strong></div>
          </div>
        </div>

        <div className="genesis-tiers-wrap">
          <div className="genesis-tiers-label genesis-reveal">The Engine</div>
          <h2 className="genesis-tiers-title genesis-reveal">Four tiers. Four target rates.<br /><em>Your rate stays locked for a year.</em></h2>
          <div className="genesis-tiers genesis-reveal">
            <div className="genesis-tier">
              <div className="genesis-tier-bar"></div>
              <div className="genesis-t-rate">0%</div>
              <div className="genesis-t-ltv">20% LTV</div>
              <div className="genesis-t-name">Ultra Safe</div>
              <div className="genesis-t-desc">5&times; collateral. ETH must fall 75% before any liquidation risk.</div>
              <div className="genesis-t-safe">&minus;75% to liquidate</div>
            </div>
            <div className="genesis-tier">
              <div className="genesis-tier-bar"></div>
              <div className="genesis-t-rate">1%</div>
              <div className="genesis-t-ltv">25% LTV</div>
              <div className="genesis-t-name">Conservative</div>
              <div className="genesis-t-desc">4&times; collateral. Near-zero cost of capital for long-term holders.</div>
              <div className="genesis-t-safe">&minus;69% to liquidate</div>
            </div>
            <div className="genesis-tier">
              <div className="genesis-tier-bar"></div>
              <div className="genesis-t-rate">5%</div>
              <div className="genesis-t-ltv">33.3% LTV</div>
              <div className="genesis-t-name">Balanced</div>
              <div className="genesis-t-desc">3&times; collateral. Enough liquidity to act on opportunity while protected.</div>
              <div className="genesis-t-safe">&minus;59% to liquidate</div>
            </div>
            <div className="genesis-tier">
              <div className="genesis-tier-bar"></div>
              <div className="genesis-t-rate">8%</div>
              <div className="genesis-t-ltv">50% LTV</div>
              <div className="genesis-t-name">Maximum Borrow</div>
              <div className="genesis-t-desc">2&times; collateral. Maximum liquidity for disciplined operators.</div>
              <div className="genesis-t-safe genesis-t-safe-purple">&minus;39% to liquidate</div>
            </div>
          </div>
          <p className="genesis-tiers-note genesis-reveal">1% origination fee &nbsp;&middot;&nbsp; no early repayment penalty &nbsp;&middot;&nbsp; built on Aave V3</p>
        </div>

        <section className="genesis-creed-wrap" ref={creedWrapRef}>
          <div className="genesis-creed-inner">
            <div className="genesis-creed-tag">The Creed of the Last Builders</div>
            <div className="genesis-creed-lines">
              <div className="genesis-creed-line" data-creed><strong>Activate</strong> the engine.</div>
              <div className="genesis-creed-line" data-creed>Forge the system that <em>outlasts its builders.</em></div>
              <div className="genesis-creed-line" data-creed><strong>Focus</strong> our armor.</div>
              <div className="genesis-creed-line" data-creed><em>Completion</em> is the signal.</div>
            </div>
          </div>
        </section>

        <div className="genesis-breath genesis-reveal">
          <div className="genesis-breath-label">How we build</div>
          <div className="genesis-breath-line">
            Real protocols aren't launched.<br />
            <strong>They're forged.</strong>
          </div>
        </div>

        <div className="genesis-verse">
          <div className="genesis-verse-lines">
            <div className="genesis-verse-line genesis-reveal">We started with <strong>five.</strong> Then five more.</div>
            <div className="genesis-verse-line genesis-reveal">Ten people tested every tier, every edge, every failure mode.</div>
            <div className="genesis-verse-line genesis-reveal"><em>The engine held.</em></div>
            <div className="genesis-verse-break genesis-reveal"></div>
            <div className="genesis-verse-line genesis-reveal">From one to five. From five to ten. <strong>From ten to many.</strong></div>
            <div className="genesis-verse-break genesis-reveal"></div>
            <div className="genesis-verse-line genesis-reveal">Each chapter written by <em>believers, not spectators.</em></div>
          </div>
        </div>

        <div className="genesis-chapters">
          <div className="genesis-chapters-label genesis-reveal">Status</div>
          <div className="genesis-chapter genesis-reveal">
            <div className="genesis-ch-num"><span className="genesis-ch-check">&#10003;</span></div>
            <div>
              <div className="genesis-ch-title genesis-done-title">Cell Zero &mdash; Genesis</div>
              <div className="genesis-ch-status"><span className="genesis-ch-done">Five operatives. Testnet stress test. Engine validated.</span></div>
            </div>
          </div>
          <div className="genesis-chapter genesis-reveal">
            <div className="genesis-ch-num"><span className="genesis-ch-check">&#10003;</span></div>
            <div>
              <div className="genesis-ch-title genesis-done-title">Cell One &mdash; Second Wave</div>
              <div className="genesis-ch-status"><span className="genesis-ch-done">Five more. Every edge tested again. Engine held.</span></div>
            </div>
          </div>
          <div className="genesis-chapter genesis-ch-active genesis-reveal">
            <div className="genesis-ch-num"><span className="genesis-ch-pulse"></span></div>
            <div>
              <div className="genesis-ch-title">Genesis Crew Locked &mdash; 10</div>
              <div className="genesis-ch-status"><em>Building toward mainnet.</em></div>
            </div>
          </div>
          <div className="genesis-chapter genesis-reveal">
            <div className="genesis-ch-num"><span className="genesis-ch-dot"></span></div>
            <div>
              <div className="genesis-ch-title">Mainnet</div>
              <div className="genesis-ch-status">The engine goes live.</div>
            </div>
          </div>
          <div className="genesis-chapter genesis-reveal">
            <div className="genesis-ch-num"><span className="genesis-ch-dot"></span></div>
            <div>
              <div className="genesis-ch-title">Waitlist Onboarding</div>
              <div className="genesis-ch-status">New batches drawn from the waitlist. <em>First come, first served.</em></div>
            </div>
          </div>
        </div>

        <section className="genesis-signal-wrap">
          <div className="genesis-signal-box genesis-reveal">
            <div className="genesis-sc tl"></div>
            <div className="genesis-sc tr"></div>
            <div className="genesis-sc bl"></div>
            <div className="genesis-sc br"></div>
            <div className="genesis-signal-pulse"></div>
            <div className="genesis-signal-title">The next wave starts from this list.</div>

            {message && <p className="genesis-wl-message">{message}</p>}

            {!toggle && (
              <form className="genesis-wl-form" onSubmit={handleWaitlistSubmit}>
                <input
                  type="email"
                  name="email"
                  aria-label="email"
                  autoComplete="email"
                  autoCapitalize="off"
                  placeholder="Your email"
                  className="genesis-wl-input"
                  value={email}
                  onChange={handleEmailChange}
                />
                <button type="submit" className="genesis-wl-btn">
                  <span>Reserve Your Place</span>
                </button>
              </form>
            )}

            {toggle && (
              <div className="genesis-wl-success">
                <div className="genesis-wl-success-title">You're on the list.</div>
                <div className="genesis-wl-success-body">We'll reach out when it's time to onboard.</div>
              </div>
            )}

            {!toggle && (
              <div className="genesis-wl-note">First come, first served. We'll reach out when it's time.</div>
            )}

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

        <footer className="genesis-footer">
          <div className="genesis-f-logo">
            <div className="genesis-f-dot"></div>
            <div className="genesis-f-name"><span>Shrub</span></div>
          </div>
          <div className="genesis-f-meta">Built on Aave V3 &nbsp;&middot;&nbsp; Ethereum &nbsp;&middot;&nbsp; Last Builders Collective</div>
        </footer>

      </div>
    </div>
  );
};

export default Genesis;
