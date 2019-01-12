import React, { Component } from "react";

import { connect } from "react-redux";

import Welcome from "./Welcome";
import Select from "./Select";
import AddBatches from "./AddBatches";
import Screen from "./Screen";

class Display extends Component {
  welcomeMessage() {
    return <Welcome />;
  }
  nothingSelected() {
    return <Select />;
  }
  addBatches() {
    return <AddBatches />;
  }
  screen() {
    return <Screen />;
  }
  render() {
    if (this.props.list.length === 0) {
      return this.welcomeMessage();
    } else if (this.props.selected === null) {
      return this.nothingSelected();
    } else if (this.props.selected !== null) {
      if (this.props.selected.list.length === 0) {
        return this.addBatches();
      } else {
        return this.screen();
      }
    } else {
      return <div>We cannot figure out the display</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    list: state.TableList,
    selected: state.SelectedTable
  };
};

export default connect(mapStateToProps)(Display);
