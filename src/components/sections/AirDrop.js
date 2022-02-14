import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Button from '../elements/Button';
import * as list from '../../assets/json/airdroplist.json';
import {isMobile} from "react-device-detect";

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}


const AirDrop = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  }

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  }   

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

  const [input, updateInput] = React.useState('');
  const [message, updateMessage] = React.useState('');
  const [id, updateId] = React.useState('');
  const [code, updateCode] = React.useState('');

  const handleChange = (e) => {
    updateInput(e.target.value.trim());
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(input.length) {
      const msgUint8 = new TextEncoder().encode(input.toLowerCase());
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      if(list.default[hashHex]) {
        const [eligible, reason, id, betalist, waitlist, group] = list.default[hashHex];
        updateId(id);

        if(eligible === 1) {
          if(betalist === 1) {
            updateMessage('🔥 Congrats beta tester! You are eligible for the Shrub Paper  NFT!');
            updateCode(group);
          }  else {
            updateMessage('💃 Congrats! You are eligible for the Shrub Paper  NFT!');
            updateCode(group);
          }
        } else {
          updateMessage('This account did not qualify for the Shrub Paper  NFT.');
          updateId('');
          updateCode('');
        }

      } else {
        updateMessage('🙁 You missed out on this drop. Don\'t let this happen again. Follow Shrub.');
        updateCode('');
        updateId('');
      }

    }
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom paper-garden" data-reveal-delay="200" >
              Paper NFT Airdrop
            </h1>
            <div className="reveal-from-bottom" data-reveal-delay="600">
              <form className="search" onSubmit={handleSubmit}  action="..">
                <input placeholder="Check your NFT eligibility" aria-label="Search" type="search"
                       autoCapitalize="off" className="search-placeholder" onChange={handleChange}
                />
                <Button className="search-button" color="primary" wideMobile
                 type="submit" onClick={handleSubmit}>
                  Let's Go!
                </Button>
              </form>
              <p className="search-result-heading">{message}</p>
              {(code || id) && <div className="search-result">
                <span>ID: {id}</span>
                {code && <p>Group: {code}</p> }
              </div> }
              {isMobile && <Button className="search-button-mobile" color="primary" wideMobile
                      type="submit" onClick={handleSubmit}>
                Go!
              </Button>}
            </div>
            </div>
          <div className="reveal-from-bottom" data-reveal-value="20px" data-reveal-delay="800">
            <p className="paper-image airdrop center-content-mobile">
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

AirDrop.propTypes = propTypes;
AirDrop.defaultProps = defaultProps;

export default AirDrop;