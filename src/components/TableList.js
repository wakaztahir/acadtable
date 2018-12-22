import React from "react";
import { connect } from "react-redux";

const TableList = () => {};

const mapStateToProps = state => {
  console.log(state);
};

export default connect(mapStateToProps)(TableList);
