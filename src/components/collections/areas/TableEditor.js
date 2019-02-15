import React, { Component } from "react";

import FormEditor from "./FormEditor";

class TableEditor extends Component {
  state = {
    property: this.props.property,
    keys: this.props.keys
  };
  saveTable = () => {
    let property = this.state.property;
    if (property.base == null) {
      property.base = this.props.items[0].name;
    }
    if (property.baseValue == null) {
      property.baseValue =
        this.props.items[0].list.length > 0
          ? this.props.items[0].list[0].id
          : null;
    }
    if (property.rows == null) {
      property.rows = this.props.items[1].name;
    }
    if (property.cols == null) {
      property.cols = this.props.items[2].name;
    }
    this.props.save(property);
  };
  componentWillUnmount() {
    if (!this.props.nounmount) {
      this.props.saveTable();
    }
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
      <FormEditor
        property={this.state.property}
        keys={this.props.keys}
        save={this.saveTable}
        nounmount={this.props.nounmount}
      >
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
                : items[0].name
            }
            required={true}
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
                : baseList.length > 0
                ? baseList[0].id
                : null
            }
            required={true}
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
                : rowsList[0].name
            }
            required={true}
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
                : colsList[0].name
            }
            required={true}
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
      </FormEditor>
    );
  }
}

export default TableEditor;
