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

import {
  selectCollection,
  deselectCollection,
  createLecture
} from "../../actions";

class Display extends Component {
  state = {
    display: "screen",
    params: null
  };
  changeDisplay = (display, params = null) => {
    this.setState({ display, params });
  };
  actor() {
    switch (this.state.display) {
      case "screen":
        return <Screen params={this.state.params} actor={this.changeDisplay} />;
      case "tables":
        return <Tables params={this.state.params} actor={this.changeDisplay} />;
      case "lectures":
        return (
          <Lectures params={this.state.params} actor={this.changeDisplay} />
        );
      case "batches":
        return (
          <Batches params={this.state.params} actor={this.changeDisplay} />
        );
      case "days":
        return <Days params={this.state.params} actor={this.changeDisplay} />;
      case "times":
        return <Times params={this.state.params} actor={this.changeDisplay} />;
      case "places":
        return <Places params={this.state.params} actor={this.changeDisplay} />;
      case "subjects":
        return (
          <Subjects params={this.state.params} actor={this.changeDisplay} />
        );
      case "teachers":
        return (
          <Teachers params={this.state.params} actor={this.changeDisplay} />
        );
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
        {this.actor()}
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
