'use client';

import { useEffect, useRef, useState } from 'react';

// One example: $10,000 of ETH. Each option is how much you borrow; its rate and LTV ride along.
const OPTIONS = [
  { borrow: '$2,000', rate: 0, ltv: '20%' },
  { borrow: '$2,500', rate: 1, ltv: '25%' },
  { borrow: '$3,333', rate: 5, ltv: '33.3%' },
  { borrow: '$5,000', rate: 8, ltv: '50%' },
];

const START = 6.24;
const MIN = 5.4;
const MAX = 7.1;
const EASE_MS = 560;

const sentence = (o: (typeof OPTIONS)[number]) =>
  `You borrow ${o.borrow} in USDC and keep your $10,000 of ETH. That is ${o.ltv} of its value, a ${o.ltv} LTV. Borrow less, pay less.`;
// The longest sentence reserves the space, so the layout does not jump on first pick.
const LONGEST = OPTIONS.map(sentence).reduce((a, b) => (b.length > a.length ? b : a));

/**
 * Play to understand. A floating rate drifts; your rate tracks it until you pick an amount, then eases
 * to that option's rate and holds while the floating one keeps moving. Illustrative numbers; no network.
 */
export default function RateEngine() {
  const [floating, setFloating] = useState(START);
  const [big, setBig] = useState(START);
  const [selected, setSelected] = useState<number | null>(null);
  const [settled, setSettled] = useState(false);

  const floatingRef = useRef(START);
  const lockedRef = useRef(false);
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
      if (!lockedRef.current) setBig(v);
    }, 900);
    return () => clearInterval(id);
  }, []);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const pick = (index: number) => {
    const target = OPTIONS[index].rate;
    setSelected(index);
    lockedRef.current = true;
    cancelAnimationFrame(rafRef.current);
    if (reduceRef.current) {
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

  const locked = selected !== null;
  const chosen = locked ? OPTIONS[selected] : null;

  // The root's className stays fixed: RevealOnScroll adds is-visible to it, and React must not overwrite that.
  return (
    <div className="engine">
      <p className="engine-label">Try it</p>
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
            <span className="engine-borrow">{o.borrow}</span>
            <span className="engine-from">from {o.rate}%</span>
          </button>
        ))}
      </div>

      <div className="engine-readout">
        <div className="engine-col">
          <span className="engine-col-label">Your rate</span>
          <span className={locked ? 'engine-big is-locked' : 'engine-big'}>
            {locked && <span className="engine-big-from">from </span>}
            {settled ? Math.round(big) : big.toFixed(2)}%
          </span>
          <span className={locked ? 'engine-state is-locked' : 'engine-state'}>
            {locked ? (
              <>
                <span className="engine-dot" aria-hidden="true" />
                Locked. The market keeps moving. Your rate does not.
              </>
            ) : (
              'Pick an amount'
            )}
          </span>
        </div>
        <div className="engine-col">
          <span className="engine-col-label">A floating rate (example)</span>
          <span className="engine-big engine-floating">{floating.toFixed(2)}%</span>
        </div>
      </div>

      <div className="engine-explain">
        <span className="engine-explain-sizer" aria-hidden="true">
          {LONGEST}
        </span>
        <span className="engine-explain-text" aria-live="polite">
          {chosen ? sentence(chosen) : ''}
        </span>
      </div>

      <p className="cost">1% origination fee &middot; no early repayment penalty</p>
      <p className="engine-note">Example numbers. The floating rate shown is illustrative.</p>
    </div>
  );
}
