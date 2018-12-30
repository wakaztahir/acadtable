import React from "react";

import { displayModal } from "../actions/CoreActions";

import { connect } from "react-redux";

class Modal extends React.Component {
  render() {
    console.log(this.props);
    let disabledClassName = "disabled";
    if (this.props.display === true) {
      disabledClassName = "";
    }
    return (
      <div className={`modal-container ${disabledClassName}`}>
        <div className="modal">
          <div className="modal-close">
            <span
              className="g-head"
              onClick={() => {
                this.props.displayModal(false, null);
              }}
            >
              X
            </span>
          </div>
          <div className="modal-content">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { displayModal }
)(Modal);
