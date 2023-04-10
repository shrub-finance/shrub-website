import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../../utils/SectionProps';
import SectionHeader from '../partials/SectionHeader';
import Button from "../../elements/Button";
import ReactGA from "react-ga";

const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

const What = ({
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
    title: 'The Story',
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className="container-xs center-content story-text" >
            <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
              A mysterious man calling himself the paper merchant has come to town with seeds of different varieties. These seeds are calling for gardeners...
            </p>
          </div>
          <div className="reveal-from-bottom center-content" data-reveal-delay="600">
              <Button tag="a" color="primary" wideMobile className="btn-garden">
                <ReactGA.OutboundLink eventLabel="Clicked on read more" to="https://gardens.shrub.finance/" target="_blank"
                                      rel='noopener noreferrer'>
                  Read all chapters
                </ReactGA.OutboundLink>
              </Button>
          </div>
        </div>
        <div className={innerClasses}>
          <div className="center-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              Roadmap
            </h1>
            <div className="container-xs center-content story-text" >
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                Learn where this journey will lead you.
              </p>
            </div>
            <div className="reveal-from-bottom center-content" data-reveal-delay="600">
              <Button tag="a" color="primary" wideMobile className="btn-garden">
                <ReactGA.OutboundLink eventLabel="Clicked on roadmap from home page" to="/roadmap">
                  Read Roadmap
                </ReactGA.OutboundLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

What.propTypes = propTypes;
What.defaultProps = defaultProps;

export default What;