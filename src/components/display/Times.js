import React, { Component } from "react";

import { connect } from "react-redux";

import { createTime, updateTime, swapTime, deleteTime } from "../../actions";

import { TIME_COLOR } from "../../actions/helpers";

import ColorsPanel from "../others/ColorsPanel";

const DefaultCreator = {
  id: null,
  name: null,
  color: TIME_COLOR,
  mode: "create"
};

const DefaultQuicker = {
  fromTime: "08",
  fromMeridian: "AM",
  toTime: "01",
  toMeridian: "PM",
  lectureTime: "60",
  color: TIME_COLOR
};

class Times extends Component {
  state = {
    display: "main",
    creator: DefaultCreator,
    quicker: DefaultQuicker
  };
  componentWillUnmount() {
    this.props.user.save();
  }
  quicker() {
    return (
      <div>
        <h1>Times</h1>

        <div className="full-wrapper flex-center">
          <h2>Timing of your institute/school ?</h2>
          <div className="form-table">
            <div className="form-row">
              <label htmlFor="from">From </label>
              <input
                id="from"
                type="text"
                value={this.state.quicker.fromTime}
                onChange={x => {
                  this.setState({
                    quicker: {
                      ...this.state.quicker,
                      fromTime: x.target.value
                    }
                  });
                }}
              />
              &nbsp;&nbsp;
              <select
                value={this.state.quicker.fromMeridian}
                onChange={x => {
                  this.setState({
                    quicker: {
                      ...this.state.quicker,
                      fromMeridian: x.target.value
                    }
                  });
                }}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="to">To </label>
              <input
                id="to"
                type="text"
                value={this.state.quicker.toTime}
                onChange={x => {
                  this.setState({
                    quicker: {
                      ...this.state.quicker,
                      toTime: x.target.value
                    }
                  });
                }}
              />
              &nbsp;&nbsp;
              <select
                value={this.state.quicker.toMeridian}
                onChange={x => {
                  this.setState({
                    quicker: {
                      ...this.state.quicker,
                      toMeridian: x.target.value
                    }
                  });
                }}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="">Lecture time (in minutes)</label>
              <input
                type="text"
                placeholder="30,60 or 90"
                value={this.state.quicker.lectureTime}
                onChange={x => {
                  this.setState({
                    quicker: {
                      ...this.state.quicker,
                      lectureTime: x.target.value
                    }
                  });
                }}
              />
            </div>
            <div className="form-row" />
            <div className="form-row">
              <label htmlFor="">Color</label>
              <ColorsPanel
                color={this.state.quicker.color}
                change={color => {
                  this.setState({ quicker: { ...this.state.quicker, color } });
                }}
              />
            </div>
          </div>

          <br />
          <div>
            <button onClick={() => this.setState({ display: "main" })}>
              Cancel
            </button>
            &nbsp;
            <button
              onClick={() => {
                const timeChanger = (time, modifier) => {
                  time = parseInt(time);
                  if (time === 12) {
                    time = 0;
                  }
                  if (modifier === "PM") {
                    time += 12;
                  }
                  return time;
                };
                let from = new Date();
                from.setHours(
                  timeChanger(
                    this.state.quicker.fromTime,
                    this.state.quicker.fromMeridian
                  ),
                  0,
                  0,
                  0
                );
                let to = new Date();
                to.setHours(
                  timeChanger(
                    this.state.quicker.toTime,
                    this.state.quicker.toMeridian
                  ),
                  0,
                  0,
                  0
                );
                let times = [];
                const timeStringer = time => {
                  let hours =
                    time.getHours() > 12
                      ? time.getHours() - 12
                      : time.getHours();
                  time = `${
                    hours.toString().length === 1 ? `0${hours}` : hours
                  }:${
                    time.getMinutes().toString().length === 1
                      ? `0${time.getMinutes()}`
                      : time.getMinutes()
                  } ${time.getHours() > 12 ? "PM" : "AM"}`;
                  return time;
                };
                while (from.getTime() < to.getTime()) {
                  let start = timeStringer(from);
                  from.setMinutes(
                    from.getMinutes() + parseInt(this.state.quicker.lectureTime)
                  );
                  times.push(start + " - " + timeStringer(from));
                }
                times.forEach(time => {
                  this.props.createTime({
                    name: time,
                    color: this.state.quicker.color
                  });
                  this.setState({ display: "main" });
                });
              }}
              className="black-btn"
            >
              Create Times
            </button>
          </div>
        </div>
      </div>
    );
  }
  creator() {
    return (
      <div>
        <form
          onSubmit={event => {
            event.preventDefault();
            if (this.state.creator.mode === "create") {
              this.props.createTime({
                name: this.state.creator.name,
                color: this.state.creator.color
              });
            } else {
              this.props.updateTime(this.state.creator.id, {
                name: this.state.creator.name,
                color: this.state.creator.color
              });
            }
            this.setState({
              creator: DefaultCreator
            });
          }}
          className="form-table"
        >
          <div className="form-row">
            <label htmlFor="name">Time Name &nbsp;</label>
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
            <label htmlFor="colorbtn">Color </label>
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
    if (this.state.display === "quick") {
      return this.quicker();
    }
    return (
      <div>
        <h1>Times</h1>
        <div style={{ margin: "1rem" }}>
          <button
            onClick={() => {
              this.setState({
                display: "quick",
                creator: { id: null, name: null, mode: "create" }
              });
            }}
          >
            Quick Times
          </button>
        </div>
        <div style={{ margin: "1rem" }}>{this.creator()}</div>
        <div className="block-list">
          {this.props.times.map((time, index) => {
            return (
              <div
                key={time.id}
                className="block"
                style={{ background: time.color }}
              >
                <div className="block-txt">
                  <span>{time.name}</span>
                </div>
                <div className="block-btns">
                  {index === 0 ? null : (
                    <button
                      onClick={() => {
                        this.props.swapTime(
                          time.id,
                          this.props.times[index - 1].id
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
                          ...time,
                          mode: "update"
                        }
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      this.props.deleteTime(time.id);
                    }}
                  >
                    Delete
                  </button>
                  {index === this.props.times.length - 1 ? null : (
                    <button
                      onClick={() => {
                        this.props.swapTime(
                          time.id,
                          this.props.times[index + 1].id
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
    times: state.Times
  };
};

export default connect(
  mapStateToProps,
  {
    createTime,
    updateTime,
    swapTime,
    deleteTime
  }
)(Times);
