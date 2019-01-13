import React, { Component } from "react";

import Former, { Input } from "../reusables/Former";

import { connect } from "react-redux";

import { createBatchByName } from "../../actions";

class CreateBatch extends Component {
  onFormSubmit = values => {
    this.props.createBatchByName(values["name"]);
    this.props.cancel();
  };
  render() {
    const { Form, formProps } = Former("create");
    return (
      <Form onSubmit={this.onFormSubmit} className="row-block">
        <label htmlFor="name" className="item">
          Batch
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
    createBatchByName
  }
)(CreateBatch);
