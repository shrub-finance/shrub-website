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

                    const response = await axios.post('https://submissions.shrub.finance/lend-waitlist', null, {
                        params: {
                            email: email,
                        },
                    });

                    console.log('success');
                    updateMessage('');
                    updateEmail(email.trim());
                    updateToggle(!toggle);
                } catch (error) {
                    console.error('Error:', error);
                    console.error('failed to submit');
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


                                    <p>Thanks for signing up 🔥.</p>
                                    {/*<div>*/}
                                    {/*    <Button tag="a" color="primary" wideMobile href="https://discord.gg/csusZhYgTg" className="no-select">*/}
                                    {/*        <ReactGA.OutboundLink eventLabel="via lend waitlist"*/}
                                    {/*                              to="https://discord.gg/csusZhYgTg" target="_blank"*/}
                                    {/*                              rel='noopener noreferrer'>*/}
                                    {/*            Go to Shrub Discord*/}
                                    {/*        </ReactGA.OutboundLink>*/}
                                    {/*    </Button>*/}
                                    {/*</div>*/}
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
                        {/*<div className="reveal-from-bottom" data-reveal-delay="600">*/}
                        {/*    <ReactGA.OutboundLink eventLabel="main CTA to Shrub Roadmap" to="https://medium.com/@shrubfinance/shrub-roadmap-2022-b947b5ce1435" target="_blank" rel='noopener noreferrer'>*/}
                        {/*    <Button tag="a" color="primary" wideMobile href="https://medium.com/@shrubfinance/shrub-roadmap-2022-b947b5ce1435">*/}

                        {/*            Shrub Roadmap*/}

                        {/*    </Button>*/}
                        {/*    </ReactGA.OutboundLink>*/}
                        {/*            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">*/}
                        {/*              DeFi crypto products for <span style={{position: "relative"}}>everyone*/}
                        {/*              <svg style={{position:"absolute", left:"1%"}} viewBox="0 0 180 22" xmlns="http://www.w3.org/2000/Box">*/}
                        {/*                <path fillRule="evenodd" clipRule="evenodd" d="M166.548 5.42254C169.74 5.56801 172.705 5.68081 175.643 5.851C176.461 5.89831 177.953 5.88296 177.822 6.28909C177.677 6.73586 176.181 6.69797 175.198 6.67783C169.898 6.57144 164.604 6.41666 159.306 6.30437C143.308 5.96545 127.302 5.98348 111.286 6.11928C90.1735 6.29829 69.1995 7.11191 48.1837 7.75069C37.0797 8.08841 26.0115 8.62454 14.8355 8.61267C11.7945 8.60918 8.81592 8.4559 5.89381 8.16158C0.95364 7.664 -0.766786 6.34489 1.45767 4.70208C2.63566 3.83181 3.64229 2.90634 6.1209 2.36183C7.4798 2.06335 8.68677 1.85551 9.75425 2.52759C10.6592 3.09763 12.2806 3.1349 13.9504 3.2949C19.9455 3.87048 26.0511 3.43696 31.5878 3.0317C38.6561 2.51378 45.8312 2.16653 52.9044 1.77041C61.1926 1.30608 69.6276 0.998284 78.0432 0.73897C88.48 0.417207 98.9572 0.46713 109.386 0.0916648C112.469 -0.0202583 115.94 -0.140277 118.994 0.458795C119.074 0.474409 119.239 0.473907 119.299 0.454824C122.326 -0.510684 126.021 1.09003 129.08 0.128165C129.403 0.0271479 130.214 -0.0175498 130.551 0.0567815C134.834 1.00155 139.754 0.266604 144.23 0.745091C145.84 0.916945 147.721 1.01929 149.338 0.573958C149.63 0.493763 150.236 0.443503 150.525 0.497913C154.429 1.23465 159.084 0.590299 162.952 1.37867C163.207 1.43066 163.628 1.47236 163.856 1.43227C167.766 0.748673 170.779 2.45096 174.77 1.94303C176.052 1.77996 178.584 3.45686 177.58 3.96471C176.54 4.49122 177.027 4.54472 178.213 4.68333C178.904 4.76459 179.753 4.85461 179.429 5.20823C179.076 5.59123 178.181 5.49262 177.329 5.45531C174.334 5.3239 171.331 5.21232 168.328 5.10372C167.733 5.08215 167.051 5.03388 166.548 5.42254Z" fill="#b1e7a1"></path>*/}
                        {/*<path fillRule="evenodd" clipRule="evenodd" d="M44.4925 21.756C41.643 21.1865 41.5746 20.5231 43.998 19.2481C45.5294 18.4427 47.5042 18.0322 50.4957 17.9996C58.0727 17.9168 65.5831 17.4316 73.1858 17.389C75.7772 17.3745 75.8285 17.6377 75.8528 18.5502C75.9024 20.3607 72.3844 20.6075 68.9238 20.9178C62.7626 21.4711 56.5869 22.0228 50.1613 21.9993C48.0756 21.992 46.0085 21.9499 44.4925 21.756Z" fill="#b1e7a1"></path>*/}
                        {/*              </svg>*/}
                        {/*            </span>*/}
                        {/*            </h1>*/}
                        {/*<div className="container-xs" style={{marginTop: "70px", fontWeight: "500", color: "#9CA9B3"}}>*/}
                            {/*<p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">*/}
                            {/*    At Shrub, we envision a world where users are in control of their own money.*/}
                            {/*</p>*/}
                            {/*<div className="reveal-from-bottom" data-reveal-delay="600">*/}
                            {/*    <ReactGA.OutboundLink eventLabel="main CTA to Shrub Roadmap" to="https://medium.com/@shrubfinance/shrub-roadmap-2022-b947b5ce1435" target="_blank" rel='noopener noreferrer'>*/}
                            {/*    <Button tag="a" color="primary" wideMobile href="https://medium.com/@shrubfinance/shrub-roadmap-2022-b947b5ce1435">*/}

                            {/*            Shrub Roadmap*/}

                            {/*    </Button>*/}
                            {/*    </ReactGA.OutboundLink>*/}
                            {/*</div>*/}
                            {/*    <div className="reveal-from-bottom" data-reveal-delay="600">*/}
                            {/*      <Button tag="a" color="primary" wideMobile href="https://discord.gg/csusZhYgTg">*/}
                            {/*      <ReactGA.OutboundLink eventLabel="main CTA to Shrub discord" to="https://discord.gg/csusZhYgTg" target="_blank" rel='noopener noreferrer'>*/}
                            {/*        Join Shrub Discord*/}
                            {/*      </ReactGA.OutboundLink>*/}
                            {/*      </Button>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    </div>
                    {/*Giant Shrub logo*/}
                    {/*<div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">*/}
                    {/*    <svg width="500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 334 229">*/}
                    {/*        <path stroke="#64A56A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.92177" d="M166.577 101.016c-.016.015-.045.031-.088.047-.092.354-.035-1.781.171-6.4064.207-4.6254.091-9.5819-.346-14.8696-.435-5.289-.965-9.5949-1.59-12.9173-.623-3.3224-1.309-6.7303-2.06-10.2238-.749-3.4921-1.246-6.083-1.492-7.7727-.244-1.6897-.619-3.6299-1.124-5.8204-.506-2.1892-1.171-4.1843-1.995-5.9853-.825-1.7997-1.542-3.296-2.15-4.489-.608-1.1917-1.105-2.1314-1.49-2.8195-.385-.6881-.698-1.248-.938-1.6796h-.051v-.0488h-.051v-.0469h-.049c-.437-.2714-.65-.4045-.639-.3991.009.0068.027.0178.055.0327-.546-.4153-.819-.6278-.821-.6373 0-.0109.004-.0109.01 0-.239-.2674-1.153-.8815-2.744-1.8424-1.591-.9609-2.868-1.7053-3.833-2.2332-.965-.528-2.267-.9569-3.905-1.2867s-3.174-.91-4.607-1.7406c-1.432-.8292-3.543-1.3457-6.334-1.5493-2.79-.2022-4.995-.3461-6.616-.4316-1.622-.0855-3.07.0048-4.344.2708-1.275.2674-2.24.5707-2.897.91-.656.3393-1.138.5863-1.446.741-.309.1547-.953.8666-1.932 2.1356.622.1235 2.401.3657 5.338.7267 2.937.3624 5.173.581 6.706.6556 1.535.076 2.764.2429 3.687.5008.923.2578 1.802.5355 2.636.8327.834.2973 2.574.8686 5.222 1.7142 2.648.8455 4.697 1.5791 6.146 2.2007 1.45.6216 2.817.9771 4.103 1.0667 1.286.0896 2.269.1493 2.947.1792.679.0298 1.185.0794 1.519.1486.333.0706.533.0645.603-.0183.07-.0828.19-.207.36-.3726.17-.1642.273-.3088.309-.4337.037-.1248.04-.1391.009-.0427-.033.095.027.0027.181-.2769.152-.2796.362-.7512.631-1.4149.269-.6636 1.225-2.3636 2.87-5.0997 1.645-2.7361 3.02-4.9571 4.125-6.6631 1.105-1.7047 2.252-3.3313 3.443-4.8799 1.191-1.5486 2.101-2.67036 2.728-3.36525.627-.69354 1.186-1.25946 1.679-1.69784.491-.43974 1.006-.81231 1.543-1.11768.539-.30538.871-.4933.996-.56388.126-.06922.169-.0909.128-.06511-.039.02579-.052.02844-.039.00808.015-.019.186-.08001.511-.18316.326-.10179.577-.07746.754.07319.176.15065.299.44319.368.8775.071.43566.071.81089.002 1.12576-.069.31351-.501.9901-1.297 2.02972-.796 1.04098-1.718 2.40837-2.764 4.10217-1.048 1.6938-2.177 3.406-3.388 5.1364-1.211 1.7304-2.926 3.8782-5.147 6.4433-2.22 2.5665-4.569 4.9015-7.045 7.0052-.034-.1479-.068-.2958-.1-.4437"/>*/}
                    {/*        <path fill="#B0E8A1" d="M251.975 164.345c0 60.117-41.601 50.436-88.954 50.436-47.373 0-82.5838 9.681-82.5838-50.436 0-9.141.8958-18.037 2.5855-26.527 9.324-47.3324 43.0373-82.3484 83.2033-82.3484 39.739 0 73.147 34.2627 82.899 80.8214 1.873 8.958 2.85 18.363 2.85 28.054Z"/>*/}
                    {/*        <path fill="#B0E8A1" d="M251.975 164.345c0 60.118-43.225 52.781-90.578 52.781-47.373 0-80.9598 7.337-80.9598-52.781 0-9.141.8958-18.037 2.5855-26.527 20.2363 10.281 49.3073 16.714 81.6153 16.714 33.856 0 64.169-7.064 84.487-18.24 1.873 8.957 2.85 18.363 2.85 28.053Z"/>*/}
                    {/*        <path fill="#50514F" d="M210.485 145.025c0 8.693-5.395 14.19-12.052 14.19s-12.052-5.477-12.052-14.19c0-8.693 3.155-17.325 9.813-17.325 6.657 0 14.291 8.632 14.291 17.325Z"/>*/}
                    {/*        <path fill="#fff" d="M201.1 138.327c2.012 0 3.644-1.631 3.644-3.644 0-2.012-1.632-3.644-3.644-3.644-2.013 0-3.644 1.632-3.644 3.644 0 2.013 1.631 3.644 3.644 3.644Zm-5.392 17.317c3.119-.331 5.237-4.47 4.729-9.244-.507-4.774-3.447-8.376-6.567-8.044-3.119.332-5.236 4.471-4.729 9.245.508 4.774 3.448 8.375 6.567 8.043Zm17.159-37.899c-.977 0-1.954-.468-2.545-1.343-.265-.408-6.759-9.833-16.958-8.144-1.649.265-3.237-.855-3.522-2.504-.285-1.669.855-3.237 2.504-3.522 13.762-2.3001 22.109 9.406 23.025 10.77.936 1.404.57 3.298-.835 4.234-.488.346-1.079.509-1.669.509Z"/>*/}
                    {/*        <path fill="#50514F" d="M120.807 145.025c0 8.693 5.395 14.19 12.052 14.19 6.658 0 12.052-5.477 12.052-14.19 0-8.693-3.155-17.325-9.812-17.325s-14.292 8.632-14.292 17.325Z"/>*/}
                    {/*        <path fill="#fff" d="M130.193 138.327c2.012 0 3.644-1.631 3.644-3.644 0-2.012-1.632-3.644-3.644-3.644-2.013 0-3.645 1.632-3.645 3.644 0 2.013 1.632 3.644 3.645 3.644Zm11.938 9.288c.507-4.774-1.61-8.913-4.73-9.244-3.119-.332-6.059 3.269-6.567 8.043-.507 4.775 1.61 8.914 4.73 9.245 3.119.332 6.059-3.27 6.567-8.044Zm-23.705-29.87c-.571 0-1.161-.163-1.69-.509-1.405-.936-1.792-2.83-.855-4.234.366-.53 8.896-13.1312 23.025-10.77 1.669.285 2.789 1.853 2.504 3.522-.285 1.67-1.853 2.789-3.522 2.504-10.281-1.71-16.673 7.716-16.938 8.123-.57.876-1.527 1.364-2.524 1.364Z"/>*/}
                    {/*        <path fill="#50514F" d="M162.84 217.848c-48.981 0-85.4565 8.223-85.4565-53.503 0-9.182.8958-18.302 2.6466-27.117 9.8329-49.9386 45.2769-84.8121 86.1959-84.8121 40.31 0 75.611 34.2424 85.871 83.2441 1.954 9.284 2.952 18.933 2.952 28.685-.02 61.726-43.227 53.503-92.209 53.503Zm3.366-159.3247c-37.948 0-70.9277 32.8581-80.211 79.8857-1.6694 8.428-2.5244 17.162-2.5244 25.936 0 58.346 29.0764 47.368 74.6784 47.368 45.603 0 90.752 10.978 90.752-47.368 0-9.324-.957-18.546-2.81-27.423-9.649-46.1514-42.507-78.3987-79.885-78.3987Z"/>*/}
                    {/*        <path fill="#fff" d="M330.394 163.042H3.60567v62.153H330.394v-62.153Z"/>*/}
                    {/*        <path fill="#50514F" d="m330.394 228.269-250.3843-.02c-1.6897 0 3.0537-1.364 3.0537-3.054 0-1.689-4.7434-3.053-3.0537-3.053l247.3313.02v-56.066H6.65937v56.046H80.0097c1.6897 0 3.0537 1.364 3.0537 3.053 0 1.69-1.364 3.054-3.0537 3.054H3.60565c-1.68973 0-3.053724-1.364-3.053724-3.054v-62.153c0-1.69 1.363994-3.054 3.053724-3.054H330.394c1.69 0 3.054 1.364 3.054 3.054v62.153c0 1.69-1.364 3.074-3.054 3.074Z"/>*/}
                    {/*        <path fill="#B0E8A1" d="M302.3 160.884v.143c0 10.871-6.962 18.342-20.867 18.342-13.904 0-29.458-7.471-29.458-18.342 0-.428.02-.855.081-1.263 1.079-10.28 15.289-18.261 28.644-18.261 13.844 0 21.539 8.551 21.6 19.381Z"/>*/}
                    {/*        <path fill="#50514F" d="M281.433 182.423c-15.696 0-32.512-8.591-32.512-21.396 0-.591.041-1.161.122-1.71 1.303-12.419 17.427-20.847 31.657-20.847 14.658 0 24.572 8.998 24.654 22.414v.163c0 13.172-9.161 21.376-23.921 21.376Zm-.733-37.866c-12.54 0-24.755 7.39-25.61 15.533-.061.407-.061.672-.061.937 0 8.754 13.945 15.289 26.404 15.289 11.482 0 17.813-5.436 17.813-15.289l3.054-.143-3.054.02c-.061-9.934-7.328-16.347-18.546-16.347Z"/>*/}
                    {/*        <path fill="#B0E8A1" d="M30.1119 160.884v.143c0 10.871 6.9625 18.342 20.8671 18.342s29.4582-7.471 29.4582-18.342c0-.428-.0203-.855-.0814-1.263-1.079-10.28-15.289-18.261-28.6439-18.261-13.8435 0-21.5389 8.551-21.6 19.381Z"/>*/}
                    {/*        <path fill="#50514F" d="M50.979 182.423c-14.7596 0-23.9208-8.204-23.9208-21.396v-.163c.0814-13.396 9.9755-22.415 24.6537-22.415 14.2303 0 30.354 8.429 31.6773 20.99.061.427.1018.997.1018 1.567 0 12.805-16.8159 21.417-32.512 21.417Zm-17.8133-21.539v.122c0 9.854 6.3313 15.289 17.8133 15.289 12.4592 0 26.4045-6.535 26.4045-15.289 0-.264 0-.549-.0407-.814-.8754-8.266-13.0699-15.656-25.6105-15.656-11.2174.021-18.5056 6.434-18.5666 16.348Z"/>*/}
                    {/*        <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.73044" d="M155.619 24.2106c-.019.1167-.026.1616-.021.1344 0 .0068-.026.116-.079.3277-.054.0909-.035.0081.059-.2484.094-.2551.237-.5815.43-.9791.191-.3977.446-.8456.765-1.3437.318-.4995.586-.9493.804-1.3497.219-.4004.49-.8361.814-1.3071.325-.4709.656-.9941.994-1.5696.338-.5768.641-1.0266.91-1.3496.267-.323.48-.5606.637-.7126.156-.152.348-.3488.576-.5904.228-.2416.387-.4146.477-.5191.089-.1045.258-.3536.507-.7472.249-.3922 1.13-1.3138 2.642-2.7647.011.0177.022.0361.035.0551m2.017-2.2435h-.018.279c.264-.05701.358-.07944.281-.06723-.067.06922.015.0115.246-.17308.232-.18458.409-.38676.529-.60662.121-.21851.179-.42484.173-.61892-.006-.19273-.08-.30402-.221-.33388-.14-.02986-.235-.0475-.283-.05293-.048-.00407-.14.02718-.277.09369-.137.06786-.251.14386-.34.22801-.091.0855-.141.12962-.151.13233-.011.00407-.014.00672-.01.00808.005.00135-.001.0374-.018.10797-.017.06922-.028.14586-.035.23-.006.08279-.015.1893-.029.31959-.013.12893-.017.26329-.012.40309.091-.01493.126-.00334.104.03466-.022.03801.041-.0143.189-.15681.147-.1425.243-.24283.287-.30119M120.43 19.6625c-.014.0028-.006-.0007.022-.0102.029-.0081.031-.0047.008.0102-.022.015-.089.0435-.203.0855-.114.0435-.227.0809-.338.1121-.112.0312-.171.0515-.177.061-.007.0095-.009.0075-.005-.0061.005-.0135-.105.0346-.329.1445-.223.11-.473.2403-.749.3909-.277.1507-.461.2525-.55.3055-.091.0529-.168.1201-.232.2015-.064.0828-.1.1296-.108.1404-.01.0095-.018.0258-.027.0489-.008.023-.007.0041.002-.057.011-.061-.095.2565-.319.9527-.031.1072.199.0719.692-.1058.494-.1765.913-.3223 1.258-.4377.346-.1153.571-.2124.674-.2911.104-.0801.171-.1236.199-.1304.028-.0081.036-.0115.025-.0101-.012 0 .043-.0278.167-.0834.123-.0557.238-.1073.344-.1548.104-.0462.212-.0807.322-.1038.109-.0231.219-.0427.329-.059.112-.0149.156-.0197.133-.0143-.023.0068.037-.0041.181-.0326.145-.0298.24-.0651.285-.1058.046-.0421.237-.0794.574-.112.337-.0326.617-.0476.841-.0448.222.004.393-.0074.511-.0346.118-.0258.197-.0442.236-.055.041-.0109.098-.0264.171-.0468.075-.0203.113-.0305.114-.0305.003 0 0 .0014-.008.0041-.007.0041.019-.0048.079-.0265s.398-.0415 1.014-.0591c.615-.019 1.065-.0197 1.35-.002.285.0163.459.0345.521.0549.062.0204.21.0536.442.0998.23.0475.406.0685.527.0631.121-.0041.204-.0061.25-.0061.048 0 .108.0034.182.0102.072.0068.064.0048-.023-.0061-.087-.0095.029.0082.348.0529.321.0435.544.0712.67.0834.126.0136.24.0272.34.0408.099.0136.179.0258.238.0366.06.0122.111.0245.153.0367.041.0136.053.0156.037.0061-.017-.0095.152.0007.504.0305.355.0313.649.0862.884.1649.235.0788.409.1466.523.2036.114.0556.223.1174.328.1852.106.0679.212.1371.32.2077.105.0705.142.0876.11.0509-.032-.0366 0-.0128.095.0713.097.0828.152.135.165.1567.014.0204.045.0631.094.1283.047.0651.091.1262.13.1832.039.0584.058.0828.055.0733.114.243.161.3481.141.3155-.02-.0325-.021.0232-.005.167.017.1452.017.1798 0 .1038-.017-.0774-.016.0672.005.4336.02.3678.141.7533.364 1.1564.081-.0014.123-.0028.126-.0041.003-.0014.005.002.006.0102.002.0095.058-.0028.169-.0367.11-.0326.183-.0787.22-.1384.037-.0584.151-.1581.342-.2992.19-.1412.354-.2444.493-.3096.137-.0651.266-.1153.387-.1506.12-.0339.215-.0542.285-.061.069-.0068.105-.0102.107-.0102.003-.0013.047-.0149.133-.0407.085-.0244.261-.0503.527-.0774.265-.0272.515-.0522.751-.0753.235-.0217.384-.0414.446-.059.063-.0163.329-.0021.8.0427.471.0434.829.0984 1.073.1649.244.0651.421.1229.529.1731.109.0488.203.0855.281.1099.079.0231.214.0462.405.0693.192.0217.343.0427.454.0631.113.0203.189.025.228.0141.04-.0108.247.0638.621.224.375.1587.677.2918.906.3991.23.1072.397.1784.503.2137.107.0353.295.1221.564.2605.267.1385.472.262.615.3706.141.1099.239.1833.295.2199.057.038.118.0746.181.1099.063.0366.13.0753.202.116.072.0407.152.078.24.112.088.0325.413.1853.973.4581.561.2728 1.036.513 1.427.7207.393.2063.683.3834.872.5313.188.1479.392.2945.61.4397.219.1453.441.3053.668.4804.227.1751.43.37.609.5844.18.2144.435.5014.765.8611.331.3583.57.6318.715.8205.145.1886.268.3352.368.4397.102.1045.172.1737.21.2076.038.0353.1.0896.187.1629.089.0733.122.099.102.0773-.022-.0217.117.108.415.3889-.199-.0013-.5-.3027-.903-.9039-.402-.6026-.783-1.1252-1.143-1.5676-.358-.4425-.641-.7553-.849-.9385-.209-.1846-.333-.2871-.372-.3075-.041-.0217-.21-.1207-.509-.2972-.3-.1778-.57-.3521-.81-.5231-.242-.1696-.546-.4181-.912-.7452-.368-.327-.823-.6229-1.366-.8875-.542-.2647-1.009-.5633-1.401-.8958-.391-.3325-.955-.6549-1.694-.9671-.738-.3135-1.286-.5625-1.643-.7471-.355-.186-.831-.3522-1.427-.4988-.596-.1452-1.172-.2591-1.728-.3419-.558-.0842-1.22-.1914-1.985-.3217-.764-.1303-1.359-.2891-1.786-.4764-.424-.186-.894-.3258-1.408-.4194-.515-.095-1.069-.1656-1.664-.2117-.595-.0475-1.146-.148-1.651-.3014-.506-.1547-.925-.2524-1.256-.2931-.331-.0393-.767-.0584-1.307-.057-.539.0013-1.075-.0326-1.61-.1018-.535-.0678-1.083-.0516-1.645.0489-.563.1004-1.029.1445-1.397.1323-.369-.0136-.717-.0475-1.044-.1018-.327-.0543-.636-.099-.928-.1343-.293-.0353-.506-.0638-.639-.0855-.133-.0217-.264-.0359-.391-.0427-.128-.0068-.201-.0096-.218-.0082-.018.0027-.124.0027-.32 0-.195-.0041-.355-.0047-.478-.002-.124.0027-.234.0182-.33.0467-.095.0285-.116.0333-.063.0143.054-.0204-.12.0496-.523.2097.134.0964.336.1385.604.1263.27-.0122.451-.0218.542-.0286"/>*/}
                    {/*        <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.73044" d="M134.904 22.8161c-.088.1465-.127.2023-.118.167-.012.0054-.07-.0056-.175-.0327 0-.0054.004-.0237.01-.0549-.137.0597.144-.0251.843-.2545h-.232c-.285.076-.581.2192-.888.4295.011 0 .119.0014.322.0041.204.0028.328.0075.373.0143"/>*/}
                    {/*        <path fill="#50514F" d="M88.9559 214.79c-2.884 0-5.6833-.356-8.3977-1.069-2.7144-.712-4.9199-1.662-6.6164-2.85l3.3082-7.43c1.5947 1.051 3.4439 1.9 5.5476 2.544 2.1037.645 4.1734.967 6.2092.967 3.8681 0 5.8021-.967 5.8021-2.901 0-1.018-.5599-1.764-1.6796-2.239-1.0857-.509-2.8501-1.035-5.2931-1.578-2.6805-.577-4.9199-1.187-6.7182-1.832-1.7983-.679-3.3421-1.747-4.6314-3.206-1.2894-1.459-1.9341-3.427-1.9341-5.904 0-2.172.5938-4.123 1.7814-5.853 1.1875-1.765 2.9519-3.156 5.2931-4.174 2.3751-1.018 5.2761-1.527 8.7031-1.527 2.3412 0 4.6484.272 6.9218.815 2.2733.509 4.2751 1.272 6.0061 2.29l-3.105 7.482c-3.3931-1.833-6.6844-2.749-9.8738-2.749-2.0019 0-3.4609.306-4.377.916-.9161.577-1.3742 1.341-1.3742 2.291s.5429 1.662 1.6287 2.137c1.0858.475 2.8332.967 5.2422 1.476 2.7144.577 4.9538 1.205 6.7182 1.883 1.7983.645 3.3419 1.697 4.6319 3.156 1.323 1.425 1.984 3.376 1.984 5.853 0 2.137-.593 4.072-1.781 5.802-1.187 1.73-2.9687 3.122-5.3439 4.173-2.3751 1.018-5.2592 1.527-8.6522 1.527Zm54.3291-36.339v35.627h-10.078v-13.895h-13.741v13.895h-10.078v-35.627h10.078v13.385h13.741v-13.385h10.078Zm22.682 26.16h-5.497v9.467h-10.077v-35.627h16.286c3.224 0 6.023.543 8.398 1.629 2.375 1.051 4.208 2.578 5.497 4.58 1.289 1.968 1.934 4.292 1.934 6.973 0 2.579-.611 4.835-1.832 6.769-1.188 1.9-2.901 3.393-5.141 4.479l7.685 11.197h-10.789l-6.464-9.467Zm6.362-12.978c0-1.663-.526-2.952-1.578-3.868-1.052-.916-2.613-1.374-4.682-1.374h-5.599v10.433h5.599c2.069 0 3.63-.441 4.682-1.323 1.052-.916 1.578-2.206 1.578-3.868Zm32.178 23.157c-5.293 0-9.416-1.442-12.368-4.326-2.918-2.884-4.377-6.973-4.377-12.266v-19.747h10.077v19.442c0 5.7 2.257 8.55 6.769 8.55 4.479 0 6.719-2.85 6.719-8.55v-19.442h9.924v19.747c0 5.293-1.476 9.382-4.428 12.266-2.918 2.884-7.023 4.326-12.316 4.326Zm50.953-19.289c2.035.712 3.63 1.832 4.784 3.359 1.153 1.493 1.73 3.308 1.73 5.446 0 3.121-1.255 5.53-3.766 7.227-2.511 1.696-6.141 2.545-10.892 2.545h-19.238v-35.627h18.22c4.547 0 8.008.848 10.383 2.545 2.375 1.662 3.563 3.919 3.563 6.769 0 1.696-.424 3.223-1.273 4.58-.814 1.324-1.985 2.376-3.511 3.156Zm-17.407-9.772v6.871h6.922c3.393 0 5.09-1.154 5.09-3.461 0-2.273-1.697-3.41-5.09-3.41h-6.922Zm8.449 21.071c3.529 0 5.293-1.205 5.293-3.614s-1.764-3.613-5.293-3.613h-8.449v7.227h8.449Z"/>*/}
                    {/*    </svg>*/}
                    {/*</div>*/}
                </div>
            </div>
        </section>
    );
}


Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;