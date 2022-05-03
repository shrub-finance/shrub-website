import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Logo from './partials/Logo';
import ReactGA from "react-ga";
import {isMobile} from "react-device-detect";

const propTypes = {
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool
}

const defaultProps = {
  navPosition: '',
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false
}

const Header = ({
  className,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  ...props
}) => {

  const [isActive, setIsactive] = useState(false);

  const nav = useRef(null);
  const hamburger = useRef(null);

  useEffect(() => {
    isActive && openMenu();
    document.addEventListener('keydown', keyPress);
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('keydown', keyPress);
      document.removeEventListener('click', clickOutside);
      closeMenu();
    };
  });  

  const openMenu = () => {
    document.body.classList.add('off-nav-is-active');
    nav.current.style.maxHeight = nav.current.scrollHeight + 'px';
    setIsactive(true);
  }

  const closeMenu = () => {
    document.body.classList.remove('off-nav-is-active');
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  }

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  }

  const clickOutside = (e) => {
    if (!nav.current) return
    if (!isActive || nav.current.contains(e.target) || e.target === hamburger.current) return;
    closeMenu();
  }  

  const classes = classNames(
    'site-header',
    bottomOuterDivider && 'has-bottom-divider',
    className
  );

  const path = window.location.pathname;

  return (
    <header
      {...props}
      className={classes}
    >
      <div className="container">
        <div className={
          classNames(
              'site-header-inner',
              bottomDivider && 'has-bottom-divider'
          )}>
          <Logo />
          {!hideNav &&
          <>
         <button
                ref={hamburger}
                className="header-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
            >
              <span className="screen-reader">Menu</span>
              <span className="hamburger">
                  <span className="hamburger-inner"></span>
                </span>
            </button>
            <nav
                ref={nav}
                className={
                  classNames(
                      'header-nav',
                      isActive && 'is-active'
                  )}>
              <div className="header-nav-inner">
                <ul className={
                  classNames(
                      'list-reset text-xs',
                      navPosition && `header-nav-${navPosition}`
                  )}>
                  <li className="garden-text">
                    <ReactGA.OutboundLink eventLabel="Header Shrub Paper App Link" to="https://paper.shrub.finance" target="_blank" rel='noopener noreferrer'>
                      Shrub Paper
                    </ReactGA.OutboundLink>
                  </li>
                 <li className="garden-text">
                    <ReactGA.OutboundLink eventLabel="Header Paper Gardens App Link" to="https://gardens.shrub.finance" target="_blank" rel='noopener noreferrer'>
                      Paper Gardens
                    </ReactGA.OutboundLink>
                  </li>
                  {/*<li className="garden-text">*/}
                  {/*  <ReactGA.OutboundLink eventLabel="Buy Matic App Link" to="https://gardens.shrub.finance" target="_blank" rel='noopener noreferrer'>*/}
                  {/*    Buy Matic*/}
                  {/*  </ReactGA.OutboundLink>*/}
                  {/*</li>*/}
                  {/*<li>*/}
                  {/*  <ReactGA.OutboundLink eventLabel="Header Roadmap Link" to="/roadmap">*/}
                  {/*    Roadmap <span className="new">New</span>*/}
                  {/*  </ReactGA.OutboundLink>*/}
                  {/*</li>*/}

                  <li>
                    <ReactGA.OutboundLink eventLabel="Header Blog Link" to="https://medium.com/@shrubfinance" target="_blank" rel='noopener noreferrer'>
                      Blog
                    </ReactGA.OutboundLink>
                  </li>

                  {/*<li>*/}
                  {/*  <ReactGA.OutboundLink eventLabel="Header Docs Link" to="https://docs.shrub.finance" target="_blank" rel='noopener noreferrer'>*/}
                  {/*    Docs*/}
                  {/*  </ReactGA.OutboundLink>*/}
                  {/*</li>*/}
                </ul>
                {!hideSignin &&
                <ul className="list-reset header-nav-right">

                 <li>
                    <ReactGA.OutboundLink eventLabel="Header Twitter Link" to="https://twitter.com/shrubfinance" target="_blank" rel='noopener noreferrer'>
                        <svg width="20" height="20" fill="white" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z" />
                        </svg>
                    </ReactGA.OutboundLink>
                  </li>
                  {!isMobile  && <li>
                    <ReactGA.OutboundLink eventLabel="Header Shrub discord link" to="https://discord.gg/csusZhYgTg" target="_blank" rel='noopener noreferrer' className="button button-primary button-wide-mobile button-md">
                      Join Shrub Discord
                    </ReactGA.OutboundLink>
                  </li> }
                </ul>}
              </div>
            </nav>
          </>}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
