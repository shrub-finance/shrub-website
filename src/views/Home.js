import React from 'react';
import PaperGardens from "../components/sections/PaperGardens";
import What from "../components/sections/paper-gardens/What";
import Community from "../components/sections/paper-gardens/Community";
import FAQs from "../components/sections/paper-gardens/FAQs";
import Why from "../components/sections/paper-gardens/Why";


const Home = () => {

    return (
    <>
        <PaperGardens className="illustration-section-01"/>
        <Why/>
        <What invertMobile imageFill className="illustration-section-02"/>
        <FAQs/>
        <Community/>
    </>
  );
}

export default Home;