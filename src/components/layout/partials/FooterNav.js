import React from 'react';
import classNames from 'classnames';
import ReactGA from "react-ga";

const FooterNav = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'footer-nav',
    className
  );

  return (
    <nav
      {...props}
      className={classes}
    >
      <ul className="list-reset text-xs">
        <li style={{marginBottom: "20px"}}>
          <ReactGA.OutboundLink eventLabel="Footer Paper Garden App Link" to="https://paper.shrub.finance" target="_blank" rel='noopener noreferrer'>
            <a title="Go to Shrub Paper App">Shrub Paper</a>
          </ReactGA.OutboundLink>
        </li>
        <li style={{marginBottom: "20px"}}>
          <ReactGA.OutboundLink eventLabel="Footer Paper Garden App Link" to="https://gardens.shrub.finance" target="_blank" rel='noopener noreferrer'>
            <a title="Go to Paper Gardens App">Paper Gardens</a>
          </ReactGA.OutboundLink>
        </li>
        {/*<li style={{marginBottom: "20px"}}>*/}
        {/*  <ReactGA.OutboundLink eventLabel="Footer Roadmap Link" to="/roadmap">*/}
        {/*    Roadmap<span className="new">New</span>*/}
        {/*  </ReactGA.OutboundLink>*/}

        {/*</li>*/}
        <li style={{marginBottom: "20px"}}>
          <ReactGA.OutboundLink eventLabel="Footer Open Sea Link" to="https://opensea.io/collection/shrub-paper-gardens" target="_blank" rel='noopener noreferrer'>
            <a title="View OpenSea collection">Open Sea</a>
          </ReactGA.OutboundLink>
        </li>
        <li style={{marginBottom: "20px"}}>
          <ReactGA.OutboundLink eventLabel="Footer Documentation Link" to="https://docs.shrub.finance/" target="_blank" rel='noopener noreferrer'>
            <a title="Shrub's official docs">Docs</a>
          </ReactGA.OutboundLink>
        </li>
        <li style={{marginBottom: "20px"}}>
          <ReactGA.OutboundLink eventLabel="Footer Github Link" to="https://github.com/shrub-finance" target="_blank" rel='noopener noreferrer'>
            <a title="Shrub's github">GitHub</a>
          </ReactGA.OutboundLink>
        </li>
        <li style={{marginBottom: "20px"}}>
          <ReactGA.OutboundLink eventLabel="Footer Blog Link" to="https://medium.com/@shrubfinance" target="_blank" rel='noopener noreferrer'>
            Blog
          </ReactGA.OutboundLink>
        </li>

        <li style={{marginBottom: "20px"}}>
          <ReactGA.OutboundLink eventLabel="Footer About Link" to="/about">
            About Us
        </ReactGA.OutboundLink>

        </li>

        <li style={{marginBottom: "20px"}}>
          <ReactGA.OutboundLink eventLabel="Contact Us Email" to="https://forms.gle/XHXU4kTGKyCnuNt87" >
            <a title="Get in touch">Contact Us</a>
          </ReactGA.OutboundLink>
        </li>
        {/*<li style={{marginBottom: "20px"}}>*/}
        {/*  <ReactGA.OutboundLink eventLabel="Partnership Link" to="mailto:partnerships@shrub.finance" >*/}
        {/*    <a title="Explore integrations with Shrub">Build on Shrub</a>*/}
        {/*  </ReactGA.OutboundLink>*/}
        {/*</li>*/}
        {/*<li style={{marginBottom: "20px"}}>*/}
        {/*  <ReactGA.OutboundLink eventLabel="Career Link" to="mailto:careers@shrub.finance" >*/}
        {/*    <a title="Explore Careers at Shrub.finance">Careers</a>*/}
        {/*  </ReactGA.OutboundLink>*/}
        {/*</li>*/}
      </ul>
    </nav>
  );
}

export default FooterNav;