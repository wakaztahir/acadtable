import React, { Component } from "react";

import storage from "../../storage";
import Former, { Input } from "../reusables/Former";

import { connect } from "react-redux";

import { renameLectureById } from "../../actions";

class RenameLecture extends Component {
  handleSubmit = values => {
    this.props.renameLectureById(values.newname, this.props.location.id);
    this.props.history.push("/Lectures");
  };
  render() {
    if (this.props.location.id === undefined) {
      this.props.history.push("/Lectures");
    } else {
      let session = new storage("Lecture");
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
    renameLectureById
  }
)(RenameLecture);
