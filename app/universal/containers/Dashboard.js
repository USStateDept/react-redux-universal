import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';


export class Dashboard extends React.Component {

  render() {
    return (
      <div>
        <h2>Dashboard Container</h2>
        
      </div>
    );
  }
}

Dashboard.propTypes = {
  changeRoute: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
  };
}

export default connect(null, mapDispatchToProps)(Dashboard);