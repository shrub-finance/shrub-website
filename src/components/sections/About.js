import React from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}


const About = ({
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
          <div className="hero-content">
            <h1 className="mt-0 mb-16 ">
            Our Story
            </h1>
           
            <div className="container-sm" style={{marginTop: "50px", fontWeight: "500", color:"#9CA9B3", lineHeight: "30px", fontSize: "20px", textAlign: "left"}}>
              <p className="m-0 mb-32 ">John, one of the founders of Shrub had always loved the financial markets and being able to research companies and invest in them. For years he kept up this hobby, keeping up with all of the financial news and then buying an ownership stake in companies he believed were undervalued.</p>
              <p className="m-0 mb-32 ">Then came July 13, 2022. Celsius froze user funds. Gains were stuck, prices crashed, and fortunes were lost in a matter of days. John realized that neither he nor the other users of Celsius were really in control of their money. The curtain had been pulled back on where Celsius's true loyalty was - itself rather than its users. As he watched the entire CeFi trading promise collapse one by one with BlockFi, FTX and others following suite, he thought there had to be a better way.</p>
              <p className="m-0 mb-32 "> And so, Shrub.finance was born - A user-centric platform for earning fixed-rate interest on your cryptocurrency. Shrub is written with one fundamental thought at its core - "The only one who should be in control of your money is you". With no misaligned incentives, no middleman, the capability to earn fixed-rate using an intuitive UI, users are truly in control. Borrow, or Lends - any way you want to unlock value of your capital is available on Shrub in your terms. Shrub will never forget that who really matters is you.</p>
              

              </div>
            
          </div>
          
        
      </div>
      </div>
    </section>
  );
}

About.propTypes = propTypes;
About.defaultProps = defaultProps;

export default About;