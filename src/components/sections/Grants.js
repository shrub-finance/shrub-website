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
    title: 'Grants',
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container" id="grants">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={tilesClasses}>

            <div className="tiles-item reveal-from-right center-content" data-reveal-delay="200">

              <ReactGA.OutboundLink eventLabel="grants" to="https://polygon.technology/" target="_blank" rel='noopener noreferrer'>
                <Image src={require('../../assets/images/partners/polygon.svg')} alt="Polygon"/>
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