import React, { Component } from "react";

import storage from "../../storage";
import Former, { Input } from "../reusables/Former";

import { connect } from "react-redux";

import { renameTableById } from "../../actions";

class RenameTable extends Component {
  handleSubmit = values => {
    this.props.renameTableById(values.newname, this.props.location.id);
    this.props.history.push("/tables");
  };
  render() {
    if (this.props.location.id === undefined) {
      this.props.history.push("/tables");
    } else {
      let session = new storage("table");
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
    renameTableById
  }
)(RenameTable);
