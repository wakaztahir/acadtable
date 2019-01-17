import React, { Component } from "react";

class CreateTable extends Component {
  state = {
    form: {
      name: ""
    }
  };
  handleSubmit = event => {
    event.preventDefault();

    this.props.action(this.state.form);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="row-block">
        <label htmlFor="name" className="item">
          Table Name :
        </label>
        <input
          type="text"
          name="name"
          className="item"
          value={this.state.form.name}
          onChange={e => {
            this.setState({
              form: {
                name: e.target.value
              }
            });
          }}
        />
        <input type="submit" className="item" />
        <button onClick={this.props.cancel} className="item">
          Cancel
        </button>
      </form>
    );
  }
}

export default CreateTable;
