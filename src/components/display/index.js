import React, { Component } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Welcome from "./Welcome";

import {
  selectTableById,
  createBlock,
  createBatch,
  createDay,
  createTime,
  createPlace,
  createSubject,
  createTeacher
} from "../../actions";

class Display extends Component {
  welcomeMessage() {
    return <Welcome />;
  }
  nothingSelected() {
    if (this.props.list.length === 1) {
      this.props.select(this.props.list[0].id);
    }
    return (
      <div>
        <span>You have't selected a table</span>
        <br />
        <Link to="/tables">Click Here</Link>
      </div>
    );
  }
  screen() {
    //Tables , Rows , Columns : Table Items
    let tables = this.props.days;
    let rows = this.props.places;
    let cols = this.props.times;
    //Blocks , Subjects , Teachers : Info Containers
    let blocks = this.props.blocks;
    let subjects = this.props.subjects;
    let teachers = this.props.teachers;
    //Whats in the tables,rows,columns
    let TablesBlockKey = "day";
    let RowsBlockKey = "place";
    let ColsBlockKey = "time";

    // tables = [
    //   { no: 1, text: "Monday" },
    //   { no: 2, text: "Tuesday" },
    //   { no: 3, text: "Wednesday" }
    // ];
    // rows = [
    //   { no: 1, text: "Room 1" },
    //   { no: 2, text: "Room 2" },
    //   { no: 3, text: "Room 3" }
    // ];
    // cols = [
    //   { no: 1, text: "8:00" },
    //   { no: 2, text: "9:00" },
    //   { no: 3, text: "10:00" }
    // ];
    // subjects = [
    //   { no: 1, text: "Functional English" },
    //   { no: 2, text: "Basic Electronics" },
    //   { no: 3, text: "Thomas Calculus" }
    // ];
    // teachers = [
    //   { no: 1, text: "Mr Nadeed" },
    //   { no: 2, text: "Mis Sabiha" },
    //   { no: 3, text: "Thomas Himself" }
    // ];

    //Default Display if there is no default display available
    if (tables.length === 0) {
      tables[0] = {
        no: 1,
        text: TablesBlockKey + "1"
      };
    }
    if (rows.length === 0) {
      rows[0] = {
        no: 1,
        text: RowsBlockKey + "1"
      };
    }
    if (cols.length === 0) {
      cols[0] = {
        no: 1,
        text: ColsBlockKey + "1"
      };
    }

    const userCreate = (x, userParams) => {
      switch (x) {
        case "block":
        default:
          let params = {
            batch: 0,
            day: 0,
            time: 0,
            subject: 0,
            teacher: 0,
            text: "block"
          };
          Object.assign(params, userParams);
          this.props.createBlock(this.props.selected.id, params);
          break;
        case "batch":
          this.props.createBatch(this.props.selected.id, {
            text: "batch"
          });
          break;
        case "day":
          this.props.createDay(this.props.selected.id, {
            text: "day"
          });
          break;
        case "time":
          this.props.createTime(this.props.selected.id, {
            text: "time"
          });
          break;
        case "place":
          this.props.createPlace(this.props.selected.id, {
            text: "place"
          });
          break;
        case "subject":
          this.props.createSubject(this.props.selected.id, {
            text: "subject"
          });
          break;
        case "teacher":
          this.props.createTeacher(this.props.selected.id, {
            text: "teacher"
          });
          break;
      }
    };

    const AllTables = () => {
      return tables.map(table => {
        return (
          <div key={"t" + table.no}>
            <table>
              <thead>
                <tr>
                  <td>{table.text}</td>
                  {cols.map(col => {
                    return <td key={"c" + col.no}>{col.text}</td>;
                  })}
                  <td
                    onClick={() => {
                      userCreate(ColsBlockKey);
                    }}
                  >
                    +
                  </td>
                </tr>
              </thead>
              <tbody>
                {rows.map(row => {
                  return (
                    <tr key={"r" + row.no}>
                      <td>{row.text}</td>
                      {cols.map(col => {
                        let block = blocks.filter(
                          block =>
                            block[TablesBlockKey] === table.no &&
                            block[RowsBlockKey] === row.no &&
                            block[ColsBlockKey] === col.no
                        );
                        if (block.length === 0) {
                          return (
                            <td
                              onClick={() => {
                                let params = {};
                                params[TablesBlockKey] = table.no;
                                params[RowsBlockKey] = row.no;
                                params[ColsBlockKey] = col.no;
                                userCreate("block", params);
                              }}
                              key={"b" + col.no}
                            >
                              +
                            </td>
                          );
                        } else {
                          return <td key={"b" + col.no}>{block[0].text}</td>;
                        }
                      })}
                    </tr>
                  );
                })}
                <tr>
                  <td
                    onClick={() => {
                      userCreate(RowsBlockKey);
                    }}
                  >
                    +
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={() => {
                userCreate(TablesBlockKey);
              }}
            >
              +
            </button>
          </div>
        );
      });
    };

    return (
      <div>
        <h1>Acadtable</h1>
        <AllTables />
      </div>
    );
  }
  render() {
    if (this.props.list.length === 0) {
      return this.welcomeMessage();
    } else if (this.props.selected === null) {
      return this.nothingSelected();
    }

    return this.screen();
  }
}

const mapStateToProps = state => {
  return {
    list: state.TablesList,
    selected: state.SelectedTable,
    places: state.PlacesList,
    days: state.DaysList,
    times: state.TimesList,
    blocks: state.BlocksList,
    batches: state.BatchesList,
    subjects: state.SubjectsList,
    teachers: state.TeachersList
  };
};

export default connect(
  mapStateToProps,
  {
    createBlock,
    createBatch,
    createDay,
    createTime,
    createPlace,
    createTeacher,
    createSubject,
    select: selectTableById
  }
)(Display);
