import React, { Component } from "react";

export class Form extends Component {
  state = {};
  onFormSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };
  render() {
    const modifiedChildren = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        updateForm: (name, value) => {
          let state = {};
          state[name] = value;
          this.setState(state);
        }
      })
    );
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>{modifiedChildren}</form>
      </div>
    );
  }
}

export class Input extends Component {
  state = {
    name: this.props.name,
    value: ""
  };
  onChange = event => {
    this.setState({ value: event.target.value });
    this.props.updateForm(this.state.name, event.target.value);
  };
  componentDidMount() {
    if (this.props.type === "submit") {
      this.setState({ value: "Submit" });
    }
  }
  render() {
    return (
      <input
        name={this.props.name || "no-name"}
        type={this.props.type || "text"}
        onChange={this.onChange}
        value={this.state.value}
      />
    );
  }
}
