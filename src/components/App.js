import React, { Component } from "react";

import "../resources/app.css";

import Welcome from "./Welcome";

import Display from "./display";

import Modal from "./Modal";
import Menu from "./Menu";

import { connect } from "react-redux";

import { deselectCollection, unshowMenu } from "../actions";

class App extends Component {
  componentDidMount() {
    let x = this;
    window.onerror = function(e) {
      x.props.deselectCollection();
    };
    window.onscroll = function(e) {
      x.props.unshowMenu();
    };
  }
  render() {
    return (
      <div style={{ position: "relative" }}>
        <div
          style={{ position: "relative" }}
          onClick={() => {
            this.props.unshowMenu();
          }}
        >
          {this.props.user == null ? <Welcome /> : <Display />}
          <Modal />
        </div>
        <Menu />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.User
  };
};

export default connect(
  mapStateToProps,
  {
    deselectCollection,
    unshowMenu
  }
)(App);
