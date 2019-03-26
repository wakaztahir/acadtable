import React, { Component } from "react";

import { connect } from "react-redux";

import {
  createPlace,
  updatePlace,
  swapPlace,
  deletePlace
} from "../../actions";

import { PLACE_COLOR } from "../../actions/helpers";

import ColorsPanel from "../others/ColorsPanel";

const DefaultCreator = {
  id: null,
  name: null,
  color: PLACE_COLOR,
  mode: "create"
};

const DefaultQuicker = {
  name: "Room",
  from: "1",
  to: "10",
  color: PLACE_COLOR
};

class Places extends Component {
  state = {
    display: "main",
    creator: DefaultCreator,
    quicker: DefaultQuicker
  };
  componentWillUnmount() {
    this.props.user.save();
  }
  quicker() {
    return (
      <div>
        <h1>Places</h1>
        <div className="full-wrapper flex-center">
          <h2>How many Rooms/Places in which lectures are held ?</h2>
          <div className="form-table">
            <div className="form-row">
              <label htmlFor="name">Place Name : </label>
              <input
                type="text"
                value={this.state.quicker.name}
                onChange={x =>
                  this.setState({
                    quicker: { ...this.state.quicker, name: x.target.value }
                  })
                }
              />
            </div>
            <div className="form-row">
              <label htmlFor="roomfrom">From (room/place no)</label>
              <input
                type="text"
                value={this.state.quicker.from}
                onChange={x =>
                  this.setState({
                    quicker: { ...this.state.quicker, from: x.target.value }
                  })
                }
              />
            </div>
            <div className="form-row">
              <label htmlFor="roomfrom">To (room/place no)</label>
              <input
                type="text"
                value={this.state.quicker.to}
                onChange={x =>
                  this.setState({
                    quicker: { ...this.state.quicker, to: x.target.value }
                  })
                }
              />
            </div>
            <div className="form-row">
              <label htmlFor="">Color </label>
              <ColorsPanel
                color={this.state.quicker.color}
                change={color => {
                  this.setState({ quicker: { ...this.state.quicker, color } });
                }}
              />
            </div>
            <br />
          </div>
          <div>
            <button onClick={() => this.setState({ display: "main" })}>
              Cancel
            </button>
            &nbsp;
            <button
              onClick={() => {
                let places = [];
                for (
                  let i = parseInt(this.state.quicker.from);
                  i <= parseInt(this.state.quicker.to);
                  i++
                ) {
                  places.push(`${this.state.quicker.name} ${i}`);
                }
                places.forEach(place => {
                  this.props.createPlace({
                    name: place,
                    color: this.state.quicker.color
                  });
                });
                this.setState({ display: "main" });
              }}
              className="black-btn"
            >
              Create Places
            </button>
          </div>
        </div>
      </div>
    );
  }
  creator() {
    return (
      <div>
        <form
          onSubmit={event => {
            event.preventDefault();
            if (this.state.creator.mode === "create") {
              this.props.createPlace({
                name: this.state.creator.name,
                color: this.state.creator.color
              });
            } else {
              this.props.updatePlace(this.state.creator.id, {
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
            <label htmlFor="name">Place Name &nbsp;</label>
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
    if (this.state.display === "quick") {
      return this.quicker();
    }
    return (
      <div>
        <h1>Places</h1>
        <div style={{ margin: "1rem" }}>
          <button
            onClick={() => {
              this.setState({ display: "quick" });
            }}
          >
            Quick Places
          </button>
        </div>
        <div style={{ margin: "1rem" }}>{this.creator()}</div>
        <div className="block-list">
          {this.props.places.map((place, index) => {
            return (
              <div
                key={place.id}
                className="block"
                style={{ background: place.color }}
              >
                <div className="block-txt">
                  <span>{place.name}</span>
                </div>
                <div className="block-btns">
                  {index === 0 ? null : (
                    <button
                      onClick={() => {
                        this.props.swapPlace(
                          place.id,
                          this.props.places[index - 1].id
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
                          ...place,
                          mode: "update"
                        }
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      this.props.deletePlace(place.id);
                    }}
                  >
                    Delete
                  </button>
                  {index === this.props.places.length - 1 ? null : (
                    <button
                      onClick={() => {
                        this.props.swapPlace(
                          place.id,
                          this.props.places[index + 1].id
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
    places: state.Places
  };
};

export default connect(
  mapStateToProps,
  {
    createPlace,
    updatePlace,
    swapPlace,
    deletePlace
  }
)(Places);
