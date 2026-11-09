import Header from './Header';
import RevealOnScroll from './RevealOnScroll';

const DISCORD = 'https://discord.gg/yAc9JQT9dk';
const TWITTER = 'https://x.com/shrubfinance';
const EMAIL = 'connect@shrub.finance';
const WAITLIST_MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('I want to join the Last Builders waitlist')}`;

const TIERS = [
  { rate: '0%', ltv: '20% LTV' },
  { rate: '1%', ltv: '25% LTV' },
  { rate: '5%', ltv: '33.3% LTV' },
  { rate: '8%', ltv: '50% LTV' },
];

export default function Landing() {
  return (
    <>
      <RevealOnScroll />
      <Header />
      <main className="page">
        <section className="story">
          <h1 className="mark">Shrub</h1>

          <p className="pull">There is a fundamental that runs the world.</p>

          <p className="beat">
            <strong>Borrow against what you own without selling it.</strong> Every economy on earth runs on this.
          </p>

          <p className="indent">
            It barely exists on-chain. Not because it can't. Because someone has to absorb the rate complexity so the borrower never sees it.
          </p>

          <p className="conviction">
            <span className="line">That is WHAT Shrub does.</span>
            <span className="line">That is ALL Shrub does.</span>
          </p>

          <hr className="rule" />

          <p className="beat">
            <span className="line">You have ETH. You need USDC.</span>
            <span className="line">The rate locks the moment you borrow.</span>
          </p>

          <ul className="tiers">
            {TIERS.map(({ rate, ltv }) => (
              <li key={ltv}>
                <span className="tier-from">from</span>
                <span className="tier-rate">{rate}</span>
                <span className="tier-ltv">{ltv}</span>
              </li>
            ))}
          </ul>

          <p className="cost">1% origination fee &middot; no early repayment penalty</p>

          <p className="beat">
            It unlocks liquidity from your asset without a floating rate to lose sleep over.{' '}
            <strong>The way loans are supposed to work.</strong>
          </p>

          <p className="indent">
            We serve the individual, not institutions. No custom deals. No preferred terms. This is what the{' '}
            <span className="mint">Last Builders</span> are doing.
          </p>
        </section>

        <section className="story">
          <p className="pull">Simple and easy are not the same thing.</p>

          <p className="beat">Easy is surface. Simple is structure.</p>

          <p className="indent">
            You do not arrive at simple by adding features. You arrive at it by refusing to stop until the thing you
            built needs nothing explained.
          </p>

          <hr className="rule" />

          <p className="indent">
            We had a working protocol. Won pitches. Had funding on the table. Then someone we respected told us the
            deposit side was unnecessary weight.
          </p>

          <p className="indent">So we walked away from the funding and went back to the beginning.</p>

          <p className="beat">
            Not because it was broken. <strong>Because it could be better.</strong>
          </p>

          <p className="indent">
            That is the discipline to begin again. Twice. Three times. However many it takes until the person using it
            has nothing to figure out.
          </p>
        </section>

        <section className="story">
          <p className="pull">We are here because we want to be.</p>

          <p className="indent">
            Not because we could not be somewhere else. Most projects arrive to capture a wave and leave when it
            passes. We self-fund now. The product is built to sustain itself by serving borrowers. The builders carry the rest.
          </p>

          <p className="beat">No outside money deciding what this becomes.</p>

          <p className="indent">
            Built by people who believe money should stay free. Used by people who feel the same.
          </p>

          <p className="conviction">Nothing to inflate. It is exactly what it is meant to be.</p>

          <hr className="rule" />

          <p className="indent">
            It serves a small set of people who opted in. Quiet builders setting the template for how money should work
            in DeFi. The right way. The slow way.
          </p>

          <p className="beat">
            Real ETH. Real USDC. Every locked rate honored.
          </p>

          <p className="conviction">Every person who battle tested it and shaped it from the beginning is still here.</p>

          <p className="conviction mint">The thing working is the proof we have.</p>
        </section>

        <section className="story">
          <p className="indent">
            This is for long-term holders who never entered crypto to make fast money. Who can tell the difference
            between something built to be talked about and something built to be used.
          </p>

          <p className="conviction">When you need your asset to work without selling it, this is here, for those invited.</p>

          <div className="connect">
            <p>Connect with us.</p>
            <nav className="links" aria-label="Community">
              <a href={DISCORD} target="_blank" rel="noopener noreferrer">
                Discord
              </a>
              <a href={TWITTER} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </nav>
            <p>
              <span className="line">
                If you want to be a part of building something <strong>where you belong</strong>,
              </span>
              <span className="line">
                Where you are a <strong>part</strong>, not a <strong>participant</strong>,
              </span>
              <span className="line">
                Email{' '}
                <a className="mint" href={WAITLIST_MAILTO}>
                  {EMAIL}
                </a>{' '}
                and we will put you on the Last Builders waitlist.
              </span>
            </p>
          </div>
        </section>

        <footer className="colophon">
          <span className="line">Shrub Lend &middot; Built on Aave V3 &middot; Base</span>
          <span className="line">&copy; {new Date().getFullYear()} Shrub Finance, Inc.</span>
        </footer>
      </main>
    </>
  );
}
