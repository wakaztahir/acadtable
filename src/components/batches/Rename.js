import React, { Component } from "react";

import storage from "../../storage";
import Former, { Input } from "../reusables/Former";

import { connect } from "react-redux";

import { renameBatchById } from "../../actions";

class RenameBatch extends Component {
  handleSubmit = values => {
    this.props.renameBatchById(values.newname, this.props.location.id);
    this.props.history.push("/batches");
  };
  render() {
    if (this.props.location.id === undefined) {
      this.props.history.push("/batches");
    } else {
      let session = new storage("batch");
      let table = session
        .getList()
        .filter(item => item.id === this.props.location.id)[0];
      const { Form, formProps } = Former("rename");
      return (
        <div>
          {table.name}
          <Form onSubmit={this.handleSubmit}>
            <Input name="newname" {...formProps} />
            <Input type="submit" value="Rename" {...formProps} />
          </Form>
        </div>
      );
    }
    return null;
  }
}

export default connect(
  null,
  {
    renameBatchById
  }
)(RenameBatch);
