import React, { Component } from "react";

import Welcome from "./Welcome";

import Display from "./display";

import { connect } from "react-redux";

class App extends Component {
  render() {
    if (this.props.user == null) {
      return <Welcome />;
    } else {
      return <Display />;
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.User
  };
};

export default connect(mapStateToProps)(App);
