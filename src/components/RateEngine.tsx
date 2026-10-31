'use client';

import { useEffect, useRef, useState } from 'react';

// One idea: pick a rate, it locks. Each tier is a rate; its collateral requirement (LTV) rides along underneath.
const TIERS = [
  { apr: 0, ltv: '20%' },
  { apr: 1, ltv: '25%' },
  { apr: 5, ltv: '33.3%' },
  { apr: 8, ltv: '50%' },
];

const START = 6.24;
const fmt = (n: number) => n.toFixed(2);
const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * The proof. A live market rate drifts in the header, the anchor you're escaping. The big number
 * tracks it until you take a tier, then snaps to your fixed rate and holds while the market keeps
 * moving. That contrast is the point. Illustrative numbers; no network call.
 */
export default function RateEngine() {
  const [reduce] = useState(prefersReducedMotion);
  const [market, setMarket] = useState(START);
  const [big, setBig] = useState(START);
  const [locked, setLocked] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const marketRef = useRef(START);
  const lockedRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      let v = marketRef.current + (Math.random() - 0.5) * 0.09;
      if (v < 5.4) v += 0.1;
      if (v > 7.1) v -= 0.1;
      marketRef.current = v;
      setMarket(v);
      if (!lockedRef.current) setBig(v);
    }, 900);
    return () => clearInterval(id);
  }, [reduce]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const lockTo = (apr: number, index: number) => {
    setSelected(index);
    setLocked(true);
    lockedRef.current = true;
    if (reduce) {
      setBig(apr);
      return;
    }
    cancelAnimationFrame(rafRef.current);
    const start = marketRef.current;
    const t0 = performance.now();
    const dur = 560;
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setBig(start + (apr - start) * eased);
      if (p < 1) rafRef.current = requestAnimationFrame(step);
      else setBig(apr);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  return (
    <div className="engine sp">
      <div className="top">
        <span className="lab">Your rate</span>
        <span className="market">
          <span className="mlabel">Market</span>
          <span className="mv">{fmt(market)}%</span>
        </span>
      </div>

      <div className="readout">
        <div className={`bignum${locked ? ' locked' : ''}`}>
          {fmt(big)}
          <span className="pct">%</span>
        </div>
        <div className={`rstate${locked ? ' locked' : ''}`}>
          {locked ? (
            <>
              <span className="lk" />
              Locked — the market keeps moving, your rate doesn&apos;t
            </>
          ) : (
            'Live rate'
          )}
        </div>
      </div>

      <div className="chips">
        {TIERS.map((tier, i) => (
          <button
            key={tier.apr}
            type="button"
            className={`chip${selected === i ? ' on' : ''}`}
            onClick={() => lockTo(tier.apr, i)}
          >
            <span className="l2">{tier.apr}%</span>
            <span className="s">{tier.ltv} LTV</span>
          </button>
        ))}
      </div>
    </div>
  );
}
