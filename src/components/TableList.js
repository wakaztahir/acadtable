import React from "react";

import engine from "../classes/engine";

import { connect } from "react-redux";

import { listTables } from "../actions/CoreActions";

import {
  displayTable,
  editTable,
  renameTable,
  exportTable,
  deleteTable
} from "../actions/TableActions";

class TableList extends React.Component {
  componentDidMount() {
    this.props.listTables(engine.getTablesArray());
  }
  render() {
    return this.props.tables.map(table => {
      return (
        <div className="table-item" key={table.id}>
          <span>{table.name}</span>
          <div className="table-item-buttons">
            <button
              onClick={() => {
                this.props.displayTable(table.id);
              }}
            >
              show
            </button>
            <button
              onClick={() => {
                this.props.editTable(table.id);
              }}
            >
              edit
            </button>
            <button
              onClick={() => {
                this.props.renameTable(table.id);
              }}
            >
              rename
            </button>
            <button
              onClick={() => {
                this.props.deleteTable(table.id);
              }}
            >
              delete
            </button>
            <button
              onClick={() => {
                this.props.exportTable(table.id);
              }}
            >
              export
            </button>
          </div>
        </div>
      );
    });
  }
}

const mapStateToProps = state => {
  return {
    tables: state.core.TableList
  };
};

export default connect(
  mapStateToProps,
  {
    displayTable,
    editTable,
    renameTable,
    deleteTable,
    exportTable,
    listTables
  }
)(TableList);
