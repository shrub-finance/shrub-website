import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import ReactGA from "react-ga";
import Image from "../elements/Image";
import ChefBud from "../../assets/images/team/john.svg";
import QueenBud from "../../assets/images/team/rachita.svg";
import PrincessBud from "../../assets/images/team/anastasi.svg";
import CloudBud from "../../assets/images/team/arkila.svg";
import StarBud1 from "../../assets/images/team/diep.svg";
import StarBud2 from "../../assets/images/team/jack.svg";
import AngelBud from "../../assets/images/team/thomas.svg";
import SnapbackBud from "../../assets/images/team/sunita.svg";

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
        <div className="container" id="team">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content" />
              {/*core devs*/}
            <div className={tilesClasses}>
              <div className="tiles-item team reveal-from-right center-content" data-reveal-delay="200" >

                <ReactGA.OutboundLink eventLabel="John" to="https://twitter.com/chefbud_eth" target="_blank" rel='noopener noreferrer'>
                  <Image width="100px" src={ChefBud} alt="John"/>
                    <div className="team-member">
                        <span className="team-info">Chef Bud John</span>
                        <p className="team-role">Core Dev</p>
                    </div>
                </ReactGA.OutboundLink>
              </div>

              <div className="tiles-item team reveal-from-left center-content" data-reveal-delay="200">
                <ReactGA.OutboundLink eventLabel="Rachita" to="https://twitter.com/0xqueenbud" target="_blank" rel='noopener noreferrer'>
                  <Image width="100px" src={QueenBud} alt="Rachita"/>
                    <div className="team-member">
                        <span className="team-info">Queen Bud Rachita</span>
                        <p className="team-role">Core Dev</p>
                    </div>
                </ReactGA.OutboundLink>
              </div>
            </div>

              {/*designers*/}
              <div className={tilesClasses}>
                  <div className="tiles-item team team-nohover reveal-from-right center-content" data-reveal-delay="200" >
                          <Image width="100px" src={PrincessBud} alt="Anastasi"/>
                          <div className="team-member">
                              <span className="team-info">Princess Bud Anastasi</span>
                              <p className="team-role">Artist</p>
                          </div>
                  </div>

                  <div className="tiles-item team team-nohover reveal-from-left center-content" data-reveal-delay="200">
                          <Image width="100px" src={CloudBud} alt="Arkilabot"/>
                          <div className="team-member" >
                              <span className="team-info">Cloud Bud Arkilabot</span>
                              <p className="team-role">Artist</p>
                          </div>
                  </div>
              </div>
              {/*community leads*/}
              <div className={tilesClasses}>
                  <div className="tiles-item team reveal-from-right center-content" data-reveal-delay="200" >
                      <ReactGA.OutboundLink eventLabel="John" to="https://twitter.com/diepca102" target="_blank" rel='noopener noreferrer'>
                          <Image width="100px" src={StarBud1} alt="Diep"/>
                          <div className="team-member">
                               <span className="team-info">Star Bud Diệp</span>
                              <p className="team-role">Community Lead</p>
                          </div>
                      </ReactGA.OutboundLink>
                  </div>
                  <div className="tiles-item team reveal-from-bottom center-content">
                      <ReactGA.OutboundLink eventLabel="Jack" to="https://twitter.com/jack_giao" target="_blank" rel='noopener noreferrer'>
                          <Image width="100px" src={StarBud2} alt="Jack"/>
                          <div className="team-member">
                              <span className="team-info">Star Bud Jack</span>
                              <p className="team-role">Community Lead</p>
                          </div>
                      </ReactGA.OutboundLink>
                  </div>
              </div>
              {/*ambassador*/}
              <div className={tilesClasses}>
                  <div className="tiles-item team team-nohover reveal-from-right center-content" data-reveal-delay="200" >
                          <Image width="100px" src={AngelBud} alt="Thomas"/>
                          <div className="team-member">
                              <span className="team-info">Angel Bud Thomas</span>
                              <p className="team-role">Project Manager</p>
                          </div>
                  </div>
                  <div className="tiles-item team team-nohover reveal-from-right center-content" data-reveal-delay="200" >
                          <Image width="100px" src={SnapbackBud} alt="Sunita"/>
                          <div className="team-member">
                              <span className="team-info">Snapback Bud Sunita</span>
                              <p className="team-role">Program Manager</p>
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