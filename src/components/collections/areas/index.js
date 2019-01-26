import React, { Component } from "react";

import { rand } from "../../../actions/helpers";

import FormEditor from "./FormEditor";

class Area extends Component {
  state = {
    array: this.props.array,
    name: this.props.name,
    heading: this.props.heading,
    editor: this.props.editor || "FormEditor",
    showEditorFor: null
  };
  addProperty() {
    let property = {};
    this.props.keys.map(key => {
      if (key.name === "name") {
        property[key.name] = this.state.name + this.state.array.length;
      } else if (key.name === "number") {
        property[key.name] = this.state.array.length;
      } else {
        property[key.name] = key.default == null ? null : key.default;
      }
      return null;
    });
    property.id = rand(this.state.name);
    this.setState({ array: [...this.state.array, property] });
    this.props.createActionCreator(property);
  }
  editor = obj => {
    if (this.state.showEditorFor === obj) {
      switch (this.state.editor) {
        case "FormEditor":
        default:
          return (
            <FormEditor
              property={obj}
              keys={this.props.keys}
              save={this.save}
            />
          );
      }
    } else {
      return null;
    }
  };
  deleteProperty = obj => {
    this.props.deleteActionCreator(obj.id);
    let array = this.state.array.filter(item => item.id !== obj.id);
    this.setState({ array: array });
  };
  save = obj => {
    console.log("Saving Changes into Storage");
    this.props.updateActionCreator(obj.id, obj);
    if (this.state.showEditorFor === obj) {
      this.setState({ showEditorFor: null });
    }
  };
  render() {
    return (
      <div>
        <div>
          <h2>{this.state.heading}</h2>
          <div>
            <button
              onClick={() => {
                this.addProperty();
              }}
              className="btn-red"
            >
              Add
            </button>
            <ul style={{ padding: "0px" }}>
              {this.state.array.map(obj => {
                return (
                  <li
                    key={obj.id}
                    onClick={() =>
                      this.setState({
                        property: obj
                      })
                    }
                    className="area-item"
                  >
                    <div style={{ width: "100%", display: "flex" }}>
                      <div>
                        <h3>{obj.name}</h3>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "flex-end"
                        }}
                      >
                        <div className="buttons-list">
                          <button
                            onClick={() => {
                              this.setState({ showEditorFor: obj });
                            }}
                          >
                            Edit
                          </button>
                          <button onClick={() => this.deleteProperty(obj)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    {this.editor(obj)}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Area;
