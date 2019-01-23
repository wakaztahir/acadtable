import React, { Component } from "react";

import { rand } from "../../../actions/helpers";

class Area extends Component {
  state = {
    array: this.props.array,
    name: this.props.name,
    heading: this.props.heading,
    keys: this.props.keys
  };
  addProperty() {
    let property = {};
    this.state.keys.map(k => {
      if (k.name === "name") {
        property[k.name] = this.state.name + this.state.array.length;
      } else if (k.name === "number") {
        property[k.name] = this.state.array.length;
      } else {
        property[k.name] = k.default == null ? null : k.default;
      }
      return null;
    });
    property.id = rand(this.state.name);
    this.setState({ array: [...this.state.array, property] });
    this.props.createActionCreator(property);
  }
  addKey(property, key, value) {}
  render() {
    return (
      <div>
        {this.state.heading}
        <select>
          {this.state.array.map(obj => {
            return <option key={obj.id}>{obj.name}</option>;
          })}
        </select>
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
