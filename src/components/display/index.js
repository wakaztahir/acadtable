import React, { Component } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Welcome from "./Welcome";

class Display extends Component {
  welcomeMessage() {
    return <Welcome />;
  }
  nothingSelected() {
    return (
      <div>
        <span>You have't selected a table</span>
        <br />
        <Link to="/tables">Click Here</Link>
      </div>
    );
  }
  screen() {
    return <div>This is the screen</div>;
  }
  render() {
    if (this.props.list.length === 0) {
      return this.welcomeMessage();
    } else if (this.props.selected === null) {
      return this.nothingSelected();
    }

    return this.screen();
  }
}

const mapStateToProps = state => {
  return {
    list: state.TablesList,
    selected: state.SelectedTable
  };
};

export default connect(mapStateToProps)(Display);
