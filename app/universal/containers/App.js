/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import React, { Component, PropTypes } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// import footer/header/static comps
class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
            {this.props.children}
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;