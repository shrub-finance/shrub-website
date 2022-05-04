import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from "../elements/ButtonGroup";
import Button from "../elements/Button";
import ReactGA from "react-ga";
import Image from "../elements/Image";
import SectionHeader from "./partials/SectionHeader";

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}


const ShrubPaper = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  }

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  }   

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

  const ImgWithFallback = ({
                             src,
                             fallback,
                             type = 'image/avif',
                             ...delegated
                           }) => {
    return (
        <picture>
          <source srcSet={src} type={type} />
          <img src={fallback} {...delegated} />
        </picture>
    );
  };

  const sectionHeader = {
    title: 'Shrub Paper',
    paragraph: 'Try Crypto Options Trading without risking real money'
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
              Shrub Paper is the paper trading platform by Shrub Finance. Practice trading options in an easy to use platform powered by an intuitive UI.
            </p>
          </div>
          <div className="reveal-from-bottom center-content" data-reveal-delay="600">
            <Button tag="a" color="primary" wideMobile>
              <ReactGA.OutboundLink eventLabel="shrub paper main cta" to="https://paper.shrub.finance/" target="_blank" rel='noopener noreferrer'>
                Launch Shrub Paper
              </ReactGA.OutboundLink>
            </Button>

          </div>
        </div>
      </div>
    </section>
  );
}

ShrubPaper.propTypes = propTypes;
ShrubPaper.defaultProps = defaultProps;

export default ShrubPaper;