import React, { Component } from "react";

import "../resources/app.css";

import Welcome from "./Welcome";

import Display from "./display";

import Modal from "./Modal";

import { connect } from "react-redux";

import { deselectCollection } from "../actions";

class App extends Component {
  componentDidMount() {
    window.onerror = function(e) {
      this.props.deselectCollection();
    };
  }
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
  console.log(state);
  return {
    user: state.User
  };
};

export default connect(
  mapStateToProps,
  {
    deselectCollection
  }
)(App);
