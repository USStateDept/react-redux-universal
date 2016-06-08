import express from 'express';
import http from 'http';
import path from 'path';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, browserHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Routes from '../universal/Routes';
import { configureServer } from '../universal/configureStore';
import reducers from '../universal/redux/index';
import StoreRegistry from '../universal/redux/ReducerRegistry';
import webpackConfig from '../../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import Html from './Html';


const app = express();



if(process.env.NODE_ENV != 'production'){
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}else{
  app.use('/static', express.static(__dirname + '/../../dist'));
}

app.get('/*', function (req, res) {

  const storeRegistry = new StoreRegistry(reducers);
  const routes = new Routes(storeRegistry);

  match({ routes: routes.configure(), location: req.url || '/' }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // Compile an initial state
      const initialState = {
        routing: { location: renderProps.location }
      };

      const store = configureServer(storeRegistry, initialState);

      const component = (
            <Provider store={store}>
                <div>
                <RouterContext {...renderProps} />
                </div>
            </Provider>
    	);

      // Render the initial html
      // - Store: Place initial state on the browser window object for the client to read on load
      // - component: The main component to render in the html root
      const html = (
        <Html component={component} store={store} />
    	);

      // server side rendering
      res.status(200).send('<!doctype html>\n' + renderToString(html));

    } else {
      res.status(404).send('Not found');
    }
  });
});

const server = app.listen(process.env.PORT || 3001, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('APP ===> 🌏  Universal App Available at http://localhost:%d/home', port);
});
