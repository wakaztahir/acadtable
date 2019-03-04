import React, { Component } from "react";

import { connect } from "react-redux";

import storage from "../../actions/storage";

import {
  createTeacher,
  updateTeacher,
  swapTeacher,
  deleteTeacher
} from "../../actions";

class Teachers extends Component {
  state = {
    display: "main",
    creator: {
      id: null,
      name: null,
      mode: "create"
    }
  };
  componentWillUnmount() {
    storage.save();
  }
  creator() {
    return (
      <div>
        <form
          onSubmit={event => {
            event.preventDefault();
            if (this.state.creator.mode === "create") {
              this.props.createTeacher({ name: this.state.creator.name });
            } else {
              this.props.updateTeacher(this.state.creator.id, {
                name: this.state.creator.name
              });
            }
            this.setState({ display: "main" });
          }}
          className="form-table"
        >
          <div className="form-row">
            <label htmlFor="name">Teacher Name &nbsp;</label>
            <input
              type="text"
              id="name"
              onChange={x => {
                this.setState({
                  creator: { ...this.state.creator, name: x.target.value }
                });
              }}
              value={this.state.creator.name || ""}
            />
          </div>
          <div className="form-row">
            <div>
              <button
                onClick={() => {
                  this.setState({ display: "main" });
                }}
              >
                Cancel
              </button>
            </div>
            <input
              type="submit"
              value={this.state.creator.mode}
              style={{ textTransform: "capitalize" }}
            />
          </div>
        </form>
      </div>
    );
  }
  render() {
    if (this.state.display === "create") {
      return this.creator();
    }
    return (
      <div>
        <div style={{ margin: "1rem" }}>
          <button
            onClick={() => {
              this.setState({
                display: "create",
                creator: { id: null, name: null, mode: "create" }
              });
            }}
          >
            Create A Teacher
          </button>
        </div>
        <div className="block-list">
          {this.props.teachers.map((teacher, index) => {
            return (
              <div key={teacher.id} className="block">
                <div className="block-txt">
                  <span>{teacher.name}</span>
                </div>
                <div className="block-btns">
                  {index === 0 ? null : (
                    <button
                      onClick={() => {
                        this.props.swapTeacher(
                          teacher.id,
                          this.props.teachers[index - 1].id
                        );
                      }}
                    >
                      {"<"}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      this.setState({
                        display: "create",
                        creator: {
                          ...this.state.creator,
                          ...teacher,
                          mode: "update"
                        }
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      this.props.deleteTeacher(teacher.id);
                    }}
                  >
                    Delete
                  </button>
                  {index === this.props.teachers.length - 1 ? null : (
                    <button
                      onClick={() => {
                        this.props.swapTeacher(
                          teacher.id,
                          this.props.teachers[index + 1].id
                        );
                      }}
                    >
                      >
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    teachers: state.Teachers
  };
};

export default connect(
  mapStateToProps,
  {
    createTeacher,
    updateTeacher,
    swapTeacher,
    deleteTeacher
  }
)(Teachers);
