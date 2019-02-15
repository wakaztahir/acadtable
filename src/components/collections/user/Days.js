import React, { Component } from "react";

import { rand } from "../../../actions/helpers";

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
              prop.id = rand("day");
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
