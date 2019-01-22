import React, { Component } from "react";

class Area extends Component {
  state = {
    array: this.props.array,
    name: this.props.name,
    heading: this.props.heading,
    keys: this.props.keys
  };
  addProperty() {}
  addKey(property) {}
  addValue(property, key, value) {}
  render() {
    return (
      <div>
        {this.state.heading}
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
        </ul>
        <button
          onClick={() => {
            this.addProperty();
          }}
        >
          +
        </button>
      </div>
    );
  }
}

export default Area;
