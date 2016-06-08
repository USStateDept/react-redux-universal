import app from './reducers/app';
import home from './reducers/home';
// ... add more here
import { routerReducer } from 'react-router-redux';

const reducers = {
  app: app,
  home: home,

  // Redux Router
  routing: routerReducer
};

export default reducers;