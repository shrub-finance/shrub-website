import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import RateEngine from '../components/genesis/RateEngine';
import Starfield from '../components/genesis/Starfield';
import useStaggerReveal from '../hooks/useStaggerReveal';
import useScrolled from '../hooks/useScrolled';
import shrubLogo from '../assets/images/bud/bud-mark.svg';
import './Genesis.scss';

// ShrubLend proxy 0x9d23D0CE040770D33BaDF445c870F210571A88B8 was deployed on Base in block 49516003.
// The day counter reads that block's timestamp from the chain; the constant below is the
// known value (2026-08-04 05:29:13 UTC) used until the RPC answers, or if it never does.
const BASE_RPC = 'https://mainnet.base.org';
const DEPLOY_BLOCK = 49516003;
const DEPLOY_TIMESTAMP_FALLBACK = 1785821353;
const daysSince = (unixSeconds) => Math.max(1, Math.floor((Date.now() / 1000 - unixSeconds) / 86400) + 1);

function useDaysLiveOnBase() {
  const [deployedAt, setDeployedAt] = useState(DEPLOY_TIMESTAMP_FALLBACK);
  const [days, setDays] = useState(() => daysSince(DEPLOY_TIMESTAMP_FALLBACK));

  useEffect(() => {
    let cancelled = false;
    fetch(BASE_RPC, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0', id: 1, method: 'eth_getBlockByNumber',
        params: ['0x' + DEPLOY_BLOCK.toString(16), false],
      }),
    })
      .then((r) => r.json())
      .then((j) => {
        const ts = j && j.result && parseInt(j.result.timestamp, 16);
        if (!cancelled && ts > 0) setDeployedAt(ts);
      })
      .catch(() => { /* keep the fallback */ });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    setDays(daysSince(deployedAt));
    const id = setInterval(() => setDays(daysSince(deployedAt)), 60000);
    return () => clearInterval(id);
  }, [deployedAt]);

  return days;
}

const DISCORD = 'https://discord.gg/yAc9JQT9dk';
const TWITTER = 'https://x.com/shrubfinance';

/**
 * The landing page — a scroll-told story that ends in proof.
 * Serif (Fraunces) narrates; mono (IBM Plex) speaks the machine.
 * All styling is scoped under `.shrub-landing`; the dark canvas is applied
 * to the body only while this view is mounted.
 */
const Genesis = () => {
  const rootRef = useRef(null);
  const navSolid = useScrolled(40);
  const daysLive = useDaysLiveOnBase();
  useStaggerReveal(rootRef);

  useEffect(() => {
    document.body.classList.add('genesis-active');
    return () => document.body.classList.remove('genesis-active');
  }, []);

  return (
    <div className="shrub-landing" ref={rootRef}>
      <Starfield />
      <nav className={navSolid ? 'solid' : undefined}>
        <Link to="/" className="brand" aria-label="Shrub home">
          <img className="brand-logo" src={shrubLogo} alt="Shrub" />
        </Link>
        <div className="navright">
          <div className="navstat">Live on Base &middot; Day {daysLive} &middot; Zero incidents</div>
        </div>
      </nav>

      {/* HERO — the story opens. no product. */}
      <header className="hero">
        <div className="wrap">
          <div className="tell">
            <span className="l">Crypto promised one thing.</span>
            <span className="l em">Money that answered to you.</span>
            <span className="l mute">Then it became a casino.</span>
            <span className="l mute">The markets dipped. The builders left.</span>
            <span className="l mint it">You did not.</span>
          </div>
          <div className="cue"><span className="bar" />READ ON</div>
        </div>
      </header>

      {/* THE WALL */}
      <section className="beat" data-reveal>
        <div className="wrap tell">
          <span className="l sp">You wanted one honest thing.</span>
          <span className="l sp soft">A loan you could understand.</span>
          <span className="l sp soft">Borrow against what you hold. Know the number. Leave when you want.</span>
          <span className="l sp gap it">It did not happen.</span>
        </div>
      </section>

      {/* A MARKET IS NOT A LOAN */}
      <section className="beat" data-reveal>
        <div className="wrap tell">
          <span className="l sp mute">Everyone had built a market.</span>
          <span className="l sp soft">A market floats. It moves while you sleep.</span>
          <span className="l sp soft">It liquidates you on a chart you never saw.</span>
          <span className="l sp em gap">A market is not a loan.</span>
        </div>
      </section>

      <div className="rule" />

      {/* THE FAILED ATTEMPTS */}
      <section className="beat" data-reveal>
        <div className="wrap">
          <div className="tell"><span className="l sp">We tried. Twice. Neither was it.</span></div>
          <div className="tries sp">
            <div className="try"><span className="v">V1</span><span className="t">The token model. We came close. We let it go.</span></div>
            <div className="try"><span className="v">V2</span><span className="t">Two sides, pooled. Closer. Still a market.</span></div>
          </div>
        </div>
      </section>

      {/* THE EPIPHANY */}
      <section className="beat big" data-reveal>
        <div className="wrap tell">
          <span className="l sp mute">Then we saw why no one built the loan.</span>
          <span className="l sp soft">To fix the rate, someone has to carry the risk.</span>
          <span className="l sp soft">Every protocol handed that risk to the borrower.</span>
          <span className="l sp mint gap it">We decided to carry it ourselves.</span>
        </div>
      </section>

      <div className="rule" />

      {/* THE NEW OPPORTUNITY */}
      <section className="beat big" data-reveal>
        <div className="wrap tell center">
          <span className="l sp">So we stopped building a market.</span>
          <span className="l sp em">We built the loan.</span>
        </div>
      </section>

      <section className="beat" data-reveal>
        <div className="wrap">
          <div className="tell">
            <span className="l sp mute">
              We built it for the people who paid real money to believe, back when no one was watching. We did not forget who this is for.
            </span>
            <span className="l sp mint gap it">This is for you.</span>
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* THE PROOF — product arrives as payoff. mono voice enters. */}
      <section className="proof" data-reveal>
        <div className="wrap">
          <div className="eyebrow sp block center">Here is the thing we made</div>
          <div className="tell sp center proof-line">
            <span className="l">Your rate. Take a tier. Watch it stop.</span>
          </div>

          <RateEngine />

          <div className="terms sp">
            <span className="fact">BUILT ON AAVE</span>
            <span className="fact">NON CUSTODIAL</span>
            <span className="fact">NO EARLY REPAYMENT PENALTY</span>
          </div>
        </div>
      </section>

      <section className="beat" data-reveal>
        <div className="wrap tell center">
          <span className="l sp mute note">Your rate, once taken, never recalculates again.</span>
        </div>
      </section>

      <div className="rule" />

      <footer>
        <div className="wrap">
          <div className="links">
            <a href={TWITTER} target="_blank" rel="noopener noreferrer">X</a>
            <a href={DISCORD} target="_blank" rel="noopener noreferrer">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Genesis;
