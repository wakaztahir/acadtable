import React, { Component } from "react";

import { connect } from "react-redux";

import { createDay, updateDay, swapDay, deleteDay } from "../../actions";

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
    this.props.user.save();
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
            this.setState({
              creator: {
                id: null,
                name: null,
                mode: "create"
              }
            });
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
            <div />
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
    return (
      <div>
        <h1>Days</h1>
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
        </div>
        <div style={{ margin: "1rem" }}>{this.creator()}</div>
        <div className="block-list">
          {this.props.days.map((day, index) => {
            return (
              <div key={day.id} className="block">
                <div className="block-txt">
                  <span>{day.name}</span>
                </div>
                <div className="block-btns">
                  {index === 0 ? null : (
                    <button
                      onClick={() => {
                        this.props.swapDay(
                          day.id,
                          this.props.days[index - 1].id
                        );
                      }}
                    >
                      {"<"}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      this.setState({
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
                  {index === this.props.days.length - 1 ? null : (
                    <button
                      onClick={() => {
                        this.props.swapDay(
                          day.id,
                          this.props.days[index + 1].id
                        );
                      }}
                    >
                      >
                    </button>
                  )}
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
    user: state.User,
    lectures: state.Lectures,
    days: state.Days
  };
};

export default connect(
  mapStateToProps,
  {
    createDay,
    updateDay,
    swapDay,
    deleteDay
  }
)(Days);
