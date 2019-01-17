import React, { Component } from "react";

import { connect } from "react-redux";

import { selectTableById, deleteTableById } from "../../actions";

class List extends Component {
  render() {
    return this.props.list.map(item => {
      let selected =
        this.props.selected == null ? { id: "" } : this.props.selected;
      let addit_class = item.id === selected.id ? "selected-card" : "";
      return (
        <div key={item.id} className={`table-card card-box ${addit_class}`}>
          <div className="card-title">{item.name}</div>
          <div className="buttons-list blue">
            <button
              onClick={() => {
                this.props.select(item.id);
              }}
              className="select-btn"
            >
              Select
            </button>
            <button
              onClick={() => {
                this.props.edit(item);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                this.props.delete(item.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  }
}

const mapStateToProps = state => {
  return {
    list: state.TablesList,
    selected: state.SelectedTable
  };
};

export default connect(
  mapStateToProps,
  {
    select: selectTableById,
    delete: deleteTableById
  }
)(List);
