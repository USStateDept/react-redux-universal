import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';


export class Home extends React.Component {

  render() {
    return (
      <div>
        <h2>Home Page</h2>
        
      </div>
    );
  }
}

Home.propTypes = {
  changeRoute: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
  };
}

export default connect(null, mapDispatchToProps)(Home);