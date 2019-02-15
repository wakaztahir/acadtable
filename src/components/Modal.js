import React, { Component } from "react";

class Modal extends Component {
  state = {
    modalType: this.props.type == null ? "message" : this.props.type
  };
  contentModal(content) {
    return (
      <div className="modal" display={this.state.display ? "block" : "none"}>
        <div className="modal-inside">{content}</div>
      </div>
    );
  }
  messageModal(message = "", okFunction = () => {}) {
    return this.contentModal(
      <div>
        <div className="modal-message">{message}</div>
        <div className="modal-buttons">
          <button
            onClick={() => {
              okFunction();
            }}
          >
            Ok
          </button>
        </div>
      </div>
    );
  }
  confirmModal(
    message = "Are you sure ?",
    yesFunction = () => {},
    cancelFunction = () => {}
  ) {
    return this.contentModal(
      <div>
        <div className="modal-message">{message}</div>
        <div className="modal-buttons">
          <button
            onClick={() => {
              yesFunction();
            }}
          >
            Yes
          </button>
          <button
            onClick={() => {
              cancelFunction();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
  render() {
    if (this.props.display) {
      switch (this.state.modalType) {
        case "message":
        default:
          return this.messageModal(this.props.message);
        case "confirm":
          return this.confirmModal(
            this.props.message,
            this.props.yes,
            this.props.cancel
          );
        case "content":
          return this.contentModal(this.props.children);
      }
    } else {
      return null;
    }
  }
}

export default Modal;
