import React, { Component } from "react";

import { connect } from "react-redux";

import { unshowModal } from "../../actions";

import ColorsPanel from "./ColorsPanel";

class ObjectEditor extends Component {
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
        {Object.keys(this.props.element[this.props.obj]).map(e => {
          if (e === "id") {
            return null;
          } else if (e === "color") {
            return (
              <div className="form-row" key="areacolor">
                <label htmlFor="">Color </label>
                <ColorsPanel
                  color={this.state.element[this.props.obj].color}
                  change={color => {
                    let element = { ...this.state.element };
                    element[this.props.obj].color = color;
                    this.setState({ element });
                  }}
                />
              </div>
            );
          } else {
            return (
              <div className="form-row" key={"area" + e}>
                <label htmlFor="" style={{ textTransform: "capitalize" }}>
                  {e} &nbsp;
                </label>
                <input
                  type="text"
                  value={this.state.element[this.props.obj][e]}
                  onChange={ex => {
                    let element = { ...this.state.element };
                    element[this.props.obj][e] = ex.target.value;
                    this.setState({ element });
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
            {this.props.delete !== null ? (
              <button
                onClick={() => {
                  this.props.delete();
                  this.props.unshowModal();
                }}
              >
                Delete
              </button>
            ) : null}
            &nbsp;
            <input
              type="submit"
              value={this.props.updateValue}
              className="black-btn"
            />
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
)(ObjectEditor);
