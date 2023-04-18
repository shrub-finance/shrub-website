import React from 'react';
import PaperGardensIntro from "../components/sections/PaperGardens-intro";
import What from "../components/sections/paper-gardens/What";
import Community from "../components/sections/paper-gardens/Community";
import FAQs from "../components/sections/paper-gardens/FAQs";
import Why from "../components/sections/paper-gardens/Why";
import ShrubExchange from "../components/sections/ShrubExchange";
import ShrubPaper from "../components/sections/ShrubPaper";
import PaperGardens from "../components/sections/PaperGardens";
import Tickets from "../components/sections/Tickets";
import Partnerships from "../components/sections/Grants";
import Team from "../components/sections/Team";
import Main from "../components/sections/Main";


const Home = () => {

    return (
    <>
        <Main className="illustration-section-01" />
        <ShrubExchange/>
        <ShrubPaper/>
        <PaperGardens/>
        <Tickets/>
        <Partnerships/>
        {/*<ShrubExchange/>*/}
        {/*<ShrubPaper/>*/}
        {/*<PaperGardens/>*/}
        {/*<Tickets/>*/}
        {/*<Partnerships/>*/}
        {/*<Grants/>*/}
        {/*<ShrubStory invertMobile imageFill className="illustration-section-02" />*/}
        <Team/>
        {/*<Team/>*/}
    </>
  );
}

export default Home;