import React, { Component } from "react";

import { connect } from "react-redux";

class AddBatches extends Component {
  render() {
    if (this.props.batches.length === 0) {
      return (
        <div>
          You have't created any batches , Please create batches and add them to
          the table of your choice.
        </div>
      );
    }
    return <div>You have no batches in the selected table</div>;
  }
}

const mapStateToProps = state => {
  return {
    batches: state.BatchList
  };
};

export default connect(mapStateToProps)(AddBatches);
