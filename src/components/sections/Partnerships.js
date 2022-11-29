import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import ReactGA from "react-ga";
import Image from "../elements/Image";
import Polygon from '../../assets/images/partners/polygon.svg';
import PolygonStudios from '../../assets/images/partners/polygon-studios.svg';
import Near from '../../assets/images/partners/near.svg';
import OWC from '../../assets/images/partners/owc.svg';
import Wyre from '../../assets/images/partners/wyre.svg';


const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}

const Partnerships = ({
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
    title: 'Partnerships',
    // paragraph: 'Vitae aliquet nec ullamcorper sit amet risus nullam eget felis semper quis lectus nulla at volutpat diam ut venenatis tellus—in ornare.'
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container" id="partnerships">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={tilesClasses}>

            <div className="tiles-item reveal-from-right center-content give-mt" data-reveal-delay="200">
              <ReactGA.OutboundLink eventLabel="Polygon" to="https://polygon.technology/" target="_blank" rel='noopener noreferrer'>
                <Image src={Polygon} alt="Polygon"/>
              </ReactGA.OutboundLink>
            </div>


            <div className="tiles-item reveal-from-bottom center-content give-mt" data-reveal-delay="200">
              <ReactGA.OutboundLink eventLabel="OWC" to="https://www.openwebcollective.com/" target="_blank" rel='noopener noreferrer'>
                <Image src={OWC} alt="Open Web Collective"/>
              </ReactGA.OutboundLink>

            </div>

            <div className="tiles-item reveal-from-left center-content give-mt" data-reveal-delay="200">
              <ReactGA.OutboundLink eventLabel="Near" to="https://near.org/" target="_blank" rel='noopener noreferrer'>
                <Image src={Near} alt="Near Protocol"/>
              </ReactGA.OutboundLink>

            </div>

            <div className="tiles-item reveal-from-left center-content give-mt" data-reveal-delay="200">
              <ReactGA.OutboundLink eventLabel="Polygon Studios" to="https://polygonstudios.com/" target="_blank" rel='noopener noreferrer'>
                <Image src={PolygonStudios} alt="Polygon Studios"/>
              </ReactGA.OutboundLink>
            </div>



            <div className="tiles-item reveal-from-left center-content give-mt" data-reveal-delay="200">
              <ReactGA.OutboundLink eventLabel="Wyre" to="https://www.sendwyre.com/" target="_blank" rel='noopener noreferrer'>
                <Image src={Wyre} alt="Wyre"/>
              </ReactGA.OutboundLink>

            </div>


          </div>
        </div>
      </div>
    </section>
  );
}

Partnerships.propTypes = propTypes;
Partnerships.defaultProps = defaultProps;

export default Partnerships;