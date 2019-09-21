import React, { Component } from "react";

import { connect } from "react-redux";

import {
  createSubject,
  updateSubject,
  swapSubject,
  deleteSubject,
  showModal
} from "../../../actions";

import { SUBJECT_COLOR, subjectValidator } from "../../../actions/helpers";

import ColorsPanel from "../../modals/ColorsPanel";

const DefaultCreator = {
  id: null,
  name: null,
  color: SUBJECT_COLOR,
  mode: "create"
};

class Subjects extends Component {
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
              let subject = {
                name: this.state.creator.name,
                color: this.state.creator.color
              };
              let validator = subjectValidator(this.props.subjects, subject);
              if (validator.value) {
                this.props.createSubject(subject);
              } else {
                this.props.showModal("message", validator.message);
              }
            } else {
              let subject = {
                name: this.state.creator.name,
                color: this.state.creator.color
              };
              let validator = subjectValidator(
                this.props.subjects,
                subject,
                subject
              );
              if (validator.value) {
                this.props.updateSubject(this.state.creator.id, subject);
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
            <label htmlFor="name">Subject Name &nbsp;</label>
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
        <h1>Create Subject</h1>
        <div style={{ margin: "1rem" }}>{this.creator()}</div>

        <div className="table-list">
          <h1>Subjects List</h1>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Move</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {this.props.subjects.map((subject, index) => {
                return (
                  <tr>
                    <td>
                      <span>{subject.name}</span>
                    </td>
                    <td>
                      <div className="btn-container">
                        {index === 0 ? null : (
                          <button
                            onClick={() => {
                              this.props.swapSubject(
                                subject.id,
                                this.props.subjects[index - 1].id
                              );
                            }}
                          >
                            Up
                          </button>
                        )}
                        {index === this.props.subjects.length - 1 ? null : (
                          <button
                            onClick={() => {
                              this.props.swapSubject(
                                subject.id,
                                this.props.subjects[index + 1].id
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
                                ...subject,
                                mode: "update"
                              }
                            });
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            this.props.deleteSubject(subject.id);
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
    subjects: state.Subjects
  };
};

export default connect(
  mapStateToProps,
  {
    createSubject,
    updateSubject,
    swapSubject,
    deleteSubject,
    showModal
  }
)(Subjects);
