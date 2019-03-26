import React, { Component } from "react";

import { connect } from "react-redux";

import {
  createSubject,
  updateSubject,
  swapSubject,
  deleteSubject
} from "../../actions";

import { SUBJECT_COLOR } from "../../actions/helpers";

import ColorsPanel from "../others/ColorsPanel";

class Subjects extends Component {
  state = {
    display: "main",
    creator: {
      id: null,
      name: null,
      color: SUBJECT_COLOR,
      mode: "create"
    }
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
              this.props.createSubject({
                name: this.state.creator.name,
                color: this.state.creator.color
              });
            } else {
              this.props.updateSubject(this.state.creator.id, {
                name: this.state.creator.name,
                color: this.state.creator.color
              });
            }
            this.setState({
              creator: {
                id: null,
                name: null,
                mode: "create"
              }
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
        <h1>Subjects</h1>
        <div style={{ margin: "1rem" }}>{this.creator()}</div>
        <div className="block-list">
          {this.props.subjects.map((subject, index) => {
            return (
              <div key={subject.id} className="block">
                <div className="block-txt">
                  <span>{subject.name}</span>
                </div>
                <div className="block-btns">
                  {index === 0 ? null : (
                    <button
                      onClick={() => {
                        this.props.swapSubject(
                          subject.id,
                          this.props.subjects[index - 1].id
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
                  {index === this.props.subjects.length - 1 ? null : (
                    <button
                      onClick={() => {
                        this.props.swapSubject(
                          subject.id,
                          this.props.subjects[index + 1].id
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
    subjects: state.Subjects
  };
};

export default connect(
  mapStateToProps,
  {
    createSubject,
    updateSubject,
    swapSubject,
    deleteSubject
  }
)(Subjects);
