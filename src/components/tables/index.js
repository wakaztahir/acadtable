import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { renameTableById, deleteTableById } from "../../actions";

class Tables extends Component {
  renderList() {
    return this.props.list.map(item => {
      return (
        <div key={item.id}>
          <div>{item.name}</div>
          <div>
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
        <nav>
          <ul>
            <li>
              <Link to="/tables/create">Create Table</Link>
            </li>
          </ul>
        </nav>
        {this.renderList()}
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
