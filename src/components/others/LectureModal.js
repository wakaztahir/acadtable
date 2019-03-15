import React, { Component } from "react";

import { connect } from "react-redux";

import { unshowModal, createLecture } from "../../actions/";
import { keyList } from "../../actions/helpers";

class LectureModal extends Component {
  state = {
    params: this.props.params
  };
  render() {
    let params = this.props.params;
    let info = {
      day: null,
      time: null,
      place: null,
      batch: null,
      subject: null,
      teacher: null,
      ...params
    };
    return (
      <div className="full-wrapper">
        <form
          className="full-wrapper form-table flex-center"
          onSubmit={e => {
            e.preventDefault();
            let i = 0;
            while (e.target[i] != null) {
              if (e.target[i].name != null || e.target[i].name !== "") {
                info[e.target[i].name] = e.target[i].value;
                i++;
              } else {
                break;
              }
            }
            if (this.props.mode === "create") {
              this.props.createLecture(info);
              this.props.unshowModal();
            } else if (this.props.mode === "update") {
              this.props.updateLecture(this.props.id, info);
            }
          }}
        >
          {Object.keys(info).map(key => {
            let list = this.props[keyList(key)];
            let value = params[key] != null ? params[key] : null;
            if (value == null) {
              return (
                <div key={"inp" + key} className="form-row ">
                  <label htmlFor={key} style={{ textTransform: "capitalize" }}>
                    {key} &nbsp;
                  </label>
                  <select
                    id={key}
                    name={key}
                    defaultValue={list.length > 0 ? list[0].id : null}
                  >
                    {list.map(item => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              );
            } else {
              return null;
            }
          })}
          <div className="form-row">
            <label>
              <button onClick={this.props.unshowModal}>Cancel</button>
            </label>
            <input
              type="submit"
              style={{ textTransform: "capitalize" }}
              value={this.props.mode || "create"}
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    days: state.Days,
    times: state.Times,
    places: state.Places,
    batches: state.Batches,
    subjects: state.Subjects,
    teachers: state.Teachers
  };
};

export default connect(
  mapStateToProps,
  { createLecture, unshowModal }
)(LectureModal);
