import React from "react";

import { connect } from "react-redux";

const DisplayTable = ({ tables }) => {
  return <div className="display-table">Display Table</div>;
};

const mapStateToProps = state => {
  return {
    tables: state.TableList
  };
};

export default connect(mapStateToProps)(DisplayTable);
