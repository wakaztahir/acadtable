import React, { Component } from "react";

import { connect } from "react-redux";

import {
  createCollection,
  selectCollection,
  exampleCollection,
  copyCollection,
  deleteCollection
} from "../actions";

import "../resources/welcome.css";

class Welcome extends Component {
  state = {
    ftDisplay: null,
    collectionName: "",
    collectionDesc: ""
  };
  displayCreate() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({ ftDisplay: null });
          }}
        >
          Back
        </button>
        <form
          onSubmit={event => {
            event.preventDefault();
            this.props.createCollection({
              name: this.state.collectionName,
              desc: this.state.collectionDesc
            });
            this.setState({ ftDisplay: null });
          }}
        >
          <div className="welcome-dialogue form-table">
            <div className="form-row">
              <label htmlFor="cName" className="big-label">
                Collection Name
              </label>
              <input
                id="cName"
                type="text"
                onChange={event =>
                  this.setState({ collectionName: event.target.value })
                }
                value={this.state.collectionName}
                className="big-input"
                placeholder="my first collection..."
                required={true}
              />
            </div>
            <div className="form-row">
              <label htmlFor="desc" className="big-label">
                Description
              </label>
              <textarea
                id="cdesc"
                className="big-desc"
                onChange={event => {
                  this.setState({ collectionDesc: event.target.value });
                }}
                value={this.state.collectionDesc}
                placeholder="this is the best collection ever..."
              />
            </div>
            <div className="form-row">
              <span />
              <input type="submit" value="Create" className="big-btn" />
            </div>
          </div>
        </form>
      </div>
    );
  }

  firstTime() {
    if (this.state.ftDisplay === "create") {
      return this.displayCreate();
    } else if (this.state.ftDisplay === "quickSetup") {
      return <div />;
    }
    return (
      <div>
        <h2>Looks like its your first time visiting acadtable.</h2>
        <div className="welcome-buttons">
          <button
            onClick={() => {
              this.setState({ ftDisplay: "create" });
            }}
          >
            Create A Collection
          </button>
          <span className="info">
            <span>Do everything from scratch</span>
          </span>
          <br />
          <br />

          <button
            onClick={() => {
              this.setState({ ftDisplay: "quickSetup" });
            }}
            disabled={true}
          >
            Quick Setup
          </button>
          <span className="info">
            <span>Quick setup to build tables (recommended)</span>
          </span>
          <br />
          <br />
          <button onClick={this.props.exampleCollection}>
            Load An Example
          </button>
          <span className="info">
            <span>Load an example , premade collection</span>
          </span>
        </div>
      </div>
    );
  }
  screen() {
    if (this.state.ftDisplay === "create") {
      return this.displayCreate();
    }
    return (
      <div className="wrapper">
        <div className="screen-header">
          <div className="welcome-buttons">
            <button
              onClick={() => {
                this.setState({
                  ftDisplay: "create",
                  collectionName: "",
                  collectionDesc: ""
                });
              }}
            >
              Create Another Collection
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
                <div className="card-btns">
                  <button onClick={() => this.props.selectCollection(coll.id)}>
                    Select
                  </button>
                  <button onClick={() => this.props.copyCollection(coll.id)}>
                    Copy
                  </button>
                  <button onClick={() => this.props.deleteCollection(coll.id)}>
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
    deleteCollection
  }
)(Welcome);
