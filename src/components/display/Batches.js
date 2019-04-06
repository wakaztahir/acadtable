import React, { Component } from "react";

import { connect } from "react-redux";

import {
  createBatch,
  updateBatch,
  swapBatch,
  deleteBatch,
  showModal
} from "../../actions";

import { BATCH_COLOR, batchValidator } from "../../actions/helpers";

import ColorsPanel from "../others/ColorsPanel";

const DefaultCreator = {
  id: null,
  name: null,
  color: BATCH_COLOR,
  mode: "create"
};

class Batches extends Component {
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
        <h1>Batches</h1>
        <form
          onSubmit={event => {
            event.preventDefault();
            if (this.state.creator.mode === "create") {
              let batch = {
                name: this.state.creator.name,
                color: this.state.creator.color
              };
              let validator = batchValidator(this.props.batches, batch);
              if (validator.value) {
                this.props.createBatch(batch);
              } else {
                this.props.showModal("message", validator.message);
              }
            } else {
              let batch = {
                name: this.state.creator.name,
                color: this.state.creator.color
              };
              let validator = batchValidator(this.props.batches, batch);
              if (validator.value) {
                this.props.updateBatch(this.state.creator.id, batch);
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
            <label htmlFor="name">Batch Name &nbsp;</label>
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
    if (this.state.display === "create") {
      return this.creator();
    }
    return (
      <div>
        <div style={{ margin: "1rem" }}>{this.creator()}</div>
        <div className="block-list">
          {this.props.batches.map((batch, index) => {
            return (
              <div
                key={batch.id}
                className="block"
                style={{
                  background:
                    batch.color === "transparent"
                      ? "rgb(179, 178, 178)"
                      : batch.color
                }}
              >
                <div className="block-txt">
                  <span>{batch.name}</span>
                </div>
                <div className="block-btns">
                  {index === 0 ? null : (
                    <button
                      onClick={() => {
                        this.props.swapBatch(
                          batch.id,
                          this.props.batches[index - 1].id
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
                          ...batch,
                          mode: "update"
                        }
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      this.props.deleteBatch(batch.id);
                    }}
                  >
                    Delete
                  </button>
                  {index === this.props.batches.length - 1 ? null : (
                    <button
                      onClick={() => {
                        this.props.swapBatch(
                          batch.id,
                          this.props.batches[index + 1].id
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
    batches: state.Batches
  };
};

export default connect(
  mapStateToProps,
  {
    createBatch,
    updateBatch,
    swapBatch,
    deleteBatch,
    showModal
  }
)(Batches);
