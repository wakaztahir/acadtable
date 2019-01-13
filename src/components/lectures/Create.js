import React, { Component } from "react";

import Former, { Input } from "../reusables/Former";

import { connect } from "react-redux";

import { createLectureByName } from "../../actions";

class CreateLecture extends Component {
  onFormSubmit = values => {
    this.props.createLectureByName(values["name"]);
    this.props.cancel();
  };
  render() {
    const { Form, formProps } = Former("create");
    return (
      <Form onSubmit={this.onFormSubmit} className="row-block">
        <label htmlFor="name" className="item">
          Lecture
        </label>
        <Input name="name" className="item" {...formProps} />
        <Input
          name="submit"
          className="item"
          type="submit"
          value="Submit"
          {...formProps}
        />
        <button onClick={this.props.cancel} className="item">
          Cancel
        </button>
      </Form>
    );
  }
}

export default connect(
  null,
  {
    createLectureByName
  }
)(CreateLecture);
