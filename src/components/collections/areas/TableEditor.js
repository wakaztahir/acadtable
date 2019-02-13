import React, { Component } from "react";

class TableEditor extends Component {
  state = {
    property: this.props.property,
    keys: this.props.keys
  };
  componentWillUnmount() {
    this.props.save(this.state.property);
  }
  render() {
    let items = this.props.items;
    let base =
      this.state.property.base != null
        ? this.state.property.base
        : items[0].name;
    let blist = items.filter(i => i.name === base)[0];
    let baseList = blist != null ? blist.list : [];
    let rowsList = items.filter(i => i.name !== base);
    let rowsValue =
      this.state.property.rows != null
        ? this.state.property.rows
        : items[1].name;
    let colsList = rowsList.filter(i => i.name !== rowsValue);
    let property = this.state.property;
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
              if (key.show !== undefined && !key.show) {
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
                    style={{ display: "table-cell" }}
                  />
                </div>
              );
            })}
            <div style={{ display: "table-row" }}>
              <label htmlFor="base" style={{ display: "table-cell" }}>
                Base
              </label>
              <select
                name="base"
                onChange={x => {
                  this.setState({
                    property: { ...property, base: x.target.value }
                  });
                }}
                style={{ display: "table-cell" }}
                defaultValue={
                  this.state.property.base != null
                    ? this.state.property.base
                    : null
                }
              >
                {items.map(item => {
                  return (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              <select
                style={{ display: "table-cell" }}
                onChange={x => {
                  this.setState({
                    property: { ...property, baseValue: x.target.value }
                  });
                }}
                defaultValue={
                  this.state.property.baseValue != null
                    ? this.state.property.baseValue
                    : null
                }
              >
                {baseList.map(item => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div style={{ display: "table-row" }}>
              <label htmlFor="rows" style={{ display: "table-cell" }}>
                Rows
              </label>
              <select
                id="rows"
                style={{ display: "table-cell" }}
                onChange={x => {
                  this.setState({
                    property: { ...property, rows: x.target.value }
                  });
                }}
                defaultValue={
                  this.state.property.rows != null
                    ? this.state.property.rows
                    : null
                }
              >
                {rowsList.map(item => {
                  return (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div style={{ display: "table-row" }}>
              <label htmlFor="rows" style={{ display: "table-cell" }}>
                Columns
              </label>
              <select
                style={{ display: "table-cell" }}
                onChange={x => {
                  this.setState({
                    property: { ...property, cols: x.target.value }
                  });
                }}
                defaultValue={
                  this.state.property.cols != null
                    ? this.state.property.cols
                    : null
                }
              >
                {colsList.map(item => {
                  return (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div style={{ display: "table-row", marginTop: "5px" }}>
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

export default TableEditor;
