import React, { Component } from "react";

import { connect } from "react-redux";

import Welcome from "./Welcome";

import {
  selectCollection,
  createBlock,
  createBatch,
  createDay,
  createTime,
  createPlace,
  createSubject,
  createTeacher
} from "../../actions";

class Display extends Component {
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
    //   { number: 1, text: "Monday" },
    //   { number: 2, text: "Tuesday" },
    //   { number: 3, text: "Wednesday" }
    // ];
    // rows = [
    //   { number: 1, text: "Room 1" },
    //   { number: 2, text: "Room 2" },
    //   { number: 3, text: "Room 3" }
    // ];
    // cols = [
    //   { number: 1, text: "8:00" },
    //   { number: 2, text: "9:00" },
    //   { number: 3, text: "10:00" }
    // ];
    // subjects = [
    //   { number: 1, text: "Functional English" },
    //   { number: 2, text: "Basic Electronics" },
    //   { number: 3, text: "Thomas Calculus" }
    // ];
    // teachers = [
    //   { number: 1, text: "Mr Nadeed" },
    //   { number: 2, text: "Mis Sabiha" },
    //   { number: 3, text: "Thomas Himself" }
    // ];

    //Default Display if there is no default display available
    // if (tables.length === 0) {
    //   tables[0] = {
    //     number: 1,
    //     text: TablesBlockKey + "1"
    //   };
    // }
    // if (rows.length === 0) {
    //   rows[0] = {
    //     number: 1,
    //     text: RowsBlockKey + "1"
    //   };
    // }
    // if (cols.length === 0) {
    //   cols[0] = {
    //     number: 1,
    //     text: ColsBlockKey + "1"
    //   };
    // }

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
            name: "batch"
          });
          break;
        case "day":
          this.props.createDay(this.props.selected.id, {
            name: "day"
          });
          break;
        case "time":
          this.props.createTime(this.props.selected.id, {
            name: "time"
          });
          break;
        case "place":
          this.props.createPlace(this.props.selected.id, {
            name: "place"
          });
          break;
        case "subject":
          this.props.createSubject(this.props.selected.id, {
            name: "subject"
          });
          break;
        case "teacher":
          this.props.createTeacher(this.props.selected.id, {
            name: "teacher"
          });
          break;
      }
    };

    const Tables = () => {
      return tables.map(table => {
        return (
          <div key={"t" + table.number}>
            <table>
              <thead>
                <tr>
                  <td>{table.name}</td>
                  {cols.map(col => {
                    return <td key={"c" + col.number}>{col.name}</td>;
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
                    <tr key={"r" + row.number}>
                      <td>{row.name}</td>
                      {cols.map(col => {
                        let block = blocks.filter(
                          block =>
                            block[TablesBlockKey] === table.number &&
                            block[RowsBlockKey] === row.number &&
                            block[ColsBlockKey] === col.number
                        );
                        if (block.length === 0) {
                          return (
                            <td
                              onClick={() => {
                                let params = {};
                                params[TablesBlockKey] = table.number;
                                params[RowsBlockKey] = row.number;
                                params[ColsBlockKey] = col.number;
                                userCreate("block", params);
                              }}
                              key={"b" + col.number}
                            >
                              +
                            </td>
                          );
                        } else {
                          return (
                            <td key={"b" + col.number}>{block[0].text}</td>
                          );
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
        <Tables />
      </div>
    );
  }
  render() {
    if (this.props.collections.length === 0) {
      return <Welcome />;
    } else if (this.props.selected === null) {
      return (
        <div>
          <span>Please select a collection</span>
        </div>
      );
    }

    return this.screen();
  }
}

const mapStateToProps = state => {
  return {
    collections: state.CollectionsList,
    selected: state.SelectedCollection,
    tables: state.TablesList,
    days: state.DaysList,
    places: state.PlacesList,
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
    selectCollection
  }
)(Display);
