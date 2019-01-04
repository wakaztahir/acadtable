import React, { Component } from "react";

import { connect } from "react-redux";

import { Form, Input } from "./reusables/Form";

import {
  listDialogue,
  createDialogue,
  editDialogue,
  renameDialogue,
  deleteDialogue,
  createTable
} from "../actions";

class Menu extends Component {
  componentDidMount() {
    this.props.listDialogue();
  }
  Header = () => {
    return (
      <div>
        <button onClick={this.props.listDialogue}>List</button>
        <button onClick={this.props.createDialogue}>Create</button>
      </div>
    );
  };
  listDialogue = () => {
    return (
      <div>
        <div>
          Tables List
          {this.props.tableList.map(table => {
            console.log(table);
            return table.name;
          })}
        </div>
      </div>
    );
  };
  createDialogue = () => {
    const formSubmit = values => {
      this.props.createTable(values.name);
    };
    return (
      <div>
        <div>Create Dialogue</div>
        <Form onSubmit={formSubmit}>
          <Input name="name" type="text" />
          <Input type="submit" />
        </Form>
      </div>
    );
  };
  editDialogue = () => {
    const formSubmit = values => {
      console.log(values);
    };
    return (
      <div>
        <div>Edit Dialogue</div>
        <Form onSubmit={formSubmit}>
          <Input name="name" type="text" />
        </Form>
      </div>
    );
  };
  renameDialogue = () => {
    return (
      <div>
        <div>Rename Dialogue</div>
      </div>
    );
  };
  deleteDialogue = () => {
    return (
      <div>
        <div>Delete Dialogue</div>
      </div>
    );
  };
  render() {
    const Header = this.Header;
    let Dialogue;

    switch (this.props.display) {
      case "list":
      default:
        Dialogue = this.listDialogue;
        break;
      case "create":
        Dialogue = this.createDialogue;
        break;
      case "edit":
        Dialogue = this.editDialogue;
        break;
      case "rename":
        Dialogue = this.renameDialogue;
        break;
      case "delete":
        Dialogue = this.deleteDialogue;
        break;
    }
    return (
      <div>
        <Header />
        <Dialogue />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    display: state.MenuDisplay.display,
    tableList: state.MenuDisplay.tableList
  };
};

export default connect(
  mapStateToProps,
  {
    listDialogue,
    createDialogue,
    editDialogue,
    renameDialogue,
    deleteDialogue,
    createTable
  }
)(Menu);
