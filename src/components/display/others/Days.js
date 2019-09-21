import React, { Component } from "react";

import { connect } from "react-redux";

import {
  createDay,
  updateDay,
  swapDay,
  deleteDay,
  showModal
} from "../../../actions";

import { DAY_COLOR, dayValidator } from "../../../actions/helpers";

import ColorsPanel from "../../modals/ColorsPanel";

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
              let validator = dayValidator(this.props.days, day, day);
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
      <div style={{ marginBottom: "50px" }}>
        <h1>Create Day</h1>
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

        <div className="table-list">
          <h1>Days List</h1>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Move</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {this.props.days.map((day, index) => {
                return (
                  <tr>
                    <td>
                      <span>{day.name}</span>
                    </td>
                    <td>
                      <div className="btn-container">
                        {index === 0 ? null : (
                          <button
                            onClick={() => {
                              this.props.swapDay(
                                day.id,
                                this.props.days[index - 1].id
                              );
                            }}
                          >
                            Up
                          </button>
                        )}
                        {index === this.props.days.length - 1 ? null : (
                          <button
                            onClick={() => {
                              this.props.swapDay(
                                day.id,
                                this.props.days[index + 1].id
                              );
                            }}
                          >
                            Down
                          </button>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="btn-container">
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
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
