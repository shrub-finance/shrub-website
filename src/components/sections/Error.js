import React from 'react';
import classNames from 'classnames';
import {SectionProps} from '../../utils/SectionProps';

const propTypes = {
    ...SectionProps.types
}

const defaultProps = {
    ...SectionProps.defaults
}


const Error = ({
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
                       <h4 className="mt-0 mb-16 reveal-from-bottom" style={{fontWeight: 400}}data-reveal-delay="200">
                           ❗Email could not be verified. Please try again or report in <a style={{color: "#9CA9B3", textDecoration:"underline"}} href="https://discord.gg/csusZhYgTg">Shrub Discord.</a>
                        </h4>
            </div>
                </div>
            </div>
        </section>
    );
}


Error.propTypes = propTypes;
Error.defaultProps = defaultProps;

export default Error;
