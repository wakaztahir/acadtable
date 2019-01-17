import React, { Component } from "react";

import List from "./List";
import Create from "./Create";
import Edit from "./Edit";

import { connect } from "react-redux";

import { createTableByName, renameTableById } from "../../actions";

class Tables extends Component {
  state = {
    showCreateForm: false,
    editTable: null,
    showEditForm: false
  };
  render() {
    const CreateDialogue = () => {
      if (this.state.showCreateForm) {
        return (
          <Create
            cancel={() => {
              this.setState({ showCreateForm: false });
            }}
            action={values => {
              this.props.create(values.name);
              this.setState({ showCreateForm: false });
            }}
          />
        );
      } else {
        return (
          <ul className="buttons-list">
            <li>
              <button
                onClick={() => {
                  this.setState({ showCreateForm: true });
                }}
              >
                Create A Table
              </button>
            </li>
          </ul>
        );
      }
    };

    const EditDialogue = () => {
      if (this.state.editTable != null && this.state.showEditForm) {
        return (
          <Edit
            name={this.state.editTable.name}
            action={values => {
              this.props.rename(this.state.editTable.id, values.newname);
              this.setState({
                showEditForm: false,
                editTable: null
              });
            }}
            cancel={() => {
              this.setState({
                showEditForm: false,
                editTable: null
              });
            }}
          />
        );
      } else {
        return null;
      }
    };

    const RenderedList = () => {
      return (
        <div className="list-contaienr">
          <List
            edit={item => {
              this.setState({
                showEditForm: true,
                editTable: item
              });
            }}
          />
        </div>
      );
    };
    return (
      <div>
        <h1>Tables</h1>
        <CreateDialogue />
        <EditDialogue />
        <RenderedList />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.TablesList,
    selected: state.SelectedTable
  };
};

export default connect(
  mapStateToProps,
  {
    create: createTableByName,
    rename: renameTableById
  }
)(Tables);
