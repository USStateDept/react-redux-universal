import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';


export class Auth extends React.Component {

  render() {
    return (
      <div>
        <h2>Auth Container</h2>
        
      </div>
    );
  }
}

Auth.propTypes = {
  changeRoute: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
  };
}

export default connect(null, mapDispatchToProps)(Auth);