import React, { Component } from "react";

import storage from "../../storage";
import Former, { Input } from "../reusables/Former";

import { connect } from "react-redux";

import { renameBatchById } from "../../actions";

class RenameBatch extends Component {
  handleSubmit = values => {
    this.props.renameBatchById(values.newname, this.props.id);
    this.props.cancel();
  };
  render() {
    let session = new storage("batch");
    let Batch = session.getList().filter(item => item.id === this.props.id)[0];
    if (Batch === undefined) {
      return null;
    }
    const { Form, formProps } = Former("rename");
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="row-block">
          <label htmlFor="newname" className="item">
            New Name
          </label>
          <Input
            name="newname"
            className="item"
            value={Batch.name}
            {...formProps}
          />
          <Input type="submit" className="item" value="Rename" {...formProps} />
          <button onClick={this.props.cancel} className="item">
            Cancel
          </button>
        </Form>
      </div>
    );
  }
}

export default connect(
  null,
  {
    renameBatchById
  }
)(RenameBatch);
