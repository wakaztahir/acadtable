import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { renameBatchById, deleteBatchById } from "../../actions";

class Batches extends Component {
  renderList() {
    return this.props.list.map(item => {
      return (
        <div key={item.id}>
          <div>{item.name}</div>
          <div>
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
        <ul>
          <li>
            <Link to="/batches/create">Create Batch</Link>
          </li>
        </ul>
        {this.renderList()}
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
