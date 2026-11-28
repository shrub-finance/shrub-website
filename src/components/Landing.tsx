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
          <p className="pull">We believe you should never have to sell what you believe in.</p>

          <p className="beat">
            You bought ETH because you believe in where it is going. Then life needs cash, and crypto tells you to sell,
            or to borrow at a rate that can change overnight.
          </p>

          <p className="indent">
            Everywhere else, people borrow against what they own and keep it. That is how homes get bought and
            businesses get built.
          </p>

          <p className="conviction">
            <span className="line">Holders deserve the same.</span>
            <span className="line mint">That is why Shrub exists.</span>
          </p>
        </section>

        <section className="story">
          <p className="pull">So we take the risk that used to be yours.</p>

          <ol className="steps">
            <li>Your ETH goes into Aave and earns yield while it is locked.</li>
            <li>Borrow a small slice of its value, and that yield offsets the cost. That is how a rate can start from 0%.</li>
            <li>
              When the market&apos;s rate jumps, Shrub&apos;s own capital covers the difference. Your rate stays fixed for 90
              days, then renews at the current rate for your tier.
            </li>
          </ol>

          <p className="indent">Simple is not the same as easy. We kept cutting until nothing needed explaining.</p>
        </section>

        <section className="story">
          <p className="beat">
            What came out is one thing. A loan against your ETH, at a rate that locks the moment you borrow.
          </p>

          <RateEngine />

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

          <p className="beat">
            <span className="line">A rate you agreed to is a promise.</span>
            <span className="line">Things worth using get built slowly.</span>
            <span className="line">No outside money. Nobody to answer to but the people who use it.</span>
          </p>

          <hr className="rule" />

          <p className="beat">
            <strong>Live on Base since August 2026.</strong> Real ETH. Real USDC. Every locked rate honored.
          </p>

          <p className="conviction">Everyone who tested it from day one is still here.</p>

          <p className="conviction mint">The thing working is the proof we have.</p>
        </section>

        <section className="story">
          <p className="pull">This is not open to everyone. Not yet.</p>

          <p className="indent">It is for holders who never came to crypto for fast money.</p>

          <p className="conviction">
            <span className="line">If you believe what we believe, you are not a user here.</span>
            <span className="line">You are a Last Builder.</span>
            <span className="line mint">Build with us.</span>
          </p>

          <p className="invite" id="waitlist">
            Email{' '}
            <a className="mint" href={WAITLIST_MAILTO}>
              {EMAIL}
            </a>{' '}
            and we will put you on the Last Builders waitlist.
          </p>

          <div className="connect">
            <nav className="links" aria-label="Community">
              <a href={DISCORD} target="_blank" rel="noopener noreferrer">
                Discord
              </a>
              <a href={TWITTER} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </nav>
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
