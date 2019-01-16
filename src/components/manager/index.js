import React, { Component } from "react";

import Create from "./Create";
import Rename from "./Rename";

import { connect } from "react-redux";

class Manager extends Component {
  state = {
    showForm: false,
    renameId: null,
    showRenameForm: false
  };
  renderList() {
    let CardButtons = id => {
      let buttons = this.props.buttons == null ? [] : this.props.buttons;
      return buttons.map(btn => (
        <button
          key={id}
          onClick={() => {
            btn.onClick(id);
          }}
        >
          {btn.name}
        </button>
      ));
    };
    return this.props.list.map(item => {
      let selected =
        this.props.selected == null ? { id: "" } : this.props.selected;
      let addit_class = item.id === selected.id ? "selected-card" : "";
      return (
        <div key={item.id} className={`table-card card-box ${addit_class}`}>
          <div className="card-title">{item.name}</div>
          <div className="buttons-list blue">
            {CardButtons(item.id)}
            <button
              onClick={() => {
                this.props.delete(item.id);
              }}
            >
              {this.props.deleteText || "Delete"}
            </button>
            <button
              onClick={() => {
                this.setState({ renameId: item.id, showRenameForm: true });
              }}
            >
              {this.props.renameText || "Rename"}
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
            action={values => {
              this.props.create(values.name);
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
                {this.props.createButtonText || "Create"}
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
            action={values => {
              this.props.rename(this.state.renameId, values.newname);
            }}
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
        <h1>{this.props.mainHeading || "MANAGER HEADING"}</h1>
        <CreateDialogue />
        <RenameDialogue />
        <div className="list-container">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { selected: state.SelectedTable };
};

export default connect(mapStateToProps)(Manager);
