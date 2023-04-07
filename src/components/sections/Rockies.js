import React, {useState} from 'react';
import classNames from 'classnames';
import {SectionProps} from '../../utils/SectionProps';
import Button from "../elements/Button";
import ReactGA from "react-ga";
import {isMobile} from "react-device-detect";
import * as list from "../../assets/json/airdroplist.json";
import axios from "axios";

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

    const ImgWithFallback = ({
                                 src,
                                 fallback,
                                 type = 'image/avif',
                                 ...delegated
                             }) => {
        return (
            <picture>
                <source srcSet={src} type={type}/>
                <img src={fallback} {...delegated} />
            </picture>
        );
    };

    const [email, updateEmail] = React.useState('');
    const [toggle, updateToggle] = React.useState(false);
    const [message, updateMessage] = React.useState('');

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const handleChange = (e) => {
        updateEmail(e.target.value.trim());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formId = '230897134126053';

        if (email.length) {
            if (isValidEmail(email)) {
                try {

                    const response = await axios.post('https://submissions.shrub.finance/lend-waitlist', {email});

                    console.log('success');
                    updateMessage('');
                    updateEmail(email.trim());
                    updateToggle(!toggle);
                } catch (error) {
                    console.error('Error:', error);
                    updateMessage('🙁 Something went wrong. Please try again.');
                }

            } else {
                updateMessage('❗Please enter a valid email address');
            }

        } else {
            updateMessage('👇Please enter an email below!');
        }

    };

    return (
        <section
            {...props}
            className={outerClasses}
        >
            <div className="container">
                <div className={innerClasses}>
                    <div className="hero-content" style={{marginTop: "20%"}}>
                        {/*opening*/}
                        {!isMobile && <h1 className="mt-0 mb-16 reveal-from-bottom jumbo" style={{fontWeight: 400}}data-reveal-delay="200">
                            Your Crypto. Your Terms.
                        </h1>}

                        {isMobile && <h1 className="mt-0 mb-16 reveal-from-bottom jumbo" data-reveal-delay="200">
                            Your Crypto.<p style={{marginTop: "4%"}}> Your Terms.</p>
                        </h1>}

                        {/*subtitle*/}
                        <div className="container-xs" style={{marginTop: "10%"}}>

                            <div className="reveal-from-bottom" data-reveal-delay="600">
                                <p className="search-result-heading">{message}</p>
                                {!toggle &&
                                    <form className="search" onSubmit={handleSubmit} action="..">
                                        <input name="email" placeholder="Enter your email" aria-label="email"
                                               type="email"
                                               autoCapitalize="off" className="input-placeholder"
                                               onChange={handleChange}
                                        />
                                        <Button className="search-button search-button2 no-select" wideMobile
                                                type="submit" onClick={handleSubmit}>
                                            Join the waitlist
                                        </Button>
                                    </form>}
                                    {isMobile && !toggle && <Button className="search-button-mobile no-select" color="primary" wideMobile
                                                         type="submit" onClick={handleSubmit}>
                                        Join the waitlist
                                    </Button>}

                                {toggle && <div>
                                    <h3>📨 Check your inbox</h3>
                                    <p>To complete the sign up, please verify your email.</p>
                                </div>}
                            </div>

                            {isMobile && <p style={{paddingTop: "120px", fontWeight: "500", fontSize: "40px", lineHeight:"1.5"}}> Lending <br/>re<span
                                style={{position: "relative"}}>DeFi
                               <svg style={{position: "absolute", left: "0", bottom: "-8px"}} viewBox="0 0 180 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M166.548 5.42254C169.74 5.56801 172.705 5.68081 175.643 5.851C176.461 5.89831 177.953 5.88296 177.822 6.28909C177.677 6.73586 176.181 6.69797 175.198 6.67783C169.898 6.57144 164.604 6.41666 159.306 6.30437C143.308 5.96545 127.302 5.98348 111.286 6.11928C90.1735 6.29829 69.1995 7.11191 48.1837 7.75069C37.0797 8.08841 26.0115 8.62454 14.8355 8.61267C11.7945 8.60918 8.81592 8.4559 5.89381 8.16158C0.95364 7.664 -0.766786 6.34489 1.45767 4.70208C2.63566 3.83181 3.64229 2.90634 6.1209 2.36183C7.4798 2.06335 8.68677 1.85551 9.75425 2.52759C10.6592 3.09763 12.2806 3.1349 13.9504 3.2949C19.9455 3.87048 26.0511 3.43696 31.5878 3.0317C38.6561 2.51378 45.8312 2.16653 52.9044 1.77041C61.1926 1.30608 69.6276 0.998284 78.0432 0.73897C88.48 0.417207 98.9572 0.46713 109.386 0.0916648C112.469 -0.0202583 115.94 -0.140277 118.994 0.458795C119.074 0.474409 119.239 0.473907 119.299 0.454824C122.326 -0.510684 126.021 1.09003 129.08 0.128165C129.403 0.0271479 130.214 -0.0175498 130.551 0.0567815C134.834 1.00155 139.754 0.266604 144.23 0.745091C145.84 0.916945 147.721 1.01929 149.338 0.573958C149.63 0.493763 150.236 0.443503 150.525 0.497913C154.429 1.23465 159.084 0.590299 162.952 1.37867C163.207 1.43066 163.628 1.47236 163.856 1.43227C167.766 0.748673 170.779 2.45096 174.77 1.94303C176.052 1.77996 178.584 3.45686 177.58 3.96471C176.54 4.49122 177.027 4.54472 178.213 4.68333C178.904 4.76459 179.753 4.85461 179.429 5.20823C179.076 5.59123 178.181 5.49262 177.329 5.45531C174.334 5.3239 171.331 5.21232 168.328 5.10372C167.733 5.08215 167.051 5.03388 166.548 5.42254Z" fill="#31FFA6"/>
    <path d="M44.4925 21.756C41.643 21.1865 41.5746 20.5231 43.998 19.2481C45.5294 18.4427 47.5042 18.0322 50.4957 17.9996C58.0727 17.9168 65.5831 17.4316 73.1858 17.389C75.7772 17.3745 75.8285 17.6377 75.8528 18.5502C75.9024 20.3607 72.3844 20.6075 68.9238 20.9178C62.7626 21.4711 56.5869 22.0228 50.1613 21.9993C48.0756 21.992 46.0085 21.9499 44.4925 21.756Z" fill="#31FFA6"/>
</svg>

                              </span>ned
                            </p>}

                            {!isMobile &&  <p style={{paddingTop: "180px", fontWeight: "500", fontSize: "40px"}}> Lending re<span
                                style={{position: "relative"}}>DeFi
                                <svg style={{position: "absolute", left: "0", bottom: "-8px"}} viewBox="0 0 180 22"
                                     xmlns="http://www.w3.org/2000/Box">
                                  <path fillRule="evenodd" clipRule="evenodd"
                                        d="M166.548 5.42254C169.74 5.56801 172.705 5.68081 175.643 5.851C176.461 5.89831 177.953 5.88296 177.822 6.28909C177.677 6.73586 176.181 6.69797 175.198 6.67783C169.898 6.57144 164.604 6.41666 159.306 6.30437C143.308 5.96545 127.302 5.98348 111.286 6.11928C90.1735 6.29829 69.1995 7.11191 48.1837 7.75069C37.0797 8.08841 26.0115 8.62454 14.8355 8.61267C11.7945 8.60918 8.81592 8.4559 5.89381 8.16158C0.95364 7.664 -0.766786 6.34489 1.45767 4.70208C2.63566 3.83181 3.64229 2.90634 6.1209 2.36183C7.4798 2.06335 8.68677 1.85551 9.75425 2.52759C10.6592 3.09763 12.2806 3.1349 13.9504 3.2949C19.9455 3.87048 26.0511 3.43696 31.5878 3.0317C38.6561 2.51378 45.8312 2.16653 52.9044 1.77041C61.1926 1.30608 69.6276 0.998284 78.0432 0.73897C88.48 0.417207 98.9572 0.46713 109.386 0.0916648C112.469 -0.0202583 115.94 -0.140277 118.994 0.458795C119.074 0.474409 119.239 0.473907 119.299 0.454824C122.326 -0.510684 126.021 1.09003 129.08 0.128165C129.403 0.0271479 130.214 -0.0175498 130.551 0.0567815C134.834 1.00155 139.754 0.266604 144.23 0.745091C145.84 0.916945 147.721 1.01929 149.338 0.573958C149.63 0.493763 150.236 0.443503 150.525 0.497913C154.429 1.23465 159.084 0.590299 162.952 1.37867C163.207 1.43066 163.628 1.47236 163.856 1.43227C167.766 0.748673 170.779 2.45096 174.77 1.94303C176.052 1.77996 178.584 3.45686 177.58 3.96471C176.54 4.49122 177.027 4.54472 178.213 4.68333C178.904 4.76459 179.753 4.85461 179.429 5.20823C179.076 5.59123 178.181 5.49262 177.329 5.45531C174.334 5.3239 171.331 5.21232 168.328 5.10372C167.733 5.08215 167.051 5.03388 166.548 5.42254Z"
                                        fill="#31FFA6"></path>
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M44.4925 21.756C41.643 21.1865 41.5746 20.5231 43.998 19.2481C45.5294 18.4427 47.5042 18.0322 50.4957 17.9996C58.0727 17.9168 65.5831 17.4316 73.1858 17.389C75.7772 17.3745 75.8285 17.6377 75.8528 18.5502C75.9024 20.3607 72.3844 20.6075 68.9238 20.9178C62.7626 21.4711 56.5869 22.0228 50.1613 21.9993C48.0756 21.992 46.0085 21.9499 44.4925 21.756Z"
                        fill="#31FFA6"></path>
                                </svg>
                              </span>ned
                            </p>}
                        </div>
                        {/*waitlist*/}
                        <p className="m-0 mb-32 " style={{marginTop: "5%"}}>
                            Coming 2023
                        </p>

                    </div>
                </div>
            </div>
        </section>
    );
}


Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;