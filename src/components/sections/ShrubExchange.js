import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Button from "../elements/Button";
import ReactGA from "react-ga";

const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

const ShrubExchange = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {

  const outerClasses = classNames(
    'features-split section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-split-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );

  const sectionHeader = {
    title: 'Shrub Exchange',
    // paragraph: 'Shrub was created with one fundamental thought at its core - "The only one who should be in control of your money is you".'
  };
  // With no misaligned incentives, no middleman, the capability of trading options for any ERC-20 token, and an intuitive UI, users are truly in control. Buy, Sell, Calls, Puts - any options trade you would want to do is available on Shrub.
  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className="container-xs center-content" style={{fontWeight: "500", color:"#9CA9B3"}}>
            <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
              Your on-ramp to Polygon MATIC.
            </p>
            <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
              Shrub Exchange is the easiest way to buy Polygon MATIC instantly with your credit card, debit card or Apple Pay.
            </p>
            <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
              Cut long KYC waits, high minimums, and hidden fees. On Shrub Exchange what you see is what you pay.
            </p>

          </div>
          <div className="reveal-from-bottom center-content" data-reveal-delay="600">
              <Button tag="a" color="primary" wideMobile>
                <ReactGA.OutboundLink eventLabel="Documentation" to="https://exchange.shrub.finance/" target="_blank" rel='noopener noreferrer'>
                  Buy MATIC
                </ReactGA.OutboundLink>
              </Button>

          </div>
        </div>
      </div>
    </section>
  );
}

ShrubExchange.propTypes = propTypes;
ShrubExchange.defaultProps = defaultProps;

export default ShrubExchange;