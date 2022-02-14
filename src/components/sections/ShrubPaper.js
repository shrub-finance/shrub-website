import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from "../elements/ButtonGroup";
import Button from "../elements/Button";
import ReactGA from "react-ga";
import Image from "../elements/Image";

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

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom paper" data-reveal-delay="200" >
                <p className="split-name">Shrub Paper
                </p>
            </h1>
            <div  style={{top: "20px", position:"relative", zIndex: "9999", fontSize:"40px", lineHeight:"1.8"}} className="reveal-from-bottom garden-text-2" data-reveal-delay="600">
              <ReactGA.OutboundLink eventLabel="Main CTA for Paper Gardens" to="/paper-gardens" >
                <a title="Go to Shrub.finance main page">Introducing Paper Gardens</a>
              </ReactGA.OutboundLink>
            </div>
            {/*<div  style={{top: "60px", position:"relative", zIndex: "9999", fontSize:"15px", fontWeight:"500"}} className="reveal-from-bottom" data-reveal-delay="600">*/}
            {/*  <ReactGA.OutboundLink eventLabel="CTA for nft claim" to="https://paper.shrub.finance/claim" >*/}
            {/*    <a style={{ color:"#9CA9B3"}} title="claim NFT">Claim NFT</a>*/}
            {/*  </ReactGA.OutboundLink>*/}
            {/*</div>*/}
            </div>
          <div className="reveal-from-bottom" data-reveal-delay="600" style={{marginTop: "70px"}}>
            <Button tag="a" color="primary" wideMobile href="https://discord.gg/swbVfEPyT8">
              <ReactGA.OutboundLink eventLabel="Main CTA for Shrub discord" to="https://discord.gg/swbVfEPyT8" target="_blank" rel='noopener noreferrer'>
                Join Paper Gardens
              </ReactGA.OutboundLink>
            </Button>
          </div>
          <div  style={{top: "8px", position:"relative", zIndex: "9999", fontSize:"14px", fontWeight:"500"}} className="reveal-from-bottom" data-reveal-delay="600">
            <ReactGA.OutboundLink eventLabel="CTA for Main Website" to="/main" >
              <a style={{ color:"#9CA9B3"}} title="Go to Shrub.finance main page">Shrub Main</a>
            </ReactGA.OutboundLink>
          </div>
          <div className="reveal-from-bottom" data-reveal-value="20px" data-reveal-delay="800">
            <p className="paper-image center-content-mobile">
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

ShrubPaper.propTypes = propTypes;
ShrubPaper.defaultProps = defaultProps;

export default ShrubPaper;