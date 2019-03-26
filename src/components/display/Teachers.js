import React, { Component } from "react";

import { connect } from "react-redux";

import {
  createTeacher,
  updateTeacher,
  swapTeacher,
  deleteTeacher
} from "../../actions";

import { TEACHER_COLOR } from "../../actions/helpers";

import ColorsPanel from "../others/ColorsPanel";

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
              this.props.createTeacher({
                name: this.state.creator.name,
                color: this.state.creator.color
              });
            } else {
              this.props.updateTeacher(this.state.creator.id, {
                name: this.state.creator.name,
                color: this.state.creator.color
              });
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
      <div>
        <h1>Teachers</h1>
        <div style={{ margin: "1rem" }}>{this.creator()}</div>
        <div className="block-list">
          {this.props.teachers.map((teacher, index) => {
            return (
              <div
                key={teacher.id}
                className="block"
                style={{ background: teacher.color }}
              >
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
    deleteTeacher
  }
)(Teachers);
