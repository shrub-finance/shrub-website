import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import Partnerships from "../components/sections/Partnerships";
import Team from "../components/sections/Team";
import Grants from "../components/sections/Grants";
import ShrubPaper from "../components/sections/ShrubPaper";
import PaperGardens from "../components/sections/PaperGardens";
import ReactGA from "react-ga";
import {isMobile} from "react-device-detect";
import ShrubExchange from "../components/sections/ShrubExchange";
import Tickets from "../components/sections/Tickets";



const Main = () => {

    return (
        <>
         {/*{!isMobile ?<ReactGA.OutboundLink eventLabel="Banner link to paper gardens" to="https://gardens.shrub.finance/mint" target="_blank" rel='noopener noreferrer'><div className="banner">🎉 Shrub's Genesis NFT sale is live! &nbsp; <span style={{textDecoration: "underline"}}>Mint Now</span></div>*/}
         {/*</ReactGA.OutboundLink>: <ReactGA.OutboundLink eventLabel="Banner link to paper gardens" to="https://gardens.shrub.finance/mint" target="_blank" rel='noopener noreferrer'><div className="banner">🎉 Shrub Genesis NFT sale is live!</div>*/}
         {/*</ReactGA.OutboundLink>}*/}

            <Hero className="illustration-section-01" />
            <ShrubExchange/>
            <ShrubPaper/>
            <PaperGardens/>
            <Tickets/>
            <Partnerships/>
            <Grants/>
            {/*<ShrubStory invertMobile imageFill className="illustration-section-02" />*/}
            <Team/>
        </>
    );
}

export default Main;