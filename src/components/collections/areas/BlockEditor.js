import React, { Component } from "react";

class BlockEditor extends Component {
  state = {
    property: this.props.property,
    keys: this.props.keys
  };
  componentWillUnmount() {
    this.props.save(this.state.property);
  }
  render() {
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
              let show = key.show == null ? true : key.show;
              if (!show) {
                return null;
              }
              return (
                <div key={key.name + key.id} style={{ display: "table-row" }}>
                  <label
                    htmlFor={key.name + key.id + "inp"}
                    style={{ display: "table-cell" }}
                  >
                    {key.name}
                  </label>
                  <input
                    name={key.name + key.id + "inp"}
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
                    style={{ marginBottom: "5px", display: "table-cell" }}
                  />
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
export default BlockEditor;
