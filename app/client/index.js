// required polyfill
import "babel-polyfill";

// React/Redux
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

// Redux Setup
import StoreRegistry from '../universal/redux/StoreRegistry';
import { configureClient } from '../universal/configureStore';
import reducers from '../universal/redux/';

// React Router
import Routes from '../universal/Routes';
import { match } from 'react-router';

// Tooling
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import { createDevTools } from 'redux-devtools';


const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-q"
               defaultPosition="bottom"
               defaultIsVisible={false} >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
);

const storeRegistry = new StoreRegistry(reducers);
const routes = new Routes(reducerRegistry);

match({ history: browserHistory, routes: routes.configure() } , (error, redirectLocation, renderProps) => {

  // state that comes from server
  const initialState = window.__INITIAL_STATE__;
  const store = configureClient(storeRegistry, DevTools, initialState);

  routes.injectStore(store);

  render(
    <Provider store={store}>
      <div>
        <Router {...renderProps} />
      </div>
    </Provider>,
    document.getElementById('root')
  );

  // Render dev tools
  render(
    <DevTools store={store} />,
    document.getElementById('dev-tools')
  );


  if (process.env.NODE_ENV != 'production' && module.hot) {

    // CORE REDUCERS
    module.hot.accept('../universal/redux/index', () => {
      storRegistry.updateStore(store, require('../universal/redux/indux').default);
    });

    // TODO ADDITIONAL REDUCERS
   
  }

});