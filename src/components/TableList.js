import React from "react";

import { connect } from "react-redux";

const TableList = ({ tables }) => {
  return tables.map(table => {
    return (
      <div className="table-item" key={table.id}>
        <span>{table.name}</span>
        <div className="table-item-buttons">
          <button>show</button>
          <button>edit</button>
          <button>rename</button>
          <button>delete</button>
          <button>export</button>
        </div>
      </div>
    );
  });
};

const mapStateToProps = state => {
  return {
    tables: state.TableList
  };
};

export default connect(mapStateToProps)(TableList);
