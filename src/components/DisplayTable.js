import React from "react";

import { connect } from "react-redux";

const DisplayTable = selected => {
  return <div className="display-table">{JSON.stringify(selected)}</div>;
};

const mapStateToProps = state => {
  console.log(state);
  return {
    table: state.table.current
  };
};

export default connect(mapStateToProps)(DisplayTable);
