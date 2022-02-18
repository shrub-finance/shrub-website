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

const Team = ({
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
    title: 'Team',
    // paragraph: 'Shrub is truly community driven. Our buds have come from all over the world to join the Shrub mission'
  };

  return (
      <section
          {...props}
          className={outerClasses}
      >
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content" />
              <div className="center-content"  style={{fontSize:"25px", fontWeight:700, color:"#C4C4C4", paddingBottom:"20px"}} data-reveal-delay="200" >
                  Core Devs
              </div>
            <div className={tilesClasses}>
              <div className="tiles-item team reveal-from-right center-content" data-reveal-delay="200" >

                <ReactGA.OutboundLink eventLabel="John" to="https://twitter.com/jguthrie7" target="_blank" rel='noopener noreferrer'>
                  <Image src={require('../../assets/images/team/john.svg')} alt="John Guthrie"/>
                    <div style={{fontWeight:500, color:"#C4C4C4", paddingTop:"12px"}}>
                        John <span className="team-info">"Chef Bud"</span>
                    </div>
                </ReactGA.OutboundLink>
              </div>

              <div className="tiles-item team reveal-from-bottom center-content">
                <ReactGA.OutboundLink eventLabel="Micah" to="https://twitter.com/micahriggan" target="_blank" rel='noopener noreferrer'>
                  <Image src={require('../../assets/images/team/micah.svg')} alt="Micah Riggan"/>
                    <div style={{fontWeight:500, color:"#C4C4C4", paddingTop:"12px"}}>
                        Micah <span className="team-info">"Magi Bud"</span>
                    </div>
                </ReactGA.OutboundLink>
              </div>

              <div className="tiles-item team reveal-from-left center-content" data-reveal-delay="200">
                <ReactGA.OutboundLink eventLabel="Rachita" to="https://twitter.com/way2rach" target="_blank" rel='noopener noreferrer'>
                  <Image src={require('../../assets/images/team/rachita.svg')} alt="Rachita Joshi"/>
                    <div style={{fontWeight:500, color:"#C4C4C4", paddingTop:"12px"}} >
                        Rachita <span className="team-info">"Queen Bud"</span>
                    </div>
                </ReactGA.OutboundLink>
              </div>
            </div>
              <div className="center-content" style={{fontSize:"25px", fontWeight:700, color:"#C4C4C4", padding:"30px", marginTop:"50px"}} data-reveal-delay="200" >
                  Community Leaders
              </div>
              <div className={tilesClasses}>
                  <div className="tiles-item team reveal-from-right center-content" data-reveal-delay="200" >

                      <ReactGA.OutboundLink eventLabel="John" to="https://twitter.com/diepca102" target="_blank" rel='noopener noreferrer'>
                          <Image src={require('../../assets/images/team/diep.svg')} alt="Diep"/>
                          <div style={{fontWeight:500, color:"#C4C4C4", paddingTop:"12px"}}>
                              Diệp<span className="team-info">"Star Bud"</span>
                          </div>
                      </ReactGA.OutboundLink>
                  </div>

                  <div className="tiles-item team reveal-from-bottom center-content">
                      <ReactGA.OutboundLink eventLabel="Jack" to="https://twitter.com/jack_giao" target="_blank" rel='noopener noreferrer'>
                          <Image src={require('../../assets/images/team/jack.svg')} alt="Jack"/>
                          <div style={{fontWeight:500, color:"#C4C4C4", paddingTop:"12px"}}>
                              Jack <span className="team-info">"Star Bud"</span>
                          </div>
                      </ReactGA.OutboundLink>
                  </div>


              </div>
          </div>
        </div>
      </section>
  );
}

Team.propTypes = propTypes;
Team.defaultProps = defaultProps;

export default Team;