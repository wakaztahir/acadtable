import React, { Component } from "react";

import Former, { Input } from "../reusables/Former";

class CreateTable extends Component {
  handleSubmit = values => {
    this.props.action(values);
    this.props.cancel();
  };
  render() {
    const { Form, formProps } = Former("create");
    return (
      <Form onSubmit={this.handleSubmit} className="row-block">
        <label htmlFor="name" className="item">
          {this.props.fieldName || "Name : "}
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

export default CreateTable;
