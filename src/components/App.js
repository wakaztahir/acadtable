import React from "react";
import TableList from "./TableList";
import UserMenu from "./UserMenu";
import DisplayTable from "./DisplayTable";
import Modal from "./Modal";

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
        <Modal disabled={true} />
      </div>
    );
  }
}

export default App;
