import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { renameTableById, deleteTableById } from "../../actions";

class Tables extends Component {
  renderList() {
    return this.props.list.map(item => {
      return (
        <div key={item.id} className="table-card">
          <div className="card-title">{item.name}</div>
          <div className="buttons-list blue">
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
    list: state.TableList
  };
};

export default connect(
  mapStateToProps,
  {
    renameTableById,
    deleteTableById
  }
)(Tables);
