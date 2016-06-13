import app from './reducers/app';
import home from './reducers/home';
import { routerReducer } from 'react-router-redux';

const reducers = {
  // initial reducers
  app: app,
  home: home,

  // Redux Router
  routing: routerReducer
};

export default reducers;