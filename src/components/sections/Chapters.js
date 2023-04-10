import React from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Button from "../elements/Button";
import ReactGA from "react-ga";

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}


const Chapters = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {





  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );



  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200" >
              Paper Gardens
            </h1>
            <div className="container-xs">
              <p className="m-0 mb-32 reveal-from-bottom sub-heading" data-reveal-delay="400">CHAPTER 2: THE SAD SEEDS</p>
            </div>
            <div className="container-sm" style={{marginTop: "50px", fontWeight: "500", color:"#9CA9B3", lineHeight: "30px", fontSize: "20px", textAlign: "left"}}>
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">After the Paper Merchant set up his stall all of the seeds were giddy with anticipation. "I wonder what my gardener is like" exclaimed one seed of wonder. "I can't wait to meet my gardener", said a seed of passion. "This is a great day!", said a seed of power.</p>
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400"> The stall opened, and gardeners lined up, each claiming their seeds. Every time a gardener and seed matched, the seed beamed with happiness, excited to begin its journey with its chosen gardener.</p>
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400"> However, as the days went by, and the line of gardeners went away, some of the seeds began to worry. "I hope my gardener didn't forget about me", said a seed of hope.</p>
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400"> Every day, only a few gardeners came to unite with their seeds. Those lucky chosen seeds were happy, but the rest began to realize the cold truth that they might not be united with their gardener at all.</p>
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">Finally the moment came, it was time for the Paper Merchant to go, and the remaining seeds gasped as they realized their fate: they would remain without a gardener.</p>
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">One of the Seeds of Passion shrieked "What will we do???"</p>
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="200">The Paper Merchant, who had been silent all this while, got up and spoke calmly.</p>
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="200">"The gardeners that you all chose did not make it."</p>
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="200"> "How will we ever grow? Is this the end for us?" asked a seed of Wonder.</p>
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="100">"It will not be easy", responded the Paper Merchant, "and true happiness will be a challenge to find, but there is still a way for you".</p>
              <p className="m-0 mb-32 reveal-rotate-from-bottom" data-reveal-delay="200">"I will search for foster gardeners. Those who are willing to take care for the unchosen. If you are united with the right one, you too can thrive".</p>
              <p className="m-0 reveal-rotate-from-bottom" data-reveal-delay="200">Who are the gardeners willing to care for sad seeds and how will the Paper Merchant find them. It will all become clear in the days to come.</p>
            </div>
            <div className="center-content m-0 mt-32"  >
              <Button tag="a" color="primary" className="btn-garden" wideMobile>
                <ReactGA.OutboundLink eventLabel="Clicked adoption link" target="_blank"
                                      rel='noopener noreferrer'
                                      to="https://gardens.shrub.finance/adoption">
                  Adopt a Seed
                </ReactGA.OutboundLink>
              </Button>
            </div>
          </div>
          <div className={innerClasses}>
            <div className="hero-content">
              <div className="container-xs">
                <p className="m-0 mb-32 reveal-from-bottom sub-heading" data-reveal-delay="400">CHAPTER 1: THE TRAVELLING MERCHANT</p>
              </div>
              <div className="container-sm" style={{marginTop: "50px", fontWeight: "500", color:"#9CA9B3", lineHeight: "30px", fontSize: "20px", textAlign: "left"}}>
                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">There was something different in the air on the day when he appeared, something mysterious and filled with possibility. He came in on foot, towing along his cart.</p>
                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400"> A tall man with dark worn clothes. His face wore the signs of his journeys and his eyes were full of wisdom.
                  Outsiders didn't normally visit the town. The residents took notice.</p>
                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400"> "What do they call you?" one resident asked.</p>
                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400"> "I am the Paper Merchant", replied the man.</p>
                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">"I have come bearing paper seeds. Some of you have been chosen by the seeds. If you ask, I will give you yours." </p>
                <div className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">"I have four varieties of seeds in my wares:
                  <ul style={{marginTop: "20px"}}>
                    <li>SEEDS OF WONDER - excited for the world, these are the most plentiful.</li>
                    <li>SEEDS OF PASSION - filled with love, these are uncommon.</li>
                    <li>SEEDS OF HOPE - with visions of future greatness, these are rare.</li>
                    <li>SEEDS OF POWER - legendary, with an aura that makes others gravitate to them."</li>
                  </ul>
                </div>
                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="200">"I am only here for sometime. If a seed is calling, you must visit me by then, or it will go to another."</p>
                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="200">The paper merchant setup his stall in the corner of town.</p>
                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="200"> "If you have been chosen, come forth", he said.</p>
                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="100"><i>But what do these seeds do? And what is a seed without soil?</i></p>
                <p className="m-0 reveal-rotate-from-bottom" data-reveal-delay="200">More will be revealed in the next chapter.</p>
              </div>
            </div>
          </div>
        <div className="center-content"  >
          <Button tag="a" color="primary" className="btn-garden" wideMobile>
            <ReactGA.OutboundLink eventLabel="Clicked Open Sea collection link" target="_blank"
                                  rel='noopener noreferrer'
                                  to="https://opensea.io/collection/shrub-paper-gardens">
              Open Sea
            </ReactGA.OutboundLink>
          </Button>
        </div>
      </div>
      </div>
    </section>
  );
}

Chapters.propTypes = propTypes;
Chapters.defaultProps = defaultProps;

export default Chapters;