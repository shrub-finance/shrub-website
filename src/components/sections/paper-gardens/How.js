import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import ReactGA from "react-ga";
import Image from "../elements/Image";

const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}

const How = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {

  const outerClasses = classNames(
    'testimonial section center-content-mobile',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'testimonial-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap',
    pushLeft && 'push-left'
  );


  const sectionHeader = {
    title: 'How',
    // paragraph: 'Vitae aliquet nec ullamcorper sit amet risus nullam eget felis semper quis lectus nulla at volutpat diam ut venenatis tellus—in ornare.'
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={tilesClasses}>

            <div className="tiles-item reveal-from-right center-content" data-reveal-delay="200">

              <ReactGA.OutboundLink eventLabel="Polygon" to="https://polygon.technology/" target="_blank" rel='noopener noreferrer'>
                <Image src={require('./../../assets/images/polygon.svg')} alt="Polygon"/>
              </ReactGA.OutboundLink>

              {/*<div className="tiles-item-inner">*/}
              {/*  <div className="testimonial-item-content">*/}
              {/*    <p className="text-sm mb-0">*/}
              {/*      — Duis aute irure dolor in reprehenderit in voluptate.*/}
              {/*        </p>*/}
              {/*  </div>*/}
              {/*  <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">*/}
              {/*    <span className="testimonial-item-name text-color-high">Roman Level</span>*/}
              {/*    <span className="text-color-low"> / </span>*/}
              {/*    <span className="testimonial-item-link">*/}
              {/*      <a href="#0">AppName</a>*/}
              {/*    </span>*/}
              {/*  </div>*/}
              {/*</div>*/}

            </div>

            <div className="tiles-item reveal-from-bottom center-content">
              <ReactGA.OutboundLink eventLabel="OWC" to="https://www.openwebcollective.com/" target="_blank" rel='noopener noreferrer'>
                <Image src={require('./../../assets/images/owc.svg')} alt="Open Web Collective"/>
              </ReactGA.OutboundLink>

              {/*<div className="tiles-item-inner">*/}
              {/*  <div className="testimonial-item-content">*/}
              {/*    <p className="text-sm mb-0">*/}
              {/*      — Duis aute irure dolor in reprehenderit in voluptate.*/}
              {/*        </p>*/}
              {/*  </div>*/}
              {/*  /!*<div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">*!/*/}
              {/*  /!*  <span className="testimonial-item-name text-color-high">Diana Rynzhuk</span>*!/*/}
              {/*  /!*  <span className="text-color-low"> / </span>*!/*/}
              {/*  /!*  <span className="testimonial-item-link">*!/*/}
              {/*  /!*    <a href="#0">AppName</a>*!/*/}
              {/*  /!*  </span>*!/*/}
              {/*  /!*</div>*!/*/}
              {/*</div>*/}
            </div>

            <div className="tiles-item reveal-from-left center-content" data-reveal-delay="200">
              <ReactGA.OutboundLink eventLabel="Near" to="https://near.org/" target="_blank" rel='noopener noreferrer'>
                <Image src={require('./../../assets/images/near.svg')} alt="Near Protocol"/>
              </ReactGA.OutboundLink>

              {/*<div className="tiles-item-inner">*/}
              {/*  <div className="testimonial-item-content">*/}
              {/*    <p className="text-sm mb-0">*/}
              {/*      — Duis aute irure dolor in reprehenderit in voluptate velit .*/}
              {/*        </p>*/}
              {/*  </div>*/}
              {/*  <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">*/}
              {/*    <span className="testimonial-item-name text-color-high">Ben Stafford</span>*/}
              {/*    <span className="text-color-low"> / </span>*/}
              {/*    <span className="testimonial-item-link">*/}
              {/*      <a href="#0">AppName</a>*/}
              {/*    </span>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

How.propTypes = propTypes;
How.defaultProps = defaultProps;

export default How;