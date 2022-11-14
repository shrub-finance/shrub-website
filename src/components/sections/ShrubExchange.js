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
    paragraph: 'Your on-ramp to Polygon MATIC'
  };
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
              Shrub Exchange is the easiest way to buy Polygon MATIC instantly with your credit card, debit card or Apple Pay.
            </p>
            
        
          

          </div>
          <div className="reveal-from-bottom center-content" data-reveal-delay="600">
              <Button tag="a" color="primary" wideMobile>
                <ReactGA.OutboundLink eventLabel="go to shrub exchange" to="https://exchange.shrub.finance/" target="_blank" rel='noopener noreferrer'>
                  Launch Shrub Exchange
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