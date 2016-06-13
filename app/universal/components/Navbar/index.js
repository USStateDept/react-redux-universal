import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Navbar extends Component {
  render() {

    return (
    <div>
    <div className="navbar navbar-default">
      <div className="container">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span>
        </button>
         <Link to="home" className="">welcome</Link>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav pull-right">
        <li>
            <Link to="auth">Login/Register(USG Only)</Link>
            <Link to="dashboard">Dashboard)</Link>
        </li>
       </ul>
      </div>
      </div>
    </div>

    
    </div>
  );
  }
}

export default Navbar;