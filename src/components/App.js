import React, { Component } from "react";

import Welcome from "./Welcome";

import Display from "./display";

import Modal from "./Modal";

import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <div style={{ position: "relative" }}>
        {this.props.user == null ? <Welcome /> : <Display />}
        <Modal />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.User
  };
};

export default connect(mapStateToProps)(App);
