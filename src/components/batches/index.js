import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { renameBatchById, deleteBatchById } from "../../actions";

class Batches extends Component {
  renderList() {
    return this.props.list.map(item => {
      return (
        <div className="batch-card" key={item.id}>
          <div className="card-title">{item.name}</div>
          <div className="buttons-list blue">
            <button
              onClick={() => {
                this.props.deleteBatchById(item.id);
              }}
            >
              Delete
            </button>
            <Link to={{ pathname: "/batches/rename", id: item.id }}>
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
        <h1>Batches</h1>
        <ul className="buttons-list">
          <li>
            <Link to="/batches/create">
              <button>Create A Batch</button>
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
    list: state.BatchList
  };
};

export default connect(
  mapStateToProps,
  {
    renameBatchById,
    deleteBatchById
  }
)(Batches);
