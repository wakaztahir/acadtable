import React from "react";

import { connect } from "react-redux";

import {} from "../actions/UserActions";

const UserMenu = ({ tables }) => {
  return (
    <div className="user-menu">
      <div className="user-menu-buttons">
        <button>Create Table</button>
        <button>Import Table</button>
        <button>Table Options</button>
        <button>Settings</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    tables: state.TableList
  };
};

export default connect(mapStateToProps)(UserMenu);
