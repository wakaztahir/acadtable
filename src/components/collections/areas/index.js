import React, { Component } from "react";

import { rand } from "../../../actions/helpers";

class Area extends Component {
  state = {
    array: this.props.array,
    name: this.props.name,
    heading: this.props.heading,
    property: {},
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
  componentDidUpdate() {
    this.save();
  }
  componentWillUnmount() {
    this.save();
  }
  save = x => {
    if (x) {
      x.preventDefault();
    }
    this.props.updateActionCreator(this.state.property.id, this.state.property);
  };
  delete = x => {
    this.props.deleteActionCreator(this.state.property.id);
    let array = this.state.array.filter(
      item => item.id !== this.state.property.id
    );
    this.setState({ array, property: {} });
  };
  render() {
    return (
      <div>
        <div>
          {this.state.heading}
          <div>
            <button
              onClick={() => {
                this.addProperty();
              }}
            >
              +
            </button>
            <ul>
              {this.state.array.map(obj => {
                if (this.state.property === {}) {
                  this.setState({ property: obj });
                }
                return (
                  <li
                    key={obj.id}
                    onClick={() =>
                      this.setState({
                        property: obj
                      })
                    }
                  >
                    {obj.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <form onSubmit={this.save}>
              <ul>
                {Object.keys(this.state.property).map(k => {
                  if (k === "id" || k === "number") {
                    return null;
                  }
                  return (
                    <li key={this.state.property.id + k}>
                      <label htmlFor={k}>{k}</label>
                      <input
                        name={k}
                        type="text"
                        onChange={x => {
                          let newstate = this.state;
                          newstate.property[k] = x.target.value;
                          this.setState(newstate);
                        }}
                        value={
                          this.state.property[k] == null
                            ? ""
                            : this.state.property[k]
                        }
                      />
                    </li>
                  );
                })}
              </ul>
              {Object.keys(this.state.property).length > 0 ? (
                <div>
                  <input type="submit" value="Save" />
                  <input type="button" value="Delete" onClick={this.delete} />
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Area;
