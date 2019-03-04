import React, { Component } from "react";

import { connect } from "react-redux";

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
    return this.content(<div className="modal-loader" />);
  }
  content(content = this.props.modal.content) {
    return <div>{content}</div>;
  }
  message() {}
  confirm() {}
  implement() {
    switch (this.props.modal.type) {
      case "waiting":
      default:
        return this.waiting();
      case "content":
        return this.content();
      case "message":
        return this.message();
      case "confirm":
        return this.confirm();
    }
  }
  render() {
    if (this.props.modal.display) {
      return (
        <div className="modal">
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

export default connect(mapStateToProps)(Modal);
