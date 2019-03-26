import React, { Component } from "react";

import { connect } from "react-redux";

import { unshowModal } from "../../actions";

import ColorsPanel from "../others/ColorsPanel";

class AreaEditor extends Component {
  state = {
    element: {
      ...this.props.element
    }
  };
  render() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.props.update(this.state.element);
          this.props.unshowModal();
        }}
        className="form-table"
      >
        {Object.keys(this.props.element).map(e => {
          if (e === "id") {
            return null;
          } else if (e === "color") {
            return (
              <div className="form-row">
                <label htmlFor="">Color </label>
                <ColorsPanel
                  color={this.state.element.color}
                  change={color => {
                    this.setState({
                      element: { ...this.state.element, color }
                    });
                  }}
                />
              </div>
            );
          } else {
            return (
              <div className="form-row">
                <label htmlFor="" style={{ textTransform: "capitalize" }}>
                  {e} &nbsp;
                </label>
                <input
                  type="text"
                  value={this.props.element[e]}
                  onChange={e => {
                    let element = { ...this.state.element };
                    element[e] = e.target.value;
                    this.setState({ element: element });
                  }}
                />
              </div>
            );
          }
        })}

        <div className="form-row">
          <button
            onClick={() => {
              this.props.unshowModal();
            }}
          >
            Cancel
          </button>
          &nbsp;&nbsp;&nbsp;
          <div>
            <button
              onClick={() => {
                this.props.delete();
                this.props.unshowModal();
              }}
            >
              Delete
            </button>
            &nbsp;
            <input type="submit" value="Update" className="black-btn" />
          </div>
        </div>
      </form>
    );
  }
}

export default connect(
  null,
  {
    unshowModal
  }
)(AreaEditor);
