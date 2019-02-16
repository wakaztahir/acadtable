import React, { Component } from "react";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { exampleCollection } from "./../../actions/";

class Welcome extends Component {
  render() {
    return (
      <div>
        <span>Welcome !</span>
        <p>You have't created any collections</p>
        <div>
          <button
            onClick={() => {
              console.log("Loading The Example");
              this.props.exampleCollection();
            }}
          >
            Load An Example
          </button>
        </div>
        <br />
        <Link to="/collections">Click Here To Create Collections</Link>
      </div>
    );
  }
}

export default connect(
  null,
  { exampleCollection }
)(Welcome);
