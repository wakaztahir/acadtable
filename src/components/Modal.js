import React, { Component } from "react";

import { connect } from "react-redux";

import { unshowModal } from "../actions";

import "../resources/modal.css";

/*
INITIAL MODAL STATE
modal: {
    display: false,
    type: null,
    content: null,
    buttons: null
  }
*/

class Modal extends Component {
  waiting() {
    return <div className="modal-loader" />;
  }
  content(
    content = this.props.modal.content,
    buttons = this.props.modal.buttons || []
  ) {
    return (
      <div>
        <div>{content}</div>
        <br />
        <div>
          {buttons.map(button => {
            return (
              <button
                key={button.value + "-btn"}
                onClick={button.click}
                className={button.type === "black" ? "black-btn" : ""}
              >
                {button.value}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
  confirm() {
    let content = this.props.modal.content;
    let buttons = [
      {
        value: "No",
        click:
          this.props.modal.actions != null
            ? () => {
                if (this.props.modal.actions[1] != null) {
                  this.props.modal.actions[1]();
                }
                this.props.unshowModal();
              }
            : this.props.unshowModal
      },
      {
        type: "black",
        value: "Yes",
        click:
          this.props.modal.actions != null
            ? () => {
                if (this.props.modal.actions[0] != null) {
                  this.props.modal.actions[0]();
                }
                this.props.unshowModal();
              }
            : () => {}
      }
    ];
    return this.content(content, buttons);
  }
  implement() {
    switch (this.props.modal.type) {
      case "waiting":
      default:
        return this.waiting();
      case "content":
      case "message":
        return this.content();
      case "confirm":
        return this.confirm();
    }
  }
  render() {
    if (this.props.modal.display) {
      return (
        <div
          className="modal"
          onClick={() => {
            if (this.props.modal.type === "message") {
              this.props.unshowModal();
            }
          }}
        >
          <div className="modal-inside">{this.implement()}</div>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    modal: state.System.modal
  };
};

export default connect(
  mapStateToProps,
  {
    unshowModal
  }
)(Modal);
