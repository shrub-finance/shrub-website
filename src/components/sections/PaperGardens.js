import React from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Button from "../elements/Button";
import ReactGA from "react-ga";
import SectionHeader from "./partials/SectionHeader";

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}


const PaperGardensIntro = ({
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

    const sectionHeader = {
        title: 'Paper Gardens',
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
                        Paper Gardens is an interactive multi-chapter story, full of NFTs, rewards, and fun tied to Shrub Paper.
                    </p>
                </div>
                <div className="reveal-from-bottom center-content" data-reveal-delay="600">
                    <Button tag="a" color="primary" wideMobile>
                        <ReactGA.OutboundLink eventLabel="Documentation" to="https://gardens.shrub.finance/" target="_blank" rel='noopener noreferrer'>
                            Learn More
                        </ReactGA.OutboundLink>
                    </Button>

                </div>
            </div>
        </div>
    </section>
  );
}


PaperGardensIntro.propTypes = propTypes;
PaperGardensIntro.defaultProps = defaultProps;

export default PaperGardensIntro;