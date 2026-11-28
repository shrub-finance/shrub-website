import Header from './Header';
import RateEngine from './RateEngine';
import RevealOnScroll from './RevealOnScroll';

const DISCORD = 'https://discord.gg/yAc9JQT9dk';
const TWITTER = 'https://x.com/shrubfinance';
const EMAIL = 'connect@shrub.finance';
const WAITLIST_MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('I want to join the Last Builders waitlist')}`;

export default function Landing() {
  return (
    <>
      <RevealOnScroll />
      <Header />
      <main className="page">
        <section className="story">
          <h1 className="mark">Shrub</h1>

          <p className="pull">You bought ETH and you held. Then life needed cash.</p>

          <p className="beat">Crypto gave you two choices: sell, or borrow at a rate that can change overnight.</p>

          <p className="indent">On most lending apps, when rates jump, you pay.</p>

          <p className="conviction">The risk is yours.</p>

          <hr className="rule" />

          <p className="conviction mint">Shrub takes that risk off you.</p>

          <p className="beat">
            <span className="line">You have ETH. You need USDC.</span>
            <span className="line">The rate locks the moment you borrow.</span>
          </p>

          <RateEngine />

          <p className="pull">Your ETH helps pay for your loan.</p>

          <ol className="steps">
            <li>Your ETH goes into Aave and earns yield while it is locked.</li>
            <li>Borrow a small slice of its value, and that yield offsets the cost. That is how a rate can start from 0%.</li>
            <li>
              When the market&apos;s rate jumps, Shrub&apos;s own capital covers the difference. Your rate stays fixed for 90
              days, then renews at the current rate for your tier.
            </li>
          </ol>

          <p className="beat">
            Borrow less, pay less. <strong>The way loans are supposed to work.</strong>
          </p>

          <p className="indent">
            It is still a loan. If the price of ETH falls far enough, some of your ETH can be sold to repay it.
          </p>
        </section>

        <section className="story">
          <p className="pull">Most of crypto builds for the wave. Launch. Hype. Leave.</p>

          <p className="conviction">The Last Builders are the ones still here when it passes.</p>

          <p className="beat">We believe three things.</p>

          <p className="conviction">
            <span className="line">You should never have to sell what you believe in.</span>
            <span className="line">A rate you agreed to is a promise.</span>
            <span className="line">Things worth using get built slowly.</span>
          </p>

          <p className="indent">
            Simple is not the same as easy. Easy means it looks simple. Simple means it is. We kept cutting until nothing
            needed explaining.
          </p>

          <p className="beat">No outside money. Nobody to answer to but the people who use it.</p>

          <hr className="rule" />

          <p className="beat">
            <strong>Live on Base since August 2026.</strong> Real ETH. Real USDC. Every locked rate honored.
          </p>

          <p className="conviction">Everyone who tested it from day one is still here.</p>

          <p className="conviction mint">The thing working is the proof we have.</p>
        </section>

        <section className="story">
          <p className="pull">This is not open to everyone. Not yet.</p>

          <p className="indent">
            It is for holders who never came to crypto for fast money. Who can tell what is built to be talked about from
            what is built to be used.
          </p>

          <p className="conviction">
            <span className="line">If that is you, you are not a user here.</span>
            <span className="line">You are a Last Builder.</span>
          </p>

          <div className="connect" id="waitlist">
            <p>Ask for an invite.</p>
            <nav className="links" aria-label="Community">
              <a href={DISCORD} target="_blank" rel="noopener noreferrer">
                Discord
              </a>
              <a href={TWITTER} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </nav>
            <p>
              Email{' '}
              <a className="mint" href={WAITLIST_MAILTO}>
                {EMAIL}
              </a>{' '}
              and we will put you on the Last Builders waitlist.
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
