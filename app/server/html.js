/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
import  React    from 'react';
import { 
  renderToString 
}                from 'react-dom/server';

const Helmet = require('react-helmet');

export default class Html extends React.Component {

  render() {
    const { component, store} = this.props;
    let content = component ? renderToString(component) : '';
    let head = Helmet.rewind();

    return (
      <html lang="en-us">
        <head>
          <title>Redux shopping cart examples</title>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" type="text/css" href="/static/app.css" />
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{__html: content}}/>
          <div id="dev-tools"></div>
          <script dangerouslySetInnerHTML={{__html:  `window.__INITIAL_STATE__=${JSON.stringify(store.getState())};`}} charSet="UTF-8"/>
          <script src="/static/bundle.js"></script>
        </body>
      </html>
    );
  }
}

Html.PropTypes = {
  component: React.PropTypes.any,
  store: React.PropTypes.any
};