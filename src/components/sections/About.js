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
              {/*<p className="m-0 mb-32 "> One day he learned about options and some of the powerful things that could be done with them: gain leverage with buying calls, going short with puts, producing yield with covered calls, and buying into companies at a bargain by selling puts. It all sounded amazing, but his brokerage made it very difficult to sign up for trading options.</p>*/}
              {/*<p className="m-0 mb-32 "> Then he found Robinhood, a platform where with a few clicks he was able to make all the option trades he was imagining, with a nice explanatory UI.</p>*/}
              {/*<p className="m-0 mb-32 ">Then came January 28, 2021. Amid a populist run-up on Gamestop stock where over 1500% gains in less than a month produced massive potential wealth for its traders, Robinhood stepped in and froze trading. Gains were stuck, the momentum that had carried the stock to an all-time high was gone, prices crashed, and fortunes were lost in a matter of days.  </p>*/}
              {/*<p className="m-0 mb-32 "> John realized that neither he nor the other users of Robinhood were really in control of their money. The curtain had been pulled back on where Robinhood's true loyalty was - its market maker partners rather than its users. There has to be a better way, he thought. As he watched all the Reddit backlash on Robinhood unfold in the midst of a pandemic, a light bulb went off in his head, "What if options were traded on a decentralized platform so users do have full control of their money?" He talked with his friends Micah and Rachita and they agreed, they could build something better. </p>*/}
              <p className="m-0 mb-32 ">Then came July 13, 2022. Celsius froze user funds. Gains were stuck, prices crashed, and fortunes were lost in a matter of days. John realized that neither he nor the other users of Celsius were really in control of their money. The curtain had been pulled back on where Celsius's true loyalty was - itself rather than its users. As he watched the entire CeFi trading promise collapse one by one with BlockFi, FTX and others following suite, he thought there had to be a better way.</p>
              <p className="m-0 mb-32 "> And so, Shrub.finance was born - A user-centric platform for earning fixed-rate interest on your cryptocurrency. Shrub is written with one fundamental thought at its core - "The only one who should be in control of your money is you". With no misaligned incentives, no middleman, the capability to earn fixed-rate using an intuitive UI, users are truly in control. Borrow, Lends, be a Liquidity Provider - any way you want to unlock value of your capital is available on Shrub. Most of all, Shrub will never forget that who really matters is you.</p>
              

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