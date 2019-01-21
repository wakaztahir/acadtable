import React, { Component } from "react";

class Area extends Component {
  state = {
    array: this.props.array,
    name: this.props.name,
    keys: [],
    vals: []
  };
  render() {
    return (
      <div>
        {this.state.name}
        <ul>
          {this.state.array.map(obj => {
            return (
              <li
                onClick={() => {
                  this.setState({ keys: Object.keys(obj) });
                }}
              >
                {obj.name}
              </li>
            );
          })}
          <li>+</li>
        </ul>
      </div>
    );
  }
}

export default Area;
