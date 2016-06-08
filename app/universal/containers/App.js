/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import React from 'react';
// import footer/header/static comps

function App(props) {
  return (
    <div>
      <h1>Welcome To The app YOOOOO </h1>
      {props.children}
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;