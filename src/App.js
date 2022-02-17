import React, { useRef, useEffect } from 'react';
import { useLocation, Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import PaperGardens from "./components/sections/PaperGardens"
import ReactGA from 'react-ga';

// Layouts
import LayoutDefault from './layouts/LayoutDefault';
import LayoutDefault1 from './layouts/LayoutDefault1';
// Views 
import Home from './views/Home';
import Main from './views/Main';
import Chapters from "./components/sections/Chapters";
import AirDrop from "./components/sections/AirDrop";


// Initialize Google Analytics
const REACT_APP_GA_CODE = process.env.REACT_APP_GA_CODE
if (typeof REACT_APP_GA_CODE === 'string') {
    ReactGA.initialize(REACT_APP_GA_CODE, {
        gaOptions: {
            storage: 'none',
            storeGac: false,
        },
    })
    ReactGA.set({
        anonymizeIp: true
    })
} else {
    ReactGA.initialize('test', { testMode: true, debug: true })
}
const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {

  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
          <AppRoute exact path="/main" component={Main} layout={LayoutDefault} />
          <AppRoute exact path="/airdrop" component={AirDrop} layout={LayoutDefault} />
          <AppRoute exact path="/paper-gardens" component={Chapters} layout={LayoutDefault} />
        </Switch>
      )} />
    
  );
}

export default App;