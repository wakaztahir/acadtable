import React, { Component } from "react";

import { connect } from "react-redux";

import storage from "../../actions/storage";

import { createLecture, updateLecture, deleteLecture } from "../../actions";

class Lectures extends Component {
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
              this.props.createLecture({ name: this.state.creator.name });
            } else {
              this.props.updateLecture(this.state.creator.id, {
                name: this.state.creator.name
              });
            }
            this.setState({ display: "main" });
          }}
          className="form-table"
        >
          <div className="form-row">
            <label htmlFor="name">Lecture Name &nbsp;</label>
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
            Create A Lecture
          </button>
        </div>
        <div className="block-list">
          {this.props.lectures.map(lecture => {
            return (
              <div key={lecture.id} className="block">
                <div className="block-txt">
                  <span>
                    {
                      this.props.subjects.filter(
                        st => st.id === lecture.subject
                      )[0].name
                    }
                  </span>
                  <span>
                    {
                      this.props.batches.filter(
                        bh => bh.id === lecture.batch
                      )[0].name
                    }
                  </span>
                  <span>
                    {
                      this.props.teachers.filter(
                        tr => tr.id === lecture.teacher
                      )[0].name
                    }
                  </span>
                  <span>
                    {
                      this.props.times.filter(tm => tm.id === lecture.time)[0]
                        .name
                    }
                  </span>
                  <span>
                    {
                      this.props.places.filter(pc => pc.id === lecture.place)[0]
                        .name
                    }
                  </span>
                  <span>
                    {
                      this.props.days.filter(dy => dy.id === lecture.day)[0]
                        .name
                    }
                  </span>
                </div>
                <div className="block-btns">
                  <button
                    onClick={() => {
                      this.setState({
                        display: "create",
                        creator: {
                          ...this.state.creator,
                          ...lecture,
                          mode: "update"
                        }
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      this.props.deleteLecture(lecture.id);
                    }}
                  >
                    Delete
                  </button>
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
    lectures: state.Lectures,
    subjects: state.Subjects,
    places: state.Places,
    times: state.Times,
    teachers: state.Teachers,
    days: state.Days,
    batches: state.Batches
  };
};

export default connect(
  mapStateToProps,
  {
    createLecture,
    updateLecture,
    deleteLecture
  }
)(Lectures);
