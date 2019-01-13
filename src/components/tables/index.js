import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  selectTableById,
  renameTableById,
  deleteTableById
} from "../../actions";

class Tables extends Component {
  renderList() {
    return this.props.list.map(item => {
      let additional = "";
      let SelectBtn = () => {
        return null;
      };
      if (this.props.selected !== null && this.props.selected.id === item.id) {
        additional = "selected-table";
      } else {
        SelectBtn = () => {
          return (
            <button onClick={() => this.props.selectTableById(item.id)}>
              Select
            </button>
          );
        };
      }
      return (
        <div key={item.id} className={`table-card card-box ${additional}`}>
          <div className="card-title">{item.name}</div>
          <div className="buttons-list blue">
            <SelectBtn />
            <button
              onClick={() => {
                this.props.deleteTableById(item.id);
              }}
            >
              Delete
            </button>
            <Link to={{ pathname: "/tables/rename", id: item.id }}>
              <button>Rename</button>
            </Link>
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div>
        <h1>Tables</h1>
        <ul className="buttons-list">
          <li>
            <Link to="/tables/create">
              <button>Create A Table</button>
            </Link>
          </li>
        </ul>
        <div className="list-container">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.TableList,
    selected: state.SelectedTable
  };
};

export default connect(
  mapStateToProps,
  {
    selectTableById,
    renameTableById,
    deleteTableById
  }
)(Tables);
