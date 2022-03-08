import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import ShrubStory from '../components/sections/ShrubStory';
import Partnerships from "../components/sections/Partnerships";
import Team from "../components/sections/Team";
import Grants from "../components/sections/Grants";
import ShrubPaper from "../components/sections/ShrubPaper";
import PaperGardens from "../components/sections/PaperGardens";


const Main = () => {

    return (
        <>
            <Hero className="illustration-section-01" />
            <ShrubStory invertMobile imageFill className="illustration-section-02" />
            <ShrubPaper/>
            <PaperGardens/>
            <Team/>
            <Partnerships/>
            <Grants/>
        </>
    );
}

export default Main;