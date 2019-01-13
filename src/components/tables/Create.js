import React, { Component } from "react";

import Former, { Input } from "../reusables/Former";

import { connect } from "react-redux";

import { createTableByName } from "../../actions";

class CreateTable extends Component {
  onFormSubmit = values => {
    this.props.createTableByName(values["name"]);
    this.props.cancel();
  };
  render() {
    const { Form, formProps } = Former("create");
    return (
      <Form onSubmit={this.onFormSubmit} className="row-block">
        <label htmlFor="name" className="item">
          Table
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
    createTableByName
  }
)(CreateTable);
