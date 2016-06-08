import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import * as thunk from 'redux-thunk';
import * as createLogger from 'redux-logger';


export function configureClient(storeRegistry, DevTools, initialState) {

  const historyMiddleware = syncHistory(browserHistory);
  const middleware = [thunk, createLogger(), historyMiddleware];

  const reducer = combineReducers(storeRegistry.getStore());

  const finalCreateStore = compose(
    applyMiddleware(...middleware),
    DevTools.instrument()
  )(createStore);

  const store = finalCreateStore(reducer, initialState);

  historyMiddleware.listenForReplays(store);

  // Reconfigure the store's reducer when the reducer registry is changed - we
  // depend on this for loading reducers via code splitting and for hot
  // reloading reducer modules.
  storeRegistry.setChangeListener((reducers) => {
    store.replaceReducer(combineReducers(reducers));
  });
    
  return store;
}

export function configureServer(storeRegistry, initialState) {
  const middleware = [thunk];

  const reducer = combineReducers(storeRegistry.getStore());

  const finalCreateStore = compose(
    applyMiddleware(...middleware)
  )(createStore);

  const store = finalCreateStore(reducer, initialState);

  // Reconfigure the store's reducer when the reducer registry is changed - we
  // depend on this for loading reducers via code splitting and for hot
  // reloading reducer modules.
  storeRegistry.setChangeListener((reducers) => {
    store.replaceReducer(combineReducers(reducers));
  });

  return store;
}