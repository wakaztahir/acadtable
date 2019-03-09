import React, { Component } from "react";

import { connect } from "react-redux";

import {
  createCollection,
  selectCollection,
  createDay,
  createTime,
  createPlace,
  createTable
} from "../actions";

import storage from "../actions/storage";

const DefaultSetupSettings = {
  info: {
    name: "",
    desc: ""
  },
  days: {
    from: "monday",
    to: "saturday"
  },
  times: {
    fromTime: "08:00",
    fromMeridian: "AM",
    toTime: "01:00",
    toMeridian: "PM",
    lectureTime: "60"
  },
  places: {
    name: "Room",
    from: "1",
    to: "10"
  },
  tables: {
    base: "days",
    rows: "places",
    cols: "times"
  }
};

class QuickSetup extends Component {
  state = {
    stage: null,
    ...DefaultSetupSettings
  };
  info() {
    return (
      <div>
        <div className="welcome-dialogue form-table">
          <div className="form-row">
            <label htmlFor="cName" className="big-label">
              Collection Name
            </label>
            <input
              id="cName"
              type="text"
              onChange={event =>
                this.setState({
                  info: { ...this.state.info, name: event.target.value }
                })
              }
              value={this.state.info.name}
              className="big-input"
              placeholder="my first collection..."
              required={true}
            />
          </div>
          <div className="form-row">
            <label htmlFor="desc" className="big-label">
              Description
            </label>
            <textarea
              id="cdesc"
              className="big-desc"
              onChange={event => {
                this.setState({
                  info: { ...this.state.info, desc: event.target.value }
                });
              }}
              value={this.state.info.desc}
              placeholder="this is the best collection ever..."
            />
          </div>
          <div className="form-row">
            <span />
            <button
              onClick={() => {
                this.setState({ stage: "days" });
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
  days() {
    return (
      <div>
        <h2>Days on which your school/university has lectures ?</h2>

        <div>
          <label htmlFor="days">Monday to </label>&nbsp;&nbsp;
          <select
            id="days"
            value={this.state.days.to}
            onChange={x => {
              this.setState({
                days: { ...this.state.days, to: x.target.value }
              });
            }}
          >
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>
        </div>
        <br />
        <div>
          <button onClick={() => this.setState({ stage: "info" })}>Prev</button>
          &nbsp;
          <button onClick={() => this.setState({ stage: "times" })}>
            Next
          </button>
        </div>
      </div>
    );
  }
  times() {
    return (
      <div>
        <h2>Timing of your institute/school ?</h2>
        <div className="form-table">
          <div className="form-row">
            <label htmlFor="from">From </label>
            <input
              id="from"
              type="text"
              value={this.state.times.fromTime}
              onChange={x => {
                this.setState({
                  times: {
                    ...this.state.times,
                    fromTime: x.target.value
                  }
                });
              }}
            />
            &nbsp;&nbsp;
            <select
              value={this.state.times.fromMeridian}
              onChange={x => {
                this.setState({
                  times: {
                    ...this.state.times,
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
              value={this.state.times.toTime}
              onChange={x => {
                this.setState({
                  times: {
                    ...this.state.times,
                    toTime: x.target.value
                  }
                });
              }}
            />
            &nbsp;&nbsp;
            <select
              value={this.state.times.toMeridian}
              onChange={x => {
                this.setState({
                  times: {
                    ...this.state.times,
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
              value={this.state.times.lectureTime}
              onChange={x => {
                this.setState({
                  times: {
                    ...this.state.times,
                    lectureTime: x.target.value
                  }
                });
              }}
            />
          </div>
          <div className="form-row" />
        </div>
        <div>
          <button onClick={() => this.setState({ stage: "days" })}>Prev</button>
          &nbsp;
          <button onClick={() => this.setState({ stage: "places" })}>
            Next
          </button>
        </div>
      </div>
    );
  }
  places() {
    return (
      <div>
        <h2>How many Rooms/Places in which lectures are held ?</h2>
        <div className="form-table">
          <div className="form-row">
            <label htmlFor="name">Place Name : </label>
            <input
              type="text"
              value={this.state.places.name}
              onChange={x =>
                this.setState({
                  places: { ...this.state.places, name: x.target.value }
                })
              }
            />
          </div>
          <div className="form-row">
            <label htmlFor="roomfrom">From (room/place no)</label>
            <input
              type="text"
              value={this.state.places.from}
              onChange={x =>
                this.setState({
                  places: { ...this.state.places, from: x.target.value }
                })
              }
            />
          </div>
          <div className="form-row">
            <label htmlFor="roomfrom">To (room/place no)</label>
            <input
              type="text"
              value={this.state.places.to}
              onChange={x =>
                this.setState({
                  places: { ...this.state.places, to: x.target.value }
                })
              }
            />
          </div>
          <h4 style={{ color: "rgb(150,150,150)" }}>
            You can add the labs/etc later...
          </h4>
          <br />
        </div>
        <div>
          <button onClick={() => this.setState({ stage: "times" })}>
            Prev
          </button>
          &nbsp;
          <button onClick={() => this.setState({ stage: "tables" })}>
            Next
          </button>
        </div>
      </div>
    );
  }
  tables() {
    let objects = [
      "days",
      "times",
      "places"
      //   "batches",
      //   "subjects",
      //   "teachers"
    ];

    return (
      <div>
        <h2>Table Settings</h2>
        <div className="form-table">
          <div className="form-row">
            <label htmlFor="base">Tables for</label>
            <select
              type="text"
              value={this.state.tables.base}
              onChange={x =>
                this.setState({
                  tables: { ...this.state.tables, base: x.target.value }
                })
              }
              style={{ textTransform: "capitalize" }}
            >
              {objects.map(obj => {
                // if (
                //   obj === this.state.tables.rows ||
                //   obj === this.state.tables.cols
                // ) {
                //   return null;
                // }
                return (
                  <option key={"base" + obj} value={obj}>
                    {obj}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="rows">Rows </label>
            <select
              id="rows"
              type="text"
              value={this.state.tables.rows}
              onChange={x =>
                this.setState({
                  tables: { ...this.state.tables, rows: x.target.value }
                })
              }
              style={{ textTransform: "capitalize" }}
            >
              {objects.map(obj => {
                if (obj === this.state.tables.base) {
                  return null;
                }
                return (
                  <option key={"row" + obj} value={obj}>
                    {obj}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="cols">Columns </label>
            <select
              id="cols"
              type="text"
              value={this.state.tables.cols}
              onChange={x =>
                this.setState({
                  tables: { ...this.state.tables, cols: x.target.value }
                })
              }
              style={{ textTransform: "capitalize" }}
            >
              {objects.map(obj => {
                if (
                  obj === this.state.tables.rows ||
                  obj === this.state.tables.base
                ) {
                  return null;
                }
                return (
                  <option key={"col" + obj} value={obj}>
                    {obj}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <br />
        <div>
          <button onClick={() => this.setState({ stage: "places" })}>
            Prev
          </button>
          &nbsp;
          <button
            onClick={() => this.finish()}
            className="black-btn"
            title="Default value will be used if a value was found to be invalid"
          >
            Finish Setup
          </button>
        </div>
      </div>
    );
  }
  finish() {
    let days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ];
    days = days.slice(0, days.indexOf(this.state.days.to) + 1);
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
      timeChanger(this.state.times.fromTime, this.state.times.fromMeridian),
      0,
      0,
      0
    );
    let to = new Date();
    to.setHours(
      timeChanger(this.state.times.toTime, this.state.times.toMeridian),
      0,
      0,
      0
    );
    let times = [];
    const timeStringer = time => {
      let hours = time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
      time = `${hours.toString().length === 1 ? `0${hours}` : hours}:${
        time.getMinutes().toString().length === 1
          ? `0${time.getMinutes()}`
          : time.getMinutes()
      } ${time.getHours() > 12 ? "PM" : "AM"}`;
      return time;
    };
    while (from.getTime() < to.getTime()) {
      let start = timeStringer(from);
      from.setMinutes(
        from.getMinutes() + parseInt(this.state.times.lectureTime)
      );
      times.push(start + " - " + timeStringer(from));
    }
    let places = [];
    for (
      let i = parseInt(this.state.places.from);
      i <= parseInt(this.state.places.to);
      i++
    ) {
      places.push(`${this.state.places.name} ${i}`);
    }
    /// CREATING A COLLECTION
    let collection = createCollection(
      {
        name:
          this.state.info.name.length > 0
            ? this.state.info.name
            : "Quick Collection",
        desc: `${this.state.info.desc}`,
        time: `${new Date().toLocaleDateString()}`
      },
      true
    );
    days = days.map(day => {
      return createDay(
        {
          name: `${day[0].toUpperCase()}${day.substr(1, day.length)}`
        },
        true
      );
    });
    times = times.map(time => {
      return createTime(
        {
          name: time
        },
        true
      );
    });
    places = places.map(place => {
      return createPlace(
        {
          name: place
        },
        true
      );
    });
    /// CREATING TABLES
    let tables = [];
    let objector = { days, times, places };
    let tFor = objector[this.state.tables.base];
    tFor.forEach(base => {
      tables.push({
        base: this.state.tables.base,
        baseValue: base.id,
        rows: this.state.tables.rows,
        cols: this.state.tables.cols
      });
    });
    tables = tables.map(table => {
      return createTable(table, true);
    });
    storage.save();
    this.props.selectCollection(collection.id);
  }
  stage() {
    switch (this.state.stage) {
      case "info":
      case null:
      default:
        return this.info();
      case "days":
        return this.days();
      case "times":
        return this.times();
      case "places":
        return this.places();
      case "tables":
        return this.tables();
    }
  }
  render() {
    return (
      <div>
        <button onClick={this.props.back}>Back</button>
        <h1>Quick Setup</h1>
        {this.stage()}
      </div>
    );
  }
}

export default connect(
  null,
  {
    selectCollection
  }
)(QuickSetup);
