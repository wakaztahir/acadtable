import React, { Component } from "react";

import { connect } from "react-redux";

import Screen from "./Screen";
import Tables from "./Tables";

// import Modal from "../Modal";
// import FormEditor from "../collections/areas/FormEditor";

// import jsPDF from "jspdf";
// import domtoimage from "dom-to-image";

import {
  selectCollection,
  deselectCollection,
  createLecture
} from "../../actions";

class Display extends Component {
  state = {
    display: "screen"
  };
  actor() {
    switch (this.state.display) {
      case "screen":
        return <Screen />;
      case "tables":
        return <Tables />;
      default:
        return null;
    }
  }
  render() {
    let objector = {
      screen: null,
      tables: this.props.tables,
      lectures: this.props.lectures,
      batches: this.props.batches,
      days: this.props.days,
      times: this.props.times,
      places: this.props.places,
      subjects: this.props.subjects,
      teachers: this.props.teachers
    };

    return (
      <div className="wrapper">
        <h1>Acadtable</h1>
        <button
          onClick={() => {
            this.props.deselectCollection();
          }}
        >
          Back
        </button>
        <div className="full-wrapper flex-center">
          <div>
            {Object.keys(objector).map(btn => {
              return (
                <button
                  onClick={() => this.setState({ display: btn })}
                  className={this.state.display === btn ? "selected" : null}
                  style={{ textTransform: "capitalize" }}
                  key={btn + "-menuBtn"}
                >
                  {btn}
                </button>
              );
            })}
          </div>
        </div>
        <div ref="screen" className="full-wrapper flex-center">
          {this.actor()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.User,
    tables: state.Tables,
    days: state.Days,
    places: state.Places,
    times: state.Times,
    lectures: state.Lectures,
    batches: state.Batches,
    subjects: state.Subjects,
    teachers: state.Teachers
  };
};

export default connect(
  mapStateToProps,
  {
    selectCollection,
    deselectCollection,
    createLecture
  }
)(Display);
