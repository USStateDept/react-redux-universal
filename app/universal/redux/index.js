import { app } from './reducers/example';
// ... add more here
import { routeReducer } from 'react-router-redux';

const reducers = {
  app,

  // Redux Router
  routing: routeReducer
};

export default reducers;