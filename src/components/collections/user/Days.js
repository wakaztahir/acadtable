import React, { Component } from "react";

class Days extends Component {
  render() {
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
    return (
      <div>
        <button
          onClick={() => {
            days.forEach(day => {
              let prop = {};
              prop.name = day;
              this.props.create(prop);
            });
          }}
        >
          Add All Days
        </button>
      </div>
    );
  }
}

export default Days;
