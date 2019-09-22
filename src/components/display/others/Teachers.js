import React, { Component } from "react";

import { connect } from "react-redux";

import {
  createTeacher,
  updateTeacher,
  swapTeacher,
  deleteTeacher,
  showModal
} from "../../../actions";

import { TEACHER_COLOR, teacherValidator } from "../../../actions/helpers";

import ColorsPanel from "../../modals/ColorsPanel";

const DefaultCreator = {
  id: null,
  name: null,
  color: TEACHER_COLOR,
  mode: "create"
};

class Teachers extends Component {
  state = {
    display: "main",
    creator: DefaultCreator
  };
  componentWillUnmount() {
    this.props.user.save();
  }
  creator() {
    return (
      <div>
        <form
          onSubmit={event => {
            event.preventDefault();
            if (this.state.creator.mode === "create") {
              let teacher = {
                name: this.state.creator.name,
                color: this.state.creator.color
              };
              let validator = teacherValidator(
                this.props.teachers,
                teacher,
                teacher
              );
              if (validator.value) {
                this.props.createTeacher(teacher);
              } else {
                this.props.showModal("message", validator.message);
              }
            } else {
              let teacher = {
                name: this.state.creator.name,
                color: this.state.creator.color
              };
              let validator = teacherValidator(
                this.props.teachers,
                teacher,
                teacher
              );
              if (validator.value) {
                this.props.updateTeacher(this.state.creator.id, teacher);
              } else {
                this.props.showModal("message", validator.message);
              }
            }
            this.setState({
              creator: DefaultCreator
            });
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
            <label htmlFor="">Color </label>
            <ColorsPanel
              color={this.state.creator.color}
              change={color => {
                this.setState({ creator: { ...this.state.creator, color } });
              }}
            />
          </div>
          <div className="form-row">
            <div />
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
    return (
      <div style={{ marginBottom: "50px" }}>
        <h1>Create Teacher</h1>
        <div style={{ margin: "1rem" }}>{this.creator()}</div>

        <div className="table-list">
          <h1>Teachers List</h1>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Move</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {this.props.teachers.map((teacher, index) => {
                return (
                  <tr key={teacher.id}>
                    <td>
                      <span>{teacher.name}</span>
                    </td>
                    <td>
                      <div className="btn-container">
                        {index === 0 ? null : (
                          <button
                            onClick={() => {
                              this.props.swapTeacher(
                                teacher.id,
                                this.props.teachers[index - 1].id
                              );
                            }}
                          >
                            Up
                          </button>
                        )}
                        {index === this.props.teachers.length - 1 ? null : (
                          <button
                            onClick={() => {
                              this.props.swapTeacher(
                                teacher.id,
                                this.props.teachers[index + 1].id
                              );
                            }}
                          >
                            Down
                          </button>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="btn-container">
                        <button
                          onClick={() => {
                            this.setState({
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
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.User,
    teachers: state.Teachers
  };
};

export default connect(
  mapStateToProps,
  {
    createTeacher,
    updateTeacher,
    swapTeacher,
    deleteTeacher,
    showModal
  }
)(Teachers);
