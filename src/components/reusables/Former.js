import React, { Component } from "react";

function Former(name) {
  const values = {};
  const FormSubmit = (event, onSubmit = () => {}) => {
    event.preventDefault();

    onSubmit(values);
  };
  const Form = props => {
    return (
      <form
        onSubmit={event => {
          FormSubmit(event, props.onSubmit);
        }}
      >
        {props.children}
      </form>
    );
  };
  const formProps = {
    onChange: function(name, value) {
      if (name !== undefined) {
        values[name] = value;
      }
    }
  };
  return {
    Form,
    formProps
  };
}

export class Input extends Component {
  state = {
    name: this.props.name,
    value: this.props.value || ""
  };
  change = event => {
    this.setState({
      name: this.props.name,
      value: event.target.value
    });
    this.props.onChange(this.props.name, event.target.value);
  };
  componentDidMount() {
    this.props.onChange(this.state.name, this.state.value);
  }
  render() {
    return (
      <input
        type={this.props.type || "text"}
        name={this.props.name}
        onChange={this.change}
        value={this.state.value}
        className={this.props.className || null}
      />
    );
  }
}
export default Former;
