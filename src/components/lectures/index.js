import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { renameLectureById, deleteLectureById } from "../../actions";

class Lectures extends Component {
  renderList() {
    return this.props.list.map(item => {
      return (
        <div className="lecture-card card-box" key={item.id}>
          <div className="card-title">{item.name}</div>
          <div className="buttons-list blue">
            <button
              onClick={() => {
                this.props.deleteLectureById(item.id);
              }}
            >
              Delete
            </button>
            <Link to={{ pathname: "/Lectures/rename", id: item.id }}>
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
        <h1>Lectures</h1>
        <ul className="buttons-list">
          <li>
            <Link to="/Lectures/create">
              <button>Create A Lecture</button>
            </Link>
          </li>
        </ul>
        <div className="list-container">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    list: state.LectureList
  };
};

export default connect(
  mapStateToProps,
  {
    renameLectureById,
    deleteLectureById
  }
)(Lectures);
