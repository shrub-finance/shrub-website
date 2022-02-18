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
                        <h1 className="mt-0 mb-16 reveal-from-bottom roadmap-title" data-reveal-delay="200">
                            ROADMAP
                        </h1>
                    </div>
                    <hr/>
                    {/*claiming section*/}
                    <div className="center-content">
                        <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200" style={{paddingTop: '50px', textDecoration:'line-through'}}>
                            THE PAPER MERCHANT
                        </h1>
                        <div style={{fontWeight: "600", textDecoration:'line-through'}}>
                            <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="200">
                                Chapter 1 Complete
                            </p>

                        </div>
                    </div>
                    <div className={tilesClasses}>
                        <div className="tiles-item reveal-from-bottom">
                            <div className="tiles-item-inner">
                                <div className="features-tiles-item-header">
                                    <div className="features-tiles-item-image mb-16">
                                        <Image
                                            src='https://shrub.finance/power.svg'
                                            alt="Features tile icon 01"
                                            width={150}
                                            height={150}
                                        />
                                    </div>
                                </div>
                                <div className="features-tiles-item-content">
                                    <h4 className="mt-0 mb-8" style={{textDecoration:'line-through'}}>
                                        Seed Claiming
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    {/*sad seeds section*/}
                    <div className="center-content">
                        <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200" style={{paddingTop: '50px'}}>
                            THE SAD SEEDS
                        </h1>
                        <div style={{fontWeight: "600"}}>
                            <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                                Chapter 2 Ongoing
                            </p>
                        </div>
                    </div>
                    <div className={tilesClasses}>
                        <div className="tiles-item reveal-from-bottom">
                            <div className="tiles-item-inner">
                                <div className="features-tiles-item-header">
                                    <div className="features-tiles-item-image mb-16">
                                        <Image
                                            src='https://shrub.finance/passion-sad.svg'
                                            alt="Features tile icon 01"
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                </div>
                                <div className="features-tiles-item-content">
                                    <h4 className="mt-0 mb-8">
                                        Adoption, Contests, Raffle
                                    </h4>
                                </div>
                            </div>
                        </div>

                    </div>
                    <hr/>
                    {/*time to grow section*/}
                    <div className="center-content">
                        <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200" style={{paddingTop: '50px'}}>
                            TIME TO GROW
                        </h1>
                        <div style={{fontWeight: "600"}}>
                            <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                                Chapter 3
                            </p>
                        </div>
                    </div>
                    <div className={tilesClasses}>
                        <div className="tiles-item reveal-from-bottom">
                            <div className="tiles-item-inner">
                                <div className="features-tiles-item-header">
                                    <div className="features-tiles-item-image mb-16">
                                        <Image
                                            src={require('./../../assets/images/roadmap/pot.svg')}
                                            alt="Features tile icon 01"
                                            width={100}
                                            height={100}
                                            style={{marginTop: "10px"}}
                                        />
                                    </div>
                                </div>
                                <div className="features-tiles-item-content">
                                    <h4 className="mt-0 mb-8">
                                        Pot Sale
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="tiles-item reveal-from-bottom" data-reveal-delay="200">
                            <div className="tiles-item-inner">
                                <div className="features-tiles-item-header">
                                    <div className="features-tiles-item-image mb-16">
                                        <Image
                                            src={require('../../assets/images/roadmap/plant.svg')}
                                            alt="Features tile icon 02"
                                            width={100}
                                            height={100}
                                        />

                                    </div>
                                </div>
                                <div className="features-tiles-item-content">
                                    <h4 className="mt-0 mb-8">
                                        Plant Your Seed
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="tiles-item reveal-from-bottom" data-reveal-delay="400">
                            <div className="tiles-item-inner">
                                <div className="features-tiles-item-header">
                                    <div className="features-tiles-item-image mb-16">
                                        <Image
                                            src={require('./../../assets/images/roadmap/watering.svg')}
                                            alt="Features tile icon 03"
                                            width={300}
                                            style={!isMobile ? {marginTop: "-106px"}  : {}}
                                        />
                                    </div>
                                </div>
                                <div className="features-tiles-item-content">
                                    <h4 className="mt-0 mb-8">
                                        Water Your Shrub
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    {/*shrub paper section*/}
                    <div className="center-content">
                        <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200" style={{paddingTop: '50px'}}>
                            SHRUB PAPER
                        </h1>
                        <div style={{fontWeight: "600"}}>
                            <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                                Chapter 4
                            </p>
                        </div>
                    </div>
                    <div className={tilesClasses}>
                        <div className="tiles-item reveal-from-bottom">
                            <div className="tiles-item-inner">
                                <div className="features-tiles-item-header">
                                    <div className="features-tiles-item-image mb-16">
                                        <Image
                                            src={require('./../../assets/images/roadmap/roll.svg')}
                                            alt="Features tile icon 01"
                                            width={175}
                                        />
                                    </div>
                                </div>
                                <div className="features-tiles-item-content">
                                    <h4 className="mt-0 mb-8" >
                                        Trade Options with test tokens
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="tiles-item reveal-from-bottom" data-reveal-delay="200">
                            <div className="tiles-item-inner">
                                <div className="features-tiles-item-header">
                                    <div className="features-tiles-item-image mb-16">
                                        <Image
                                            src={require('../../assets/images/roadmap/leaderboard.svg')}
                                            alt="Features tile icon 02"
                                            width={!isMobile && 300}
                                        />

                                    </div>
                                </div>
                                <div className="features-tiles-item-content">
                                    <h4 className="mt-0 mb-8">
                                        Weekly Leaderboard
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="tiles-item reveal-from-bottom" data-reveal-delay="400">
                            <div className="tiles-item-inner">
                                <div className="features-tiles-item-header">
                                    <div className="features-tiles-item-image mb-16">
                                        <Image
                                            src={require('./../../assets/images/roadmap/fertilizer.svg')}
                                            alt="Features tile icon 03"
                                            width={165}
                                        />
                                    </div>
                                </div>
                                <div className="features-tiles-item-content">
                                    <h4 className="mt-0 mb-8">
                                        Earn Seeds and Fertilizer!
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    {/*paper dao section*/}
                    <div className="center-content">
                        <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200" style={{paddingTop: '50px'}}>
                            PAPER DAO
                        </h1>
                        <div style={{fontWeight: "600"}}>
                            <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                                Chapter 5
                            </p>
                        </div>
                    </div>
                    <div className={tilesClasses}>
                        <div className="tiles-item reveal-from-bottom">
                            <div className="tiles-item-inner">
                                <div className="features-tiles-item-header">
                                    <div className="features-tiles-item-image mb-16">
                                        <Image
                                            src={require('./../../assets/images/roadmap/dollar.svg')}
                                            alt="Features tile icon 01"
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                </div>
                                <div className="features-tiles-item-content">
                                    <h4 className="mt-0 mb-8">
                                        Control over Paper DAO Treasury
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="tiles-item reveal-from-bottom" data-reveal-delay="200">
                            <div className="tiles-item-inner">
                                <div className="features-tiles-item-header">
                                    <div className="features-tiles-item-image mb-16">
                                        <Image
                                            src={require('./../../assets/images/roadmap/vote.svg')}
                                            alt="Features tile icon 02"
                                            width={100}
                                            height={100}
                                        />

                                    </div>
                                </div>
                                <div className="features-tiles-item-content">
                                    <h4 className="mt-0 mb-8">
                                       Vote on next steps for Paper Gardens
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="tiles-item reveal-from-bottom" data-reveal-delay="400">
                            <div className="tiles-item-inner">
                                <div className="features-tiles-item-header">
                                    <div className="features-tiles-item-image mb-16">
                                        <Image
                                            src={require('./../../assets/images/roadmap/spirals.svg')}
                                            alt="Features tile icon 03"
                                            width={100}
                                            height={100}/>
                                    </div>
                                </div>
                                <div className="features-tiles-item-content">
                                    <h4 className="mt-0 mb-8">
                                        Decide what happens to lost seeds
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="container-xs" style={{marginTop: "50px", fontWeight: "600", color: "#9CA9B3"}}>
                            <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                                * Fully grown Shrubs grant entry into Paper DAO
                            </p>
                        </div>
                    </div>
                    <hr/>
                   {/*reveal section*/}
                    <div className="center-content">
                        <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="400" style={{paddingTop: '50px'}}>
                            SECRET PROJECT
                        </h1>
                    </div>
                    <div className={tilesClasses}>
                        <div className="tiles-item reveal-from-bottom">
                            <div className="tiles-item-inner">
                                <div className="features-tiles-item-header">
                                    <div className="features-tiles-item-image mb-16">
                                        <Image
                                            src={require('./../../assets/images/roadmap/mystery.svg')}
                                            alt="Features tile icon 01"
                                            width={150}
                                            height={150}
                                        />
                                    </div>
                                </div>
                                <div className="features-tiles-item-content">
                                    <h4 className="mt-0 mb-8">
                                        New DeFi Project
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="tiles-item reveal-from-bottom" data-reveal-delay="200">
                            <div className="tiles-item-inner">
                                <div className="features-tiles-item-header">
                                    <div className="features-tiles-item-image mb-16">
                                        <Image
                                            src={require('./../../assets/images/roadmap/nfts.svg')}
                                            alt="Features tile icon 02"
                                            width={300}
                                        />

                                    </div>
                                </div>
                                <div className="features-tiles-item-content">
                                    <h4 className="mt-0 mb-8" style={{marginTop:"10px"}}>
                                        Ties NFTs and Options together
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="tiles-item reveal-from-bottom" data-reveal-delay="400">
                            <div className="tiles-item-inner">
                                <div className="features-tiles-item-header">
                                    <div className="features-tiles-item-image mb-16">
                                        <Image
                                            src={require('./../../assets/images/roadmap/smile.svg')}
                                            alt="Features tile icon 03"
                                            width={150}
                                            height={150}/>
                                    </div>
                                </div>
                                <div className="features-tiles-item-content">
                                    <h4 className="mt-0 mb-8">
                                        Be the first to experience
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div style={{marginTop: "50px", fontWeight: "600", color: "#9CA9B3"}}>
                            <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                                * Paper DAO members will have early access
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


RoadMap.propTypes = propTypes;
RoadMap.defaultProps = defaultProps;

export default RoadMap;

