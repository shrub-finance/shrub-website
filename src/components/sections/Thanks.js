import React from 'react';
import classNames from 'classnames';
import {SectionProps} from '../../utils/SectionProps';

const propTypes = {
    ...SectionProps.types
}

const defaultProps = {
    ...SectionProps.defaults
}


const Hero = ({
                  className,
                  topOuterDivider,
                  bottomOuterDivider,
                  topDivider,
                  bottomDivider,
                  hasBgColor,
                  invertColor,
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




    return (
        <section
            {...props}
            className={outerClasses}
        >
            <div className="container">
                <div className={innerClasses}>
                    <div className="hero-content" style={{marginTop: "10%"}}>
                       <h3 className="mt-0 mb-16 reveal-from-bottom" style={{fontWeight: 400}}data-reveal-delay="200">
                            Thanks for signing up for the Shrub waitlist. You are all set! 💃
                        </h3>
            </div>
                </div>
            </div>
        </section>
    );
}


Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;
