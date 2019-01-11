import React, { Component } from "react";

import Former, { Input } from "../reusables/Former";

import { connect } from "react-redux";

import { createTableByName } from "../../actions";

class CreateTable extends Component {
  onFormSubmit = values => {
    this.props.createTableByName(values["name"]);
    this.props.history.push("/tables");
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
    createTableByName
  }
)(CreateTable);
