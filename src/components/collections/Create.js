import React, { Component } from "react";

class CreateTable extends Component {
  state = {
    form: {
      name: ""
    }
  };
  handle = event => {
    event.preventDefault();
    this.props.submit(this.state.form);
  };
  render() {
    if (this.props.display === "form") {
      return (
        <form onSubmit={this.handle} className="row-block">
          <label htmlFor="name" className="item">
            {this.props.name} :
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
          <button
            onClick={() => {
              this.props.cancel();
            }}
            className="item"
          >
            Cancel
          </button>
        </form>
      );
    } else {
      return (
        <ul className="buttons-list">
          <li>
            <button onClick={this.props.click}>Create A Collection</button>
          </li>
        </ul>
      );
    }
  }
}

export default CreateTable;
