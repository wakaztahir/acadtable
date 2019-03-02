import React, { Component } from "react";

const DefaultSetupSettings = {
  days: {
    from: "monday",
    to: "saturday"
  },
  times: {
    fromTime: "06:00",
    fromMeridian: "AM",
    toTime: "01:00",
    toMeridian: "PM",
    lectureTime: "60"
  },
  places: {
    name: "Room",
    from: "0",
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
  days() {
    return (
      <div>
        <h2>Days on which your school/university has lectures ?</h2>

        <div>
          <span>Monday to </span>&nbsp;&nbsp;
          <select
            name="days"
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
        <button
          onClick={() => {
            this.setState({ stage: "times" });
          }}
        >
          Next
        </button>
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
                // if (
                //   obj === this.state.tables.base ||
                //   obj === this.state.tables.cols
                // ) {
                //   return null;
                // }
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
                // if (
                //   obj === this.state.tables.rows ||
                //   obj === this.state.tables.base
                // ) {
                //   return null;
                // }
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
            onClick={this.finish}
            className="black-btn"
            title="Default value will be used if a value was found to be invalid"
          >
            Finish Setup
          </button>
        </div>
      </div>
    );
  }
  finish() {}
  stage() {
    switch (this.state.stage) {
      case null:
      case "days":
      default:
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

export default QuickSetup;
