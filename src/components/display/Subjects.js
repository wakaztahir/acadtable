import React, { Component } from "react";

import { connect } from "react-redux";

import {
  createSubject,
  updateSubject,
  swapSubject,
  deleteSubject
} from "../../actions";

class Subjects extends Component {
  state = {
    display: "main",
    creator: {
      id: null,
      name: null,
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
              this.props.createSubject({ name: this.state.creator.name });
            } else {
              this.props.updateSubject(this.state.creator.id, {
                name: this.state.creator.name
              });
            }
            this.setState({ display: "main" });
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
            Create A Subject
          </button>
        </div>
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
                        display: "create",
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