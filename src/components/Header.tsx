'use client';

import { useEffect, useState } from 'react';
import useScrolled from '@/hooks/useScrolled';

// ShrubLend proxy 0x9d23D0CE040770D33BaDF445c870F210571A88B8 was deployed on Base in block 49516003,
// whose timestamp is 2026-08-04 05:29:13 UTC. A mined block's timestamp never changes, so the day
// counter uses the constant; the page makes no network call.
const DEPLOY_TIMESTAMP = 1785821353;
const daysSince = (unixSeconds: number) => Math.max(1, Math.floor((Date.now() / 1000 - unixSeconds) / 86400) + 1);

function useDaysLiveOnBase(): number | null {
  // Computed after mount: the static HTML is prerendered at build time and must not carry a stale day.
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setDays(daysSince(DEPLOY_TIMESTAMP));
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);
  return days;
}

export default function Header() {
  const solid = useScrolled(40);
  const daysLive = useDaysLiveOnBase();

  return (
    <header className={solid ? 'site-header solid' : 'site-header'}>
      <a href="/" className="brand" aria-label="Shrub home">
        <img className="brand-logo" src="/bud-mark.svg" alt="Shrub" />
      </a>
      <div className="status">Live on Base{daysLive !== null && <> &middot; {daysLive} days</>}</div>
    </header>
  );
}
