import React, { Component } from "react";

import { connect } from "react-redux";

import { unshowMenu } from "../actions";

import "../resources/menu.css";

class Menu extends Component {
  render() {
    if (this.props.display) {
      return <div className="act-menu"></div>;
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    display: state.System.display,
    type: state.System.type
  };
};

export default connect(mapStateToProps)(Menu);
