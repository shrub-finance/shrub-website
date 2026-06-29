import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import RateEngine from '../components/genesis/RateEngine';
import useStaggerReveal from '../hooks/useStaggerReveal';
import useScrolled from '../hooks/useScrolled';
import shrubLogo from '../assets/images/bud/bud-mark.svg';
import './Genesis.scss';

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
  useStaggerReveal(rootRef);

  useEffect(() => {
    document.body.classList.add('genesis-active');
    return () => document.body.classList.remove('genesis-active');
  }, []);

  return (
    <div className="shrub-landing" ref={rootRef}>
      <nav className={navSolid ? 'solid' : undefined}>
        <Link to="/" className="brand" aria-label="Shrub home">
          <img className="brand-logo" src={shrubLogo} alt="Shrub" />
        </Link>
        <div className="navstat">The Last Builders Collective</div>
      </nav>

      {/* HERO — the story opens. no product. */}
      <header className="hero">
        <div className="wrap">
          <div className="eyebrow">The Last Builders</div>
          <div className="tell">
            <span className="l">Crypto promised one thing.</span>
            <span className="l em">Money that answered to you.</span>
            <span className="l mute">Then it became a casino.</span>
            <span className="l mute">The builders who meant it left.</span>
            <span className="l mint">We did not.</span>
          </div>
          <div className="cue"><span className="bar" />READ ON</div>
        </div>
      </header>

      {/* THE WALL */}
      <section className="beat" data-reveal>
        <div className="wrap tell">
          <span className="l sp">We wanted one honest thing.</span>
          <span className="l sp soft">A loan you could understand.</span>
          <span className="l sp soft">Borrow against what you hold. Know the number. Leave when you want.</span>
          <span className="l sp gap">It did not exist.</span>
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
            <div className="try"><span className="v">V1</span><span className="t">The token model. We came close to a raise. We let it go.</span></div>
            <div className="try"><span className="v">V2</span><span className="t">Two sides, pooled. Closer. Still a market.</span></div>
          </div>
        </div>
      </section>

      {/* THE EPIPHANY */}
      <section className="beat big" data-reveal>
        <div className="wrap tell">
          <span className="l sp mute">Then we saw why no one built the loan.</span>
          <span className="l sp soft">To fix the rate, someone has to carry the risk of the rate.</span>
          <span className="l sp soft">Every protocol handed that risk to the borrower.</span>
          <span className="l sp mint gap">We decided to carry it ourselves.</span>
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

      {/* THE COST */}
      <section className="beat" data-reveal>
        <div className="wrap">
          <div className="tell"><span className="l sp soft">It cost us to believe that.</span></div>
          <div className="facts sp">
            <span className="fact">FOUR YEARS</span>
            <span className="fact">THIRD PRODUCT</span>
            <span className="fact">FUNDING TURNED DOWN, 2X</span>
            <span className="fact">ONLY BELIEVERS REMAINED</span>
            <span className="fact">UNBOUGHT. UNBOSSED.</span>
          </div>
          <div className="tell costnote">
            <span className="l sp mute note">
              We built it for the people who paid real money to believe, back when no one was watching. We did not forget who this is for.
            </span>
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
            <span className="fact">1% ORIGINATION</span>
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

      {/* THE DROP */}
      <section className="beat drop" data-reveal>
        <div className="wrap">
          <div className="tell"><span className="l sp">We are not opening the gates.</span></div>
          <div className="tell">
            <span className="l sp mute note dropsub">We are proving it works with the few who came first.</span>
          </div>
          <div className="seq sp">
            <span className="n">1</span><span className="ar">&rarr;</span>
            <span className="n">5</span><span className="ar">&rarr;</span>
            <span className="n live">10</span>
          </div>
          <div className="cap sp">Genesis. Mainnet. With ten.</div>
        </div>
      </section>

      <div className="rule" />

      {/* THE CREED */}
      <section className="beat big creed" data-reveal>
        <div className="wrap">
          <div className="eyebrow sp block">The Last Builders Manifesto</div>
          <div className="tell creed-lines">
            <span className="l sp">Activate the engine.</span>
            <span className="l sp">Build what outlasts its <em>builders</em>.</span>
            <span className="l sp">Focus is our armor.</span>
            <span className="l sp"><em>Completion</em> is the proof.</span>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="links">
            <a href={TWITTER} target="_blank" rel="noopener noreferrer">X</a>
            <a href={DISCORD} target="_blank" rel="noopener noreferrer">Discord</a>
          </div>
          <div className="fine">THE LAST BUILDERS COLLECTIVE</div>
        </div>
      </footer>
    </div>
  );
};

export default Genesis;
