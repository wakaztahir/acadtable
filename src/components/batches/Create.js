import React, { Component } from "react";

import Former, { Input } from "../reusables/Former";

import { connect } from "react-redux";

import { createBatchByName } from "../../actions";

class CreateBatch extends Component {
  onFormSubmit = values => {
    this.props.createBatchByName(values["name"]);
    this.props.history.push("/batches");
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
    createBatchByName
  }
)(CreateBatch);
