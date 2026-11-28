'use client';

import { useEffect, useRef, useState } from 'react';

// One example: $10,000 of ETH. Each option is how much you borrow and the rate it starts from.
const OPTIONS = [
  { borrow: '$2,000', rate: 0 },
  { borrow: '$2,500', rate: 1 },
  { borrow: '$3,333', rate: 5 },
  { borrow: '$5,000', rate: 8 },
];

const START = 6.24;
const MIN = 5.4;
const MAX = 7.1;
const EASE_MS = 560;

/**
 * Play to understand. A floating rate drifts; your rate is locked to the amount you pick and eases to the
 * new one when you change it, while the floating one keeps moving. Illustrative numbers; no network.
 */
export default function RateEngine() {
  const [floating, setFloating] = useState(START);
  const [selected, setSelected] = useState(0);
  const [big, setBig] = useState(OPTIONS[0].rate);
  const [settled, setSettled] = useState(true);
  const [announce, setAnnounce] = useState('');

  const floatingRef = useRef(START);
  const reduceRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    reduceRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceRef.current) return;
    const id = setInterval(() => {
      let v = floatingRef.current + (Math.random() - 0.5) * 0.09;
      if (v < MIN) v += 0.1;
      if (v > MAX) v -= 0.1;
      floatingRef.current = v;
      setFloating(v);
    }, 900);
    return () => clearInterval(id);
  }, []);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const pick = (index: number) => {
    const target = OPTIONS[index].rate;
    setSelected(index);
    setAnnounce(`Your rate: from ${target}%, locked for 90 days`);
    cancelAnimationFrame(rafRef.current);
    if (reduceRef.current || big === target) {
      setBig(target);
      setSettled(true);
      return;
    }
    setSettled(false);
    const from = big;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / EASE_MS);
      const eased = 1 - Math.pow(1 - p, 3);
      if (p < 1) {
        setBig(from + (target - from) * eased);
        rafRef.current = requestAnimationFrame(step);
      } else {
        setBig(target);
        setSettled(true);
      }
    };
    rafRef.current = requestAnimationFrame(step);
  };

  // The root's className stays fixed: RevealOnScroll adds is-visible to it, and React must not overwrite that.
  return (
    <div className="engine">
      <p className="engine-prompt">Say you have $10,000 in ETH. How much do you need?</p>

      <div className="engine-options">
        {OPTIONS.map((o, i) => (
          <button
            key={o.borrow}
            type="button"
            className="engine-option"
            aria-pressed={selected === i}
            onClick={() => pick(i)}
          >
            {o.borrow}
          </button>
        ))}
      </div>

      <div className="engine-readout">
        <div className="engine-col">
          <span className="engine-col-label">Your rate</span>
          <span className="engine-big engine-mine">
            <span className="engine-big-from">from </span>
            {settled ? Math.round(big) : big.toFixed(2)}%
          </span>
          <span className="engine-sub">
            <span className="engine-dot" aria-hidden="true" />
            Locked for 90 days
          </span>
        </div>
        <div className="engine-col">
          <span className="engine-col-label">Floating rate (example)</span>
          <span className="engine-big engine-floating">{floating.toFixed(2)}%</span>
          <span className="engine-sub">Changes every day</span>
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        {announce}
      </span>

      <p className="cost">1% origination fee &middot; no early repayment penalty</p>
      <p className="engine-note">Example numbers.</p>
    </div>
  );
}
