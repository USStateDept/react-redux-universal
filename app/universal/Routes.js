import React from 'react';
import { IndexRoute, Route } from 'react-router';

// include containers for routes
import App from './containers/App';

// Require ensure shim
if(typeof require.ensure !== "function") {
  require.ensure = function(d, c) { c(require); };
} 
if(typeof require.include !== "function") {
  require.include = function() {};
}

export default class routes {

  constructor(storeRegistry) {
    this.store = null;
    this.storeRegistry = storeRegistry;
  }

  injectStore(store) {
    this.store = store;
  }

  configure() {
    return (
      <Route path="/" component={App}>
        <IndexRoute getComponent={this.getHomeView.bind(this)} />

        <Route path="home" getComponent={this.getHomeView.bind(this)} />
        <Route path="auth" getComponent={this.getAuthView.bind(this)} />
        <Route path="dashboard" getComponent={this.getDashboardView.bind(this)} />
        
      </Route>
    );
  }

  // Global Change View Function
  changeView(location, cb, component, reducer) {
    // load reducers seperatly
    if (reducer) {
      this.storeRegistry.register(reducer);
    }
    // load in the component
    cb(null, component);
  }

  // getting views must be done with static functions as webpack does static analysis
  getHomeView(nextState, cb) {
    require.ensure([], require => {
      const container = require('./containers/Home').default;
      this.changeView(nextState.location, cb, container);
    });
  }

  getAuthView(nextState, cb) {
    require.ensure([], require => {
      const container = require('./containers/Auth').default;
      this.changeView(nextState.location, cb, container);
    });
  }

  getDashboardView(nextState, cb) {
    require.ensure([], require => {
      const container = require('./containers/Dashboard').default;
      const reducer = { ['dashboard']: require('./redux/reducers/dashboard').default };
      this.changeView(nextState.location, cb, container, reducer); 
    });
  }


}