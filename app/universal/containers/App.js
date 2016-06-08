/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import React, { Component, PropTypes } from 'react';

// import footer/header/static comps
class App extends Component {
  render() {
    return (
      <div>
        {<h1>Welcome To The app </h1>}
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;