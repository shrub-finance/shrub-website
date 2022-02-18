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
          {!isMobile  &&  <button
                ref={hamburger}
                className="header-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
            >
              <span className="screen-reader">Menu</span>
              <span className="hamburger">
                  <span className="hamburger-inner"></span>
                </span>
            </button> }
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
                  {!path.includes('/main') &&
                      <li className="garden-text">
                    <ReactGA.OutboundLink eventLabel="Header Shrub homepage Link" to="/main">
                      Shrub Main
                    </ReactGA.OutboundLink>
                  </li>}
                  {!isMobile  && !path.includes('/main') && <li className="garden-text">
                    <ReactGA.OutboundLink eventLabel="Header Paper Gardens App Link" to="https://paper.shrub.finance" target="_blank" rel='noopener noreferrer'>
                      Paper Gardens
                    </ReactGA.OutboundLink>
                  </li>}

                  {!isMobile  && path.includes('/main') && <li>
                    <ReactGA.OutboundLink eventLabel="Header Docs Link" to="https://docs.shrub.finance" target="_blank" rel='noopener noreferrer'>
                      Docs
                    </ReactGA.OutboundLink>
                  </li> }

                  {/*{!isMobile  && <li>*/}
                  {/*  <ReactGA.OutboundLink eventLabel="Header Blog Link" to="https://medium.com/@shrubfinance" target="_blank" rel='noopener noreferrer'>*/}
                  {/*    Blog*/}
                  {/*  </ReactGA.OutboundLink>*/}
                  {/*</li> }*/}

                  {!isMobile  && <li>
                    <ReactGA.OutboundLink eventLabel="Header Roadmap Link" to="/roadmap">
                      Roadmap
                    </ReactGA.OutboundLink>
                  </li> }
                </ul>
                {!hideSignin &&
                <ul className="list-reset header-nav-right">

                  {!isMobile  && <li>
                    <ReactGA.OutboundLink eventLabel="Header Twitter Link" to="https://twitter.com/shrubfinance" target="_blank" rel='noopener noreferrer'>
                        <svg width="20" height="20" fill="white" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z" />
                        </svg>
                    </ReactGA.OutboundLink>
                  </li>}

                  {!isMobile  && !path.includes('/main') &&  <li>
                    <ReactGA.OutboundLink eventLabel="Header Discord Link" to="https://discord.gg/Z4SRKjmKRp" target="_blank" rel='noopener noreferrer'>
                      <a title="Join Shrub's Discord community">
                        <svg width="30" height="30" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0)">
                            <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" />
                          </g>
                          <defs>
                            <clipPath id="clip0">
                              <rect width="71" height="55" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                    </ReactGA.OutboundLink>
                  </li>}

                  {!isMobile  && path.includes('/main') && <li>
                    <ReactGA.OutboundLink eventLabel="Header Shrub discord link" to="https://discord.gg/swbVfEPyT8" target="_blank" rel='noopener noreferrer' className="button button-primary button-wide-mobile button-md">
                      Join Shrub Discord
                    </ReactGA.OutboundLink>
                  </li> }
                  {!isMobile  && !path.includes('/main') &&
                      <li>
                        <ReactGA.OutboundLink eventLabel="Header Open Sea Link" to="https://opensea.io/collection/shrub-paper-gardens" target="_blank" rel='noopener noreferrer' className="button button-primary button-wide-mobile button-md btn-garden">
                          View Collection
                        </ReactGA.OutboundLink>
                      </li>}
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
