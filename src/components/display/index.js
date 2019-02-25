import React, { Component } from "react";

import { connect } from "react-redux";

import Screen from "./Screen";
import Tables from "./Tables";
import Lectures from "./Lectures";
import Batches from "./Batches";
import Days from "./Days";
import Times from "./Times";
import Places from "./Places";
import Subjects from "./Subjects";
import Teachers from "./Teachers";

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
      case "lectures":
        return <Lectures />;
      case "batches":
        return <Batches />;
      case "days":
        return <Days />;
      case "times":
        return <Times />;
      case "places":
        return <Places />;
      case "subjects":
        return <Subjects />;
      case "teachers":
        return <Teachers />;
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
