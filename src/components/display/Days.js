import React, { Component } from "react";

import { connect } from "react-redux";

import storage from "../../actions/storage";

import { createDay, updateDay, deleteDay } from "../../actions";

class Days extends Component {
  state = {
    display: "main",
    creator: {
      id: null,
      name: null,
      mode: "create"
    }
  };
  componentWillUnmount() {
    storage.save();
  }
  creator() {
    return (
      <div>
        <form
          onSubmit={event => {
            event.preventDefault();
            if (this.state.creator.mode === "create") {
              this.props.createDay({ name: this.state.creator.name });
            } else {
              this.props.updateDay(this.state.creator.id, {
                name: this.state.creator.name
              });
            }
            this.setState({ display: "main" });
          }}
          className="form-table"
        >
          <div className="form-row">
            <label htmlFor="name">Day Name &nbsp;</label>
            <input
              type="text"
              id="name"
              onChange={x => {
                this.setState({
                  creator: { ...this.state.creator, name: x.target.value }
                });
              }}
              value={this.state.creator.name || ""}
            />
          </div>
          <div className="form-row">
            <div>
              <button
                onClick={() => {
                  this.setState({ display: "main" });
                }}
              >
                Cancel
              </button>
            </div>
            <input
              type="submit"
              value={this.state.creator.mode}
              style={{ textTransform: "capitalize" }}
            />
          </div>
        </form>
      </div>
    );
  }
  render() {
    if (this.state.display === "create") {
      return this.creator();
    }
    return (
      <div>
        <div style={{ margin: "1rem" }}>
          <button
            onClick={() => {
              let days = [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ];
              days.forEach(day => {
                this.props.createDay({ name: day });
              });
            }}
          >
            Add All Days
          </button>
          &nbsp;
          <button
            onClick={() => {
              this.setState({
                display: "create",
                creator: { id: null, name: null, mode: "create" }
              });
            }}
          >
            Create A Day
          </button>
        </div>
        <div className="block-list">
          {this.props.days.map(day => {
            return (
              <div key={day.id} className="block">
                <div className="block-txt">
                  <span>{day.name}</span>
                </div>
                <div className="block-btns">
                  <button
                    onClick={() => {
                      this.setState({
                        display: "create",
                        creator: {
                          ...this.state.creator,
                          ...day,
                          mode: "update"
                        }
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      this.props.deleteDay(day.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lectures: state.Lectures,
    days: state.Days
  };
};

export default connect(
  mapStateToProps,
  {
    createDay,
    updateDay,
    deleteDay
  }
)(Days);
