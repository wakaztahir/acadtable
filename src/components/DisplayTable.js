import React from "react";

import { connect } from "react-redux";

const DisplayTable = selected => {
  return <div className="display-table">{JSON.stringify(selected)}</div>;
};

const mapStateToProps = state => {
  return {
    table: state.table.selected
  };
};

export default connect(mapStateToProps)(DisplayTable);
