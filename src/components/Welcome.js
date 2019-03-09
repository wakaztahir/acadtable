import React, { Component } from "react";

import { connect } from "react-redux";

import {
  createCollection,
  selectCollection,
  exampleCollection,
  copyCollection,
  deleteCollection,
  showModal
} from "../actions";

import QuickSetup from "./QuickSetup";
import "../resources/welcome.css";

class Welcome extends Component {
  state = {
    ftDisplay: null
  };

  firstTime() {
    if (this.state.ftDisplay === "quickSetup") {
      return (
        <QuickSetup
          back={() => {
            this.setState({ ftDisplay: null });
          }}
        />
      );
    }
    return (
      <div>
        <h2>Looks like its your first time visiting acadtable.</h2>
        <div className="welcome-buttons">
          <button
            className="black-btn"
            onClick={() => {
              this.setState({ ftDisplay: "quickSetup" });
            }}
          >
            Create A Collection
          </button>
          <span className="info">
            <span>Runs quick setup to create a collection</span>
          </span>
          <br />
          <br />
          <button onClick={this.props.exampleCollection}>
            Load An Example
          </button>
        </div>
      </div>
    );
  }
  screen() {
    if (this.state.ftDisplay === "quickSetup") {
      return (
        <QuickSetup
          back={() => {
            this.setState({ ftDisplay: null });
          }}
        />
      );
    }
    return (
      <div className="wrapper">
        <div className="screen-header">
          <div className="welcome-buttons">
            <button
              onClick={() => {
                this.setState({
                  ftDisplay: "quickSetup"
                });
              }}
            >
              Create Another Collection
            </button>
            &nbsp;
            <button onClick={this.props.exampleCollection}>
              Reload Example
            </button>
          </div>
          <h2>Please select a collection to display</h2>
        </div>
        <div className="cards-container">
          {this.props.collections.map(coll => {
            return (
              <div className="card-item" key={coll.id}>
                <div className="card-heading">
                  {coll.name.length > 40
                    ? coll.name.substr(0, 40) + "..."
                    : coll.name}
                </div>
                <div className="card-desc">
                  {coll.desc.length > 120
                    ? coll.desc.substr(0, 120) + "..."
                    : coll.desc}
                </div>
                <div className="card-head-special">#{coll.id}</div>
                <div className="card-special">{coll.time}</div>
                <div className="card-btns">
                  <button onClick={() => this.props.selectCollection(coll.id)}>
                    Select
                  </button>
                  <button onClick={() => this.props.copyCollection(coll.id)}>
                    Copy
                  </button>
                  <button
                    onClick={() => {
                      this.props.showModal("confirm", "Are you sure ?", [
                        () => {
                          this.props.deleteCollection(coll.id);
                        }
                      ]);
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
  render() {
    return (
      <div className="wrapper">
        <h1>
          {this.props.collections.length === 0
            ? "Welcome To Acadtable"
            : "Acadtable"}
        </h1>
        <div className="wrapper">
          {this.props.collections.length === 0
            ? this.firstTime()
            : this.screen()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    collections: state.Collections
  };
};

export default connect(
  mapStateToProps,
  {
    createCollection,
    selectCollection,
    copyCollection,
    exampleCollection,
    deleteCollection,
    showModal
  }
)(Welcome);
