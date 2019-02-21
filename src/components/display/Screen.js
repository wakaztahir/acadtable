import React, { Component } from "react";

import { connect } from "react-redux";

import { listKey } from "../../actions/helpers";

class Screen extends Component {
  render() {
    let objector = {
      tables: this.props.tables,
      lectures: this.props.lectures,
      batches: this.props.batches,
      days: this.props.days,
      times: this.props.times,
      places: this.props.places,
      subjects: this.props.subjects,
      teachers: this.props.teachers
    };
    return objector.tables.map(table => {
      let base = objector[table.base].filter(i => i.id === table.baseValue)[0];
      let rows = objector[table.rows];
      let cols = objector[table.cols];
      return (
        <div key={table.id}>
          <table>
            <thead>
              <tr>
                <td>{base != null ? base.name : null}</td>
                {cols.map(col => {
                  return <td key={"c" + col.id}>{col.name}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map(row => {
                return (
                  <tr key={"r" + row.id}>
                    <td>{row.name}</td>
                    {cols.map(col => {
                      let block = objector["lectures"].filter(
                        block =>
                          block[listKey(table.base)] === base.id &&
                          block[listKey(table.rows)] === row.id &&
                          block[listKey(table.cols)] === col.id
                      );
                      if (block.length === 0) {
                        // if (this.state.mode === "print") {
                        //   return <td key={"emp" + col.id} />;
                        // }
                        return (
                          <td
                            onClick={() => {
                              let params = {};
                              params[listKey(table.base)] = base.id;
                              params[listKey(table.rows)] = row.id;
                              params[listKey(table.cols)] = col.id;
                              this.props.displayAddModal(params);
                            }}
                            key={"b" + col.id}
                          >
                            <button>+</button>
                          </td>
                        );
                      } else {
                        return (
                          <td key={"b" + col.id} className="table-block">
                            {block[0].name}
                          </td>
                        );
                      }
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    });
  }
}

const mapStateToProps = state => {
  return {
    tables: state.Tables,
    lectures: state.Lectures,
    batches: state.Batches,
    days: state.Days,
    times: state.Times,
    places: state.Places,
    subjects: state.Subjects,
    teachers: state.Teachers
  };
};

export default connect(mapStateToProps)(Screen);
