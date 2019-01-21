import React, { Component } from "react";
import storage from "../../engine/storage";

import Area from "./areas";

class EditCollection extends Component {
  state = {
    collection: storage.getData(this.props.collectionID),
    id: this.props.collectionID,
    name: null,
    tables: [],
    days: [],
    places: [],
    times: [],
    blocks: [],
    batches: [],
    subjects: [],
    teachers: []
  };
  componentDidMount() {
    this.setState({ ...this.state.collection });
  }
  render() {
    return (
      <div>
        <div className="buttons-list">
          <button onClick={this.props.cancel}>Back</button>
        </div>
        <div>Name : {this.state.name}</div>
        <div>{<Area array={this.state.blocks} name="block" />}</div>
        <div>{<Area array={this.state.tables} name="table" />}</div>
        <div>{<Area array={this.state.days} name="day" />}</div>
        <div>{<Area array={this.state.times} name="time" />}</div>
        <div>{<Area array={this.state.places} name="place" />}</div>
        <div>{<Area array={this.state.batches} name="batch" />}</div>
        <div>{<Area array={this.state.subjects} name="subject" />}</div>
        <div>{<Area array={this.state.teachers} name="teacher" />}</div>
        <div className="buttons-list">
          <button>Save</button>
        </div>
      </div>
    );
  }
}

export default EditCollection;
