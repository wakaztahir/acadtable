import React, { Component } from "react";

import Former, { Input } from "../reusables/Former";

import { connect } from "react-redux";

import { createLectureByName } from "../../actions";

class CreateLecture extends Component {
  onFormSubmit = values => {
    this.props.createLectureByName(values["name"]);
    this.props.history.push("/lectures");
  };
  render() {
    const { Form, formProps } = Former("create");
    return (
      <Form onSubmit={this.onFormSubmit}>
        <Input name="name" {...formProps} />
        <Input name="submit" type="submit" value="Submit" {...formProps} />
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
