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
          <ReactGA.OutboundLink eventLabel="Footer Paper Garden App Link" to="https://gardens.shrub.finance" target="_blank" rel='noopener noreferrer'>
           Paper Gardens
          </ReactGA.OutboundLink>
        </li>
        <li style={{marginBottom: "20px"}}>
          <ReactGA.OutboundLink eventLabel="Footer Shrub Paper App Link" to="https://paper.shrub.finance" target="_blank" rel='noopener noreferrer'>
            Shrub Paper
          </ReactGA.OutboundLink>
        </li>
        <li style={{marginBottom: "20px"}}>
          <ReactGA.OutboundLink eventLabel="Footer Shrub Exchange Link" to="https://exchange.shrub.finance">
            Buy MATIC
          </ReactGA.OutboundLink>
        </li>
        <li style={{marginBottom: "20px"}}>
          <ReactGA.OutboundLink eventLabel="Footer Open Sea Link" to="https://opensea.io/collection/shrub-paper-gardens" target="_blank" rel='noopener noreferrer'>
           Open Sea
          </ReactGA.OutboundLink>
        </li>
        <li style={{marginBottom: "20px"}}>
          <ReactGA.OutboundLink eventLabel="Footer Github Link" to="https://github.com/shrub-finance" target="_blank" rel='noopener noreferrer'>
            GitHub
          </ReactGA.OutboundLink>
        </li>
        <li style={{marginBottom: "20px"}}>
          <ReactGA.OutboundLink eventLabel="Footer Blog Link" to="https://medium.com/@shrubfinance" target="_blank" rel='noopener noreferrer'>
            Blog
          </ReactGA.OutboundLink>
        </li>

        <li style={{marginBottom: "20px"}}>
          <ReactGA.OutboundLink eventLabel="Contact Us" to="https://discord.gg/csusZhYgTg" target="_blank" rel='noopener noreferrer'>
            Contact Us
          </ReactGA.OutboundLink>
        </li>
        {/*<li style={{marginBottom: "20px"}}>*/}
        {/*  <ReactGA.OutboundLink eventLabel="Contact Us Email" to="https://forms.gle/XHXU4kTGKyCnuNt87" >*/}
        {/*    <a title="Get in touch">Contact Us</a>*/}
        {/*  </ReactGA.OutboundLink>*/}
        {/*</li>*/}
        {/*<li style={{marginBottom: "20px"}}>*/}
        {/*  <ReactGA.OutboundLink eventLabel="Footer About Link" to="/about">*/}
        {/*    About Us*/}
        {/*</ReactGA.OutboundLink>*/}
        {/*</li>*/}

        {/*<li style={{marginBottom: "20px"}}>*/}
        {/*  <ReactGA.OutboundLink eventLabel="Footer Documentation Link" to="https://docs.shrub.finance/" target="_blank" rel='noopener noreferrer'>*/}
        {/*    <a title="Shrub's official docs">Docs</a>*/}
        {/*  </ReactGA.OutboundLink>*/}
        {/*</li>*/}
      </ul>
    </nav>
  );
}

export default FooterNav;