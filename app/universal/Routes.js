import * as React from 'react';
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

  configure() {
    return (
      <Route path="/" component={App}>
        <IndexRoute getComponent={this.getHomeView.bind(this)} />
        <Route path="/___other" getComponent={this.____getOtherView.bind(this)} />
        
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

  getHomeView(location, cb) {
    if (process.browser) {
      System.import('./containers/Home')
        .then(container => this.changeView(location, cb, container))
        .catch(err => console.log('Lazy Loading Error: Home-- ', err));
    } else {
      require.ensure(['./containers/Home'], require => {
        const container = require('./containers/Home').default;
        this.changeView(location, cb, container);
      });
    }
  }

}




 