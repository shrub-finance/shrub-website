import React from 'react';
import PaperGardens from "../components/sections/PaperGardens";
import Tickets from "../components/sections/Tickets";
import Partnerships from "../components/sections/Partnerships";
import Team from "../components/sections/Team";
import Main from "../components/sections/Main";
import Grants from "../components/sections/Grants";


const Home = () => {

    return (
    <>
        <Main className="illustration-section-01" />
        <PaperGardens/>
        <Tickets/>
        <Grants/>
        <Partnerships/>
        <Team/>
    </>
  );
}

export default Home;