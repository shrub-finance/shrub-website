import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Button from "../elements/Button";
import ReactGA from "react-ga";

const propTypes = {
    ...SectionSplitProps.types
}

const defaultProps = {
    ...SectionSplitProps.defaults
}

const Tickets = ({
                           className,
                           topOuterDivider,
                           bottomOuterDivider,
                           topDivider,
                           bottomDivider,
                           hasBgColor,
                           invertColor,
                           invertMobile,
                           invertDesktop,
                           alignTop,
                           imageFill,
                           ...props
                       }) => {

    const outerClasses = classNames(
        'features-split section',
        topOuterDivider && 'has-top-divider',
        bottomOuterDivider && 'has-bottom-divider',
        hasBgColor && 'has-bg-color',
        invertColor && 'invert-color',
        className
    );

    const innerClasses = classNames(
        'features-split-inner section-inner',
        topDivider && 'has-top-divider',
        bottomDivider && 'has-bottom-divider'
    );

    const splitClasses = classNames(
        'split-wrap',
        invertMobile && 'invert-mobile',
        invertDesktop && 'invert-desktop',
        alignTop && 'align-top'
    );

    const sectionHeader = {
        title: 'NFT Tickets',
        paragraph: 'The Next Generation of Distribution'

    };
    return (
        <section
            {...props}
            className={outerClasses}
        >
            <div className="container" id="tickets">
                <div className={innerClasses}>
                    <SectionHeader data={sectionHeader} className="center-content" />
                    <div className="container-xs center-content" style={{fontWeight: "500", color:"#9CA9B3"}}>
                        <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                            NFT ticket is an innovative distribution system invented by the Shrub team.</p>
                        <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                            Trailblazed by Paper Gardens. Coming soon to everyone.
                        </p>
                        {/*<p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">*/}
                        {/*    Want to partner?*/}
                        {/*</p>*/}

                    </div>
                    {/*<div className="reveal-from-bottom center-content" data-reveal-delay="600">*/}
                    {/*    <Button tag="a" color="primary" wideMobile>*/}
                    {/*        <ReactGA.OutboundLink eventLabel="Documentation" to="https://discord.com/invite/csusZhYgTg" target="_blank" rel='noopener noreferrer'>*/}
                    {/*            Get in touch*/}
                    {/*        </ReactGA.OutboundLink>*/}
                    {/*    </Button>*/}

                    {/*</div>*/}
                </div>
            </div>
        </section>
    );
}

Tickets.propTypes = propTypes;
Tickets.defaultProps = defaultProps;

export default Tickets;