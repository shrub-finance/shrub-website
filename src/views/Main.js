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
        <>{!isMobile ?<div className="banner">🎉 Shrub Genesis NFT Series pre-sale on June 8!
            &nbsp;<ReactGA.OutboundLink eventLabel="Banner link to sale date announcement article" to="https://medium.com/@shrubfinance/paper-gardens-sale-date-announcement-265ceaa9e21e" target="_blank" rel='noopener noreferrer'>See details
        </ReactGA.OutboundLink></div>: <div className="banner"><ReactGA.OutboundLink eventLabel="Banner link to sale date announcement article" to="https://medium.com/@shrubfinance/paper-gardens-sale-date-announcement-265ceaa9e21e" target="_blank" rel='noopener noreferrer'><a title="Go to Paper Gardens App">🎉 Shrub Genesis NFT Series pre-sale on June 8!</a>
        </ReactGA.OutboundLink></div>}

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