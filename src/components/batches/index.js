import React, { Component } from "react";
import { connect } from "react-redux";

import Create from "./Create";
import Rename from "./Rename";

import { renameBatchById, deleteBatchById } from "../../actions";

class Batchs extends Component {
  state = {
    showForm: false,
    renameId: null,
    showRenameForm: false
  };
  renderList() {
    return this.props.list.map(item => {
      return (
        <div key={item.id} className={`Batch-card card-box`}>
          <div className="card-title">{item.name}</div>
          <div className="buttons-list blue">
            <button
              onClick={() => {
                this.props.deleteBatchById(item.id);
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
                Create A Batch
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
        <h1>Batchs</h1>
        <CreateDialogue />
        <RenameDialogue />
        <div className="list-container">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.BatchList,
    selected: state.SelectedBatch
  };
};

export default connect(
  mapStateToProps,
  {
    renameBatchById,
    deleteBatchById
  }
)(Batchs);
