import React from "react";

import { connect } from "react-redux";
class DisplayTable extends React.Component {
  render() {
    return (
      <div className="display-table">
        {JSON.stringify(this.props.selectedTable)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    table: state.selectedTable
  };
};

export default connect(mapStateToProps)(DisplayTable);
