import React, { Component } from "react";

class EditTable extends Component {
  state = {
    form: {
      newname: this.props.name
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
          value={this.state.form.newname}
          onChange={e => {
            this.setState({
              form: {
                newname: e.target.value
              }
            });
          }}
        />
        <input type="submit" className="item" value="Save" />
        <button onClick={this.props.cancel} className="item">
          Cancel
        </button>
      </form>
    );
  }
}

export default EditTable;
