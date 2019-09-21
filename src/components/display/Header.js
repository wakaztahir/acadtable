import React, { Component } from "react";

import { connect } from "react-redux";

import { deselectCollection } from "../../actions";

import Menu from "../Menu";

class Header extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1> Acadtable </h1>
        <button
          onClick={() => {
            this.props.deselectCollection();
          }}
        >
          Back
        </button>
        <Menu />
      </div>
    );
  }
}

export default connect(
  null,
  { deselectCollection }
)(Header);
