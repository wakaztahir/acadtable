import React, { Component } from "react";

import { connect } from "react-redux";

import {
  createBatch,
  updateBatch,
  swapBatch,
  deleteBatch
} from "../../actions";

class Batches extends Component {
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
              this.props.createBatch({ name: this.state.creator.name });
            } else {
              this.props.updateBatch(this.state.creator.id, {
                name: this.state.creator.name
              });
            }
            this.setState({
              creator: { id: null, name: null, mode: "create" }
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
        <div style={{ margin: "1rem" }}>{this.creator()}</div>
        <div className="block-list">
          {this.props.batches.map((batch, index) => {
            return (
              <div key={batch.id} className="block">
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
    deleteBatch
  }
)(Batches);
