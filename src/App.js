import React, { useRef, useEffect } from 'react';
import { useLocation, Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';

// Layouts
import LayoutDefaultSlim from './layouts/LayoutDefaultSlim';
import LayoutDefault from './layouts/LayoutDefault';
// Views
import Main from './views/Main';
import Status from "./components/sections/Status";


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
          <AppRoute exact path="/" component={Main} layout={LayoutDefaultSlim} />
            {/*<AppRoute exact path="/rockies" component={Rockies} layout={LayoutDefaultSlim} />*/}
            <AppRoute exact path="/status" component={Status} layout={LayoutDefault} />
            <AppRoute exact path="/main" component={Main} layout={LayoutDefaultSlim} />
          <AppRoute exact path="/roadmap" component={Main} layout={LayoutDefaultSlim} />
          <AppRoute exact path="/airdrop" component={Main} layout={LayoutDefaultSlim} />
          <AppRoute exact path="/paper-gardens" component={Main} layout={LayoutDefaultSlim} />
          <AppRoute exact path="/about" component={Main} layout={LayoutDefaultSlim} />
            {/*<AppRoute exact path="/about" component={About} layout={LayoutDefault} />*/}
        </Switch>
      )} />
  );
}

export default App;