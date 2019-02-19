import React, { Component } from "react";

import { connect } from "react-redux";

class Block extends Component {
  pattern(string) {
    let pattern = [];
    while (string.indexOf("%") > -1) {
      let regExp = /%(.*?)%/;
      let words = string.match(regExp);
      string = string.replace(words[0], "");
      pattern.push(words[1]);
    }
    return pattern;
  }
  getTextFor(variable, block) {
    switch (variable) {
      case "batch":
        return this.props.batches.filter(b => b.id === block.batch)[0].name;
      case "day":
        return this.props.days.filter(b => b.id === block.day)[0].name;
      case "time":
        return this.props.times.filter(b => b.id === block.time)[0].name;
      case "place":
        return this.props.places.filter(b => b.id === block.place)[0].name;
      case "teacher":
        return this.props.teachers.filter(b => b.id === block.teacher)[0].name;
      case "subject":
        return this.props.subjects.filter(b => b.id === block.subject)[0].name;
      default:
        return "";
    }
  }
  render() {
    let block = this.props.block;
    let pattern = this.pattern(block.display);
    return (
      <div className="block">
        {pattern.map(p => {
          return <div key={"blp" + p}>{this.getTextFor(p, block)}</div>;
        })}
        <button
          onClick={() => {
            this.props.delete(block.id);
          }}
        >
          -
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selected: state.SelectedCollection,
    tables: state.TablesList,
    days: state.DaysList,
    places: state.PlacesList,
    times: state.TimesList,
    batches: state.BatchesList,
    subjects: state.SubjectsList,
    teachers: state.TeachersList
  };
};

export default connect(mapStateToProps)(Block);
