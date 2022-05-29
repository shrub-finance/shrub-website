import React, {useState} from 'react';
import classNames from 'classnames';
import {SectionProps} from '../../utils/SectionProps';
import ButtonGroup from "../elements/ButtonGroup";
import Button from "../elements/Button";
import ReactGA from "react-ga";
import Image from "../elements/Image";
import {isMobile, isSafari} from "react-device-detect";
import SectionHeader from "./partials/SectionHeader";

const propTypes = {
    ...SectionProps.types
}

const defaultProps = {
    ...SectionProps.defaults
}

const RoadMap = ({
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

    const tilesClasses = classNames(
        'tiles-wrap center-content',
        pushLeft && 'push-left'
    );


    return (
        <section
            {...props}
            className={outerClasses}
        >
            <div className="container">
                <div className={innerClasses}>
                    {/*roadmap section*/}
                    <div className="hero-content">
                        <ReactGA.OutboundLink eventLabel="Roadmap redirect" to="https://medium.com/@shrubfinance/shrub-roadmap-2022-b947b5ce1435" target="_blank" rel='noopener noreferrer'>
                            Launch Shrub Roadmap
                        </ReactGA.OutboundLink>
                    </div>
                </div>
            </div>
        </section>
    );
}


RoadMap.propTypes = propTypes;
RoadMap.defaultProps = defaultProps;

export default RoadMap;

