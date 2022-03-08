import React from 'react';
import PaperGardensIntro from "../components/sections/PaperGardens-intro";
import What from "../components/sections/paper-gardens/What";
import Community from "../components/sections/paper-gardens/Community";
import FAQs from "../components/sections/paper-gardens/FAQs";
import Why from "../components/sections/paper-gardens/Why";


const Home = () => {

    return (
    <>
        <PaperGardensIntro className="illustration-section-01"/>
        <Why/>
        <What invertMobile imageFill className="illustration-section-02"/>
        <FAQs/>
        <Community/>
    </>
  );
}

export default Home;