import React from 'react';
import { IndexRoute, Route } from 'react-router';

// include containers for routes
import App from './containers/App';
import Home from './containers/Home';

// route handlers
import { endLoading } from './redux/reducers/app';


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

  // <Route path="/___other" getComponent={this.____getOtherView.bind(this)} />/
  configure() {
    return (
      <Route path="/" component={App}>
        <IndexRoute getComponent={this.getView.bind(this,'Home')} />
        
        
      </Route>
    );
  }

  // Global Change View Function
  changeView(location, cb, component, reducer) {
    if (reducer) {
      storeRegistry.register(reducer);
    }

    if (!this.store) {
      cb(null, component);
    } else if (this.store.getState().routing.location.pathname === location.pathname) {
      cb(null, component);
      this.store.dispatch(endLoading);
    }
  }

  // Global Change View Function
  getView(view, location, cb) {
    require.ensure([], require => {
      const container = require(`./containers/${view}`).default;
      this.changeView(location, cb, container);
    });
  }


}