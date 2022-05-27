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
        <>{!isMobile ?<div className="banner">🎉 Paper Gardens NFT Sale Dates Announced!
            &nbsp;<ReactGA.OutboundLink eventLabel="Banner link to Paper gardens" to="https://medium.com/@shrubfinance/paper-gardens-sale-date-announcement-265ceaa9e21e" target="_blank" rel='noopener noreferrer'><a title="Go to Paper Gardens App">Learn More</a>
        </ReactGA.OutboundLink></div>: <div className="banner"><ReactGA.OutboundLink eventLabel="Banner link to Paper gardens" to="https://medium.com/@shrubfinance/paper-gardens-sale-date-announcement-265ceaa9e21e" target="_blank" rel='noopener noreferrer'><a title="Go to Paper Gardens App">🎉 Paper Gardens NFT Sale Dates Announced!</a>
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