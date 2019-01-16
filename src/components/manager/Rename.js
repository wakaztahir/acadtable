import React, { Component } from "react";

import storage from "../../storage";
import Former, { Input } from "../reusables/Former";

class RenameTable extends Component {
  handleSubmit = values => {
    this.props.action(values);
    this.props.cancel();
  };
  render() {
    let session = new storage("table");
    let table = session.getList().filter(item => item.id === this.props.id)[0];
    if (table === undefined) {
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
            value={table.name}
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

export default RenameTable;
