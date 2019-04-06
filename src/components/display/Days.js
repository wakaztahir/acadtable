import React, { Component } from "react";

import { connect } from "react-redux";

import {
  createDay,
  updateDay,
  swapDay,
  deleteDay,
  showModal
} from "../../actions";

import { DAY_COLOR, dayValidator } from "../../actions/helpers";

import ColorsPanel from "../others/ColorsPanel";

const DefaultCreator = {
  id: null,
  name: null,
  color: DAY_COLOR,
  mode: "create"
};

class Days extends Component {
  state = {
    display: "main",
    creator: DefaultCreator
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
              let day = {
                name: this.state.creator.name,
                color: this.state.creator.color
              };
              let validator = dayValidator(this.props.days, day);
              if (validator.value) {
                this.props.createDay(day);
              } else {
                this.props.showModal("message", validator.message);
              }
            } else {
              let day = {
                name: this.state.creator.name,
                color: this.state.creator.color
              };
              let validator = dayValidator(this.props.days, day);
              if (validator.value) {
                this.props.updateDay(this.state.creator.id, day);
              } else {
                this.props.showModal("message", validator.message);
              }
            }
            this.setState({
              creator: DefaultCreator
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
            <label htmlFor="">Color</label>
            <ColorsPanel
              color={this.state.creator.color}
              change={color => {
                this.setState({ creator: { ...this.state.creator, color } });
              }}
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
                let dayObj = { name: day, color: DAY_COLOR };
                let validator = dayValidator(this.props.days, dayObj);
                if (validator.value) {
                  this.props.createDay(dayObj);
                }
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
              <div
                key={day.id}
                className="block"
                style={{ background: day.color }}
              >
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
    deleteDay,
    showModal
  }
)(Days);
