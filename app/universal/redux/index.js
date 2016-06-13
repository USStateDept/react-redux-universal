import app from './reducers/app';
import home from './reducers/home';
import dashboard from './reducers/dashboard';
import { routerReducer } from 'react-router-redux';

const reducers = {
  app: app,
  home: home,
  dashboard: dashboard,

  // Redux Router
  routing: routerReducer
};

export default reducers;