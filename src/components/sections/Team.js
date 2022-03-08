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
              {/*devs*/}
            <div className={tilesClasses}>
              <div className="tiles-item team reveal-from-right center-content" data-reveal-delay="200" >

                <ReactGA.OutboundLink eventLabel="John" to="https://twitter.com/jguthrie7" target="_blank" rel='noopener noreferrer'>
                  <Image width="100px" src={require('../../assets/images/team/john.svg')} alt="John"/>
                    <div style={{fontWeight:500, color:"#C4C4C4", paddingTop:"12px"}}>
                        <span className="team-info">Chef Bud</span>
                        <p style={{fontSize:"14px", marginTop:"-10px"}}>Core Dev</p>
                    </div>
                </ReactGA.OutboundLink>
              </div>

              <div className="tiles-item team reveal-from-left center-content" data-reveal-delay="200">
                <ReactGA.OutboundLink eventLabel="Rachita" to="https://twitter.com/way2rach" target="_blank" rel='noopener noreferrer'>
                  <Image width="100px" src={require('../../assets/images/team/rachita.svg')} alt="Rachita"/>
                    <div style={{fontWeight:500, color:"#C4C4C4", paddingTop:"12px"}} >
                        <span className="team-info">Queen Bud</span>
                        <p style={{fontSize:"14px", marginTop:"-10px"}}>Core Dev</p>
                    </div>
                </ReactGA.OutboundLink>
              </div>
            </div>
              {/*designers*/}
              <div className={tilesClasses}>
                  <div className="tiles-item team team-nohover reveal-from-right center-content" data-reveal-delay="200" >
                          <Image width="100px" src={require('../../assets/images/team/anastasi.svg')} alt="Anastasi"/>
                          <div style={{fontWeight:500, color:"#C4C4C4", paddingTop:"12px"}}>
                              <span className="team-info">Princess Bud</span>
                              <p style={{fontSize:"14px", marginTop:"-10px"}}>Artist</p>
                          </div>
                  </div>

                  <div className="tiles-item team team-nohover reveal-from-left center-content" data-reveal-delay="200">
                          <Image width="100px" src={require('../../assets/images/team/arkila.svg')} alt="Arkila"/>
                          <div style={{fontWeight:500, color:"#C4C4C4", paddingTop:"12px"}} >
                              <span className="team-info">Snapback Bud</span>
                              <p style={{fontSize:"14px", marginTop:"-10px"}}>Artist</p>
                          </div>
                  </div>
              </div>
              {/*community leads*/}
              <div className={tilesClasses}>
                  <div className="tiles-item team reveal-from-right center-content" data-reveal-delay="200" >

                      <ReactGA.OutboundLink eventLabel="John" to="https://twitter.com/diepca102" target="_blank" rel='noopener noreferrer'>
                          <Image width="100px" src={require('../../assets/images/team/diep.svg')} alt="Diep"/>
                          <div style={{fontWeight:500, color:"#C4C4C4", paddingTop:"12px"}}>
                               <span className="team-info">Star Bud Diệp</span>
                              <p style={{fontSize:"14px", marginTop:"-10px"}}>Community Lead</p>
                          </div>
                      </ReactGA.OutboundLink>
                  </div>

                  <div className="tiles-item team reveal-from-bottom center-content">
                      <ReactGA.OutboundLink eventLabel="Jack" to="https://twitter.com/jack_giao" target="_blank" rel='noopener noreferrer'>
                          <Image width="100px" src={require('../../assets/images/team/jack.svg')} alt="Jack"/>
                          <div style={{fontWeight:500, color:"#C4C4C4", paddingTop:"12px"}}>
                              <span className="team-info">Star Bud Jack</span>
                              <p style={{fontSize:"14px", marginTop:"-10px"}}>Community Lead</p>
                          </div>
                      </ReactGA.OutboundLink>
                  </div>


              </div>

              {/*evangelist*/}
              <div className={tilesClasses}>
                  <div className="tiles-item team team-nohover reveal-from-right center-content" data-reveal-delay="200" >


                          <Image width="100px" src={require('../../assets/images/team/thomas.svg')} alt="Thomas"/>
                          <div style={{fontWeight:500, color:"#C4C4C4", paddingTop:"12px"}}>
                              <span className="team-info">Angel Bud Thomas</span>
                              <p style={{fontSize:"14px", marginTop:"-10px"}}>Evangelist</p>
                          </div>
                  </div>

                  <div className="tiles-item team team-nohover reveal-from-right center-content" data-reveal-delay="200" >
                          <Image width="100px" src={require('../../assets/images/team/snapback.svg')} alt="Sunita"/>
                          <div style={{fontWeight:500, color:"#C4C4C4", paddingTop:"12px"}}>
                              <span className="team-info">Snapback Bud Sunita</span>
                              <p style={{fontSize:"14px", marginTop:"-10px"}}>Project Manager</p>
                          </div>
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