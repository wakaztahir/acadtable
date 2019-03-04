import React, { Component } from "react";

import { connect } from "react-redux";

/*
INITIAL MODAL STATE
modal: {
    display: false,
    type: null,
    message: null,
    buttons: null
  }
*/

class Modal extends Component {
  render() {
    if (this.props.modal.display) {
      return (
        <div className="modal">
          <div className="modal-inside">Modal</div>
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
