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



const Main = () => {

    return (
        <>{!isMobile ?<div className="banner">❤️ Participate in Shrub's Genesis NFT series &nbsp;<ReactGA.OutboundLink eventLabel="Banner link to Paper gardens" to="https://gardens.shrub.finance" target="_blank" rel='noopener noreferrer'><a title="Go to Paper Gardens App">Paper Gardens</a>
        </ReactGA.OutboundLink></div>: <div className="banner"><ReactGA.OutboundLink eventLabel="Banner link to Paper gardens" to="https://gardens.shrub.finance" target="_blank" rel='noopener noreferrer'><a title="Go to Paper Gardens App">❤️ Participate in Shrub's Genesis NFT series</a>
        </ReactGA.OutboundLink></div>}

            <Hero className="illustration-section-01" />
            <ShrubExchange/>
            <ShrubPaper/>
            <PaperGardens/>
            <Partnerships/>
            <Grants/>
            {/*<ShrubStory invertMobile imageFill className="illustration-section-02" />*/}
            <Team/>
        </>
    );
}

export default Main;