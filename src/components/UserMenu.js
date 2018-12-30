import React from "react";

import { connect } from "react-redux";

import { displayModal } from "../actions/CoreActions";

class UserMenu extends React.Component {
  createTableModal() {
    return (
      <div>
        <form>
          <label>Name : </label>
          <input type="text" />
          <input type="submit" />
        </form>
      </div>
    );
  }
  render() {
    return (
      <div className="user-menu">
        <div className="user-menu-buttons">
          <button
            onClick={() => {
              this.props.displayModal(true, this.createTableModal());
            }}
          >
            Create Table
          </button>
          <button>Import Table</button>
          <button>Table Options</button>
          <button>Settings</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tables: state.TableList
  };
};

export default connect(
  mapStateToProps,
  {
    displayModal
  }
)(UserMenu);
