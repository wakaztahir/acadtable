import React, { Component } from "react";

class FormEditor extends Component {
  state = {
    property: this.props.property,
    keys: this.props.keys
  };
  componentWillUnmount() {
    this.props.save(this.state.property);
  }
  render() {
    const field = (keyType, key) => {
      switch (keyType) {
        case "input":
        default:
          return (
            <input
              key={key.name + "inp"}
              type="text"
              onChange={x => {
                let newvalue = x.target.value;
                let property = this.state.property;
                property[key.name] = newvalue;
                this.setState({ property });
              }}
              disabled={key.locked == null ? false : key.locked}
              required={key.required == null ? false : key.required}
              value={
                this.state.property[key.name] == null
                  ? ""
                  : this.state.property[key.name]
              }
              style={{ display: "table-cell" }}
            />
          );
        case "select":
          return (
            <select
              defaultValue={
                this.state.property[key.name] != null
                  ? this.state.property[key.name]
                  : null
              }
              onChange={x => {
                let property = this.state.property;
                property[key.name] = x.target.value;
                this.setState({ property });
              }}
            >
              {key.list.map(item => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          );
      }
    };
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div style={{ display: "table" }}>
          <form
            onSubmit={x => {
              x.preventDefault();
              this.props.save(this.state.property);
            }}
          >
            {this.state.keys.map(key => {
              if (key.show != null && !key.show) {
                return null;
              }
              let keyType = key.type != null ? key.type : "input";
              return (
                <div key={key.name + key.id} style={{ display: "table-row" }}>
                  <label
                    htmlFor={key.name + key.id + "inp"}
                    style={{ display: "table-cell" }}
                  >
                    {key.name}
                  </label>
                  {field(keyType, key)}
                </div>
              );
            })}
            <div style={{ display: "table-row" }}>
              <div style={{ display: "table-cell" }} />
              <input
                type="submit"
                style={{ display: "table-cell", width: "100%" }}
                className="btn-red"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default FormEditor;
