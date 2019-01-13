import React, { Component } from "react";
import { connect } from "react-redux";

import Create from "./Create";
import Rename from "./Rename";

import { renameLectureById, deleteLectureById } from "../../actions";

class Lectures extends Component {
  state = {
    showForm: false,
    renameId: null,
    showRenameForm: false
  };
  renderList() {
    return this.props.list.map(item => {
      return (
        <div key={item.id} className={`lecture-card card-box`}>
          <div className="card-title">{item.name}</div>
          <div className="buttons-list blue">
            <button
              onClick={() => {
                this.props.deleteLectureById(item.id);
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
                Create A Lecture
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
        <h1>Lectures</h1>
        <CreateDialogue />
        <RenameDialogue />
        <div className="list-container">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.LectureList,
    selected: state.SelectedLecture
  };
};

export default connect(
  mapStateToProps,
  {
    renameLectureById,
    deleteLectureById
  }
)(Lectures);
