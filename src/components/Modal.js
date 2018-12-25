import React from "react";

class Modal extends React.Component {
  render() {
    let disabledClassName = "";
    if (this.props.disabled === true) {
      disabledClassName = "disabled";
    }
    return (
      <div className={`modal-container ${disabledClassName}`}>
        <div className="modal">
          <div className="modal-content">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default Modal;
