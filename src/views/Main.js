import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import ShrubStory from '../components/sections/ShrubStory';
import Partnerships from "../components/sections/Partnerships";
import Team from "../components/sections/Team";
import Grants from "../components/sections/Grants";
import ShrubPaper from "../components/sections/ShrubPaper";
import PaperGardens from "../components/sections/PaperGardens";
import ReactGA from "react-ga";
import {isMobile} from "react-device-detect";


const Main = () => {

    return (
        <>{!isMobile ?<div className="banner">Shrub's Genesis NFT series is here!&nbsp;&nbsp; <ReactGA.OutboundLink eventLabel="Banner link to Paper gardens" to="https://gardens.shrub.finance" target="_blank" rel='noopener noreferrer'><a title="Go to Paper Gardens App">Checkout Paper Gardens</a>
        </ReactGA.OutboundLink></div>: <div className="banner"><ReactGA.OutboundLink eventLabel="Banner link to Paper gardens" to="https://gardens.shrub.finance" target="_blank" rel='noopener noreferrer'><a title="Go to Paper Gardens App">Checkout Shrub's Genesis NFT series Paper Gardens</a>
        </ReactGA.OutboundLink></div>}

            <Hero className="illustration-section-01" />
            <ShrubStory invertMobile imageFill className="illustration-section-02" />
            <ShrubExchange/>
            <ShrubPaper/>
            <PaperGardens/>
            <Team/>    
            <Partnerships/>
            <Grants/>
        </>
    );
}

export default Main;