import React from 'react';
import classNames from 'classnames';
import {SectionTilesProps} from '../../../utils/SectionProps';
import SectionHeader from '../partials/SectionHeader';
import ReactGA from "react-ga";
import Image from "../../elements/Image";
import Button from "../../elements/Button";

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
        pushLeft && 'push-left'
    );


    const sectionHeader = {
        title: 'FAQs',
    };

    return (
        <section
            {...props}
            className={outerClasses}
        >
            <div className="container">
                <div className={innerClasses}>
                    <SectionHeader data={sectionHeader} className="center-content"/>
                    <div className={tilesClasses}>

                        <div className="reveal-from-right" data-reveal-delay="200">
                            <div className="container-xs" style={{fontWeight: "500", color: "#9CA9B3"}}>
                                <h4 className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">How many chapters are there?</h4>
                                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                                    5 chapters. <a style={{color: "#9CA9B3", textDecoration:"underline"}} href="https://gardens.shrub.finance/adoption">See roadmap for more details.</a>
                                </p>
                            </div>
                            <div className="container-xs" style={{fontWeight: "500", color: "#9CA9B3"}}>
                                <h4 className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">What is happening right now?</h4>
                                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                                    We are in Chapter 2. <a style={{color: "#9CA9B3", textDecoration:"underline"}} href="https://gardens.shrub.finance/">Follow the story here.</a>
                                </p>
                            </div>
                            <div className="container-xs" style={{fontWeight: "500", color: "#9CA9B3"}}>
                                <h4 className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">What's coming up next?</h4>
                                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                                    Chapter 3, where you will have the opportunity to purchase a pot and grow your Shrub.
                                </p>
                            </div>
                            <div className="container-xs" style={{fontWeight: "500", color: "#9CA9B3"}}>
                                <h4 className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">What does it all lead to?</h4>
                                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                                    Paper Gardens will culminate in the formation of Paper DAO. Each gradener will grow a unique Shrub to gain entry to the Paper DAO.
                                </p>
                            </div>
                            <div className="container-xs" style={{fontWeight: "500", color: "#9CA9B3"}}>
                                <h4 className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">Where can I find out about important dates, and events in the Paper Garden
                                    journey?</h4>
                                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                                    Shrub will keep everyone up to date on Shrub news via our <a
                                    href="https://twitter.com/shrubfinance">Twitter</a>. If you have any questions about
                                    the project, the best way is to join <a style={{color: "#9CA9B3", textDecoration:"underline"}} href="https://discord.gg/swbVfEPyT8">Shrub's
                                    Discord</a>. Shrub's core team makes a point to be available and respond to every question promptly.
                                </p>
                            </div>
                            <div className="container-xs" style={{fontWeight: "500", color: "#9CA9B3"}}>
                                <h4 className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">I missed out on Chapter 1. Is it too late to join?</h4>
                                <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                                    No. You can still participate in the Paper Gardens by getting a seed from <a
                                    style={{color: "#9CA9B3", textDecoration:"underline"}} href="https://opensea.io/collection/shrub-paper-gardens">OpenSea</a>, and joining
                                    your fellow gardeners in the journey.
                                </p>
                            </div>
                            <div className="reveal-from-bottom center-content" data-reveal-delay="600">
                                <Button tag="a" color="primary" className="btn-garden" wideMobile>
                                    <ReactGA.OutboundLink eventLabel="Clicked Open Sea collection link" target="_blank"
                                                          rel='noopener noreferrer'
                                                          to="https://opensea.io/collection/shrub-paper-gardens">
                                        Buy a Seed
                                    </ReactGA.OutboundLink>
                                </Button>
                            </div>
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