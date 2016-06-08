import { app } from './reducers/app';
import { home } from './reducers/home';
// ... add more here
import { routeReducer } from 'react-router-redux';

const reducers = {
  app,
  home,

  // Redux Router
  routing: routeReducer
};

export default reducers;