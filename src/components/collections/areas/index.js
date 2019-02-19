import React, { Component } from "react";

import FormEditor from "./FormEditor";
import TableEditor from "./TableEditor";

class Area extends Component {
  state = {
    array: this.props.array,
    name: this.props.name,
    heading: this.props.heading,
    editor: this.props.editor || "FormEditor",
    showCreator: false,
    showEditorFor: null
  };
  editor = (obj, bypass = false, create) => {
    if (this.state.showEditorFor === obj || bypass) {
      let saveFunction = bypass ? create : this.save;
      switch (this.state.editor) {
        case "FormEditor":
        default:
          return (
            <FormEditor
              property={obj}
              keys={this.props.keys}
              save={saveFunction}
              nounmount={bypass}
            />
          );
        case "TableEditor":
          return (
            <TableEditor
              property={obj}
              items={this.props.items}
              keys={this.props.keys}
              save={saveFunction}
              nounmount={bypass}
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
  create = obj => {
    console.log("Creating In Storage");
    console.log(obj);
    this.props.createActionCreator(obj);
  };
  save = obj => {
    console.log("Saving Changes into Storage");
    this.props.updateActionCreator(obj.id, obj);
    if (this.state.showEditorFor === obj) {
      this.setState({ showEditorFor: null });
    }
  };
  creator = () => {
    if (this.state.showCreator) {
      let keys = {};
      this.props.keys.map(k => {
        keys[k.name] = null;
        return null;
      });
      return this.editor(keys, true, this.create);
    } else {
      return null;
    }
  };
  render() {
    return (
      <div>
        <div>
          <h2>{this.state.heading}</h2>
          <div>{this.props.children}</div>
          <div>
            <button
              onClick={() => {
                this.setState({ showCreator: !this.state.showCreator });
              }}
              className={this.state.showCreator ? "" : "btn-red"}
            >
              {this.state.showCreator ? "Cancel" : "Create"}
            </button>
          </div>
          <div>
            {this.creator()}
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
