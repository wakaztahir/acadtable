import React, { Component } from "react";
import { connect } from "react-redux";

import Create from "./Create";
import Rename from "./Rename";

import {
  selectTableById,
  renameTableById,
  deleteTableById
} from "../../actions";

class Tables extends Component {
  state = {
    showForm: false,
    renameId: null,
    showRenameForm: false
  };
  renderList() {
    return this.props.list.map(item => {
      let additional = "";
      let SelectBtn = () => {
        return null;
      };
      if (this.props.selected !== null && this.props.selected.id === item.id) {
        additional = "selected-table";
      } else {
        SelectBtn = () => {
          return (
            <button onClick={() => this.props.selectTableById(item.id)}>
              Select
            </button>
          );
        };
      }
      return (
        <div key={item.id} className={`table-card card-box ${additional}`}>
          <div className="card-title">{item.name}</div>
          <div className="buttons-list blue">
            <SelectBtn />
            <button
              onClick={() => {
                this.props.deleteTableById(item.id);
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                this.setState({ renameId: item.id, showRenameForm: true });
              }}
            >
              Rename
            </button>
          </div>
        </div>
      );
    });
  }
  render() {
    const CreateDialogue = () => {
      if (this.state.showForm) {
        return (
          <Create
            cancel={() => {
              this.setState({ showForm: false });
            }}
          />
        );
      } else {
        return (
          <ul className="buttons-list">
            <li>
              <button
                onClick={() => {
                  this.setState({ showForm: true });
                }}
              >
                Create A Table
              </button>
            </li>
          </ul>
        );
      }
    };

    const RenameDialogue = () => {
      if (this.state.renameId != null && this.state.showRenameForm) {
        return (
          <Rename
            id={this.state.renameId}
            cancel={() => {
              this.setState({ showRenameForm: false, renameId: null });
            }}
          />
        );
      } else {
        return null;
      }
    };
    return (
      <div>
        <h1>Tables</h1>
        <CreateDialogue />
        <RenameDialogue />
        <div className="list-container">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.TableList,
    selected: state.SelectedTable
  };
};

export default connect(
  mapStateToProps,
  {
    selectTableById,
    renameTableById,
    deleteTableById
  }
)(Tables);
