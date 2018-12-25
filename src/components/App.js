import React from "react";
import TableList from "./TableList";
import UserMenu from "./UserMenu";
import DisplayTable from "./DisplayTable";
import Modal from "./Modal";

import { connect } from "react-redux";

class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <UserMenu />
        <div className="horizontal-wrapper">
          <div className="table-list">
            <h1 className="g-head">Table List</h1>
            <TableList />
          </div>
          <DisplayTable />
        </div>
        <Modal display={this.props.ModalDisplay}>
          {this.props.ModalContent}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ModalDisplay: state.Modal.display,
    ModalContent: state.Modal.content
  };
};

export default connect(mapStateToProps)(App);
