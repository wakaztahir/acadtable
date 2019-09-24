import React, { Component } from "react";

import { connect } from "react-redux";

import {
  showModal,
  unshowMenu,
  deleteDay,
  deleteBatch,
  deleteTeacher,
  deleteTime,
  deletePlace,
  deleteSubject,
  deleteLecture,
  updateTable,
  updateDay,
  updateBatch,
  updateTeacher,
  updateTime,
  updatePlace,
  updateSubject,
  updateLecture,
  swapDay,
  swapBatch,
  swapTeacher,
  swapTime,
  swapPlace,
  swapSubject,
  swapTable
} from "../actions";

import AreaEditor from "./modals/AreaEditor";
import ObjectEditor from "./modals/ObjectEditor";
import LectureModal from "./modals/LectureModal";

import {
  reverse,
  keyList,
  listKey,
  lectureValidator,
  batchValidator,
  dayValidator,
  timeValidator,
  placeValidator,
  subjectValidator,
  teacherValidator
} from "../actions/helpers";

import "../resources/menu.css";

class Menu extends Component {
  editor(obj) {
    let tochange = obj.tochange;
    let area = reverse(obj.element.id);
    const switcher = (area, request) => {
      let req = this.props[
        `${request}${area[0].toUpperCase()}${listKey(area).substr(
          1,
          listKey(area).length
        )}`
      ];
      return req;
    };
    if (tochange !== null) {
      this.props.showModal(
        "content",
        <ObjectEditor
          element={obj.element}
          obj={obj.tochange}
          update={data => {
            switcher(keyList(area), "update")(obj.element.id, data);
          }}
          delete={null}
        />
      );
    } else if (tochange === null && area === "lecture") {
      let {
        rname,
        cname,
        rindex,
        rows,
        base,
        cols,
        cindex,
        tableBase,
        lecture
      } = obj.additional;
      let params = {};
      params[listKey(tableBase)] = base.id;
      params[listKey(rname)] = rows[rindex].id;
      params[listKey(cname)] = cols[cindex].id;
      let toEdit = ["day", "time", "place", "batch", "subject", "teacher"];
      toEdit = toEdit.filter(p => {
        if (Object.keys(params).indexOf(p) < 0) {
          return p;
        }
        return null;
      });
      params = { ...lecture, ...params };
      this.props.showModal(
        "content",
        <LectureModal params={params} edit={toEdit} mode="update" />
      );
    } else {
      this.props.showModal(
        "content",
        <AreaEditor
          element={obj.element}
          update={data => {
            let vals = {
              timeValidator,
              placeValidator,
              subjectValidator,
              teacherValidator,
              batchValidator,
              dayValidator
            };
            let validator = vals[area + "Validator"](
              this.props[keyList(area)],
              data,
              obj.element
            );
            if (validator.value) {
              switcher(keyList(area), "update")(obj.element.id, data);
            } else {
              console.log("what");
              this.props.showModal("content", validator.message);
            }
          }}
          delete={() => {
            switcher(keyList(area), "delete")(obj.element.id);
          }}
        />
      );
    }
  }
  move(direction, thing, way = null) {
    let mover = (man, range) => {
      let {
        rname,
        cname,
        rindex,
        rows,
        base,
        cols,
        cindex,
        lecture,
        tableBase
      } = way;
      let index, length;
      if (man === "row") {
        index = rindex + range;
        length = rows.length;
      } else {
        index = cindex + range;
        length = cols.length;
      }
      if (index > -1 && index < length) {
        let otherLecture = this.props.lectures.filter(
          block =>
            block[listKey(tableBase)] === base.id &&
            block[listKey(rname)] ===
              (man === "row" ? rows[rindex + range].id : rows[rindex].id) &&
            block[listKey(cname)] ===
              (man === "col" ? cols[cindex + range].id : cols[cindex].id)
        );

        if (otherLecture.length > 0) {
          otherLecture = {
            ...otherLecture[0],
            [listKey(man === "row" ? rname : cname)]:
              man === "row" ? rows[rindex].id : cols[cindex].id
          };
          let otherValidator = lectureValidator(
            this.props.lectures,
            otherLecture,
            lecture
          );
          if (otherValidator.value) {
            this.props.updateLecture(otherLecture.id, otherLecture);
            lecture = {
              ...lecture,
              [listKey(man === "row" ? rname : cname)]:
                man === "row"
                  ? rows[rindex + range].id
                  : cols[cindex + range].id
            };
            let validator = lectureValidator(
              this.props.lectures,
              lecture,
              otherLecture
            );
            if (validator.value) {
              this.props.updateLecture(lecture.id, lecture);
            } else {
              this.props.showModal("message", validator.message);
            }
          } else {
            this.props.showModal(
              "message",
              "2nd lecture error , " + otherValidator.message
            );
          }
        } else {
          lecture = {
            ...lecture,
            [listKey(man === "row" ? rname : cname)]:
              man === "row" ? rows[rindex + range].id : cols[cindex + range].id
          };
          this.props.updateLecture(lecture.id, lecture);
        }
      }
    };
    if (way === null) {
      switch (direction) {
        case "up":
          let key = reverse(thing.id);
          let list = this.props[keyList(key)];
          let index = list.indexOf(thing);
          if (index + 1 < list.length) {
            this.props[
              "swap" + key[0].toUpperCase() + key.substr(1, key.length)
            ](list[index].id, list[index + 1].id);
          }
          break;
        case "down":
          let key2 = reverse(thing.id);
          let list2 = this.props[keyList(key2)];
          let index2 = list2.indexOf(thing);
          if (index2 - 1 > -1) {
            this.props[
              "swap" + key2[0].toUpperCase() + key2.substr(1, key2.length)
            ](list2[index2].id, list2[index2 - 1].id);
          }
          break;
        default:
          return false;
      }
    } else {
      switch (direction) {
        case "up":
          mover("row", -1);
          break;
        case "down":
          mover("row", 1);
          break;
        case "left":
          mover("col", -1);
          break;
        case "right":
          mover("col", 1);
          break;
        default:
          return false;
      }
    }
  }
  delete(dealing, element) {
    this.props[
      "delete" + dealing[0].toUpperCase() + dealing.substr(1, dealing.length)
    ](element.id);
  }
  construct(obj) {
    let ele = obj.element;
    let dealing = reverse(ele.id);
    let menuItems = {};
    switch (dealing) {
      case "table":
        menuItems["Edit"] = () => {
          this.editor(obj);
        };
        break;
      case "lecture":
        menuItems["Edit"] = () => {
          this.editor(obj);
        };
        menuItems["Move Up"] = () => {
          this.move("up", "block", obj.additional);
        };
        menuItems["Move Down"] = () => {
          this.move("down", "block", obj.additional);
        };
        menuItems["Move Left"] = () => {
          this.move("left", "block", obj.additional);
        };
        menuItems["Move Right"] = () => {
          this.move("right", "block", obj.additional);
        };
        menuItems["Delete"] = () => {
          this.delete(dealing, obj.element);
        };
        break;
      case "time":
      case "place":
      case "day":
      case "batch":
      case "subject":
      case "teacher":
        let moveEle;
        if (
          obj.additional != null &&
          obj.additional.moveBlock != null &&
          obj.additional.moveBlock
        ) {
          moveEle = obj.additional.block;
        } else {
          moveEle = ele;
        }
        let up = "Up";
        let down = "Down";
        if (obj.additional != null && obj.additional.rowsLine) {
          up = "Down";
          down = "Up";
        } else if (obj.additional != null && obj.additional.colsLine) {
          up = "Right";
          down = "Left";
        }
        menuItems["Move " + up] = () => {
          this.move("up", moveEle);
        };
        menuItems["Move " + down] = () => {
          this.move("down", moveEle);
        };
        menuItems["Edit"] = () => {
          this.editor(obj);
        };
        menuItems["Delete"] = () => {
          this.delete(dealing, obj.element);
        };
        break;
      default:
        return false;
    }

    return [
      <ul>
        {Object.keys(menuItems).map(item => {
          return (
            <li
              onClick={() => {
                menuItems[item]();
                this.props.unshowMenu();
              }}
              key={item + "mi"}
            >
              {item}
            </li>
          );
        })}
      </ul>,
      Object.keys(menuItems).length * 35 + 32
    ];
  }
  render() {
    if (this.props.menu.display) {
      let x = this.props.menu.type.event.x;
      let y = this.props.menu.type.event.y;
      let Excerpt = this.construct(this.props.menu.type);
      let menuw = 200;
      let menuh = Excerpt[1];
      let Menu = () => {
        return Excerpt[0];
      };
      let winw = window.innerWidth;
      let winh = window.innerHeight;
      let top = null,
        bottom = null,
        left = null,
        right = null;

      if (winh - y > menuh) {
        top = y;
      } else {
        bottom = winh - y;
      }
      if (winw - x > menuw) {
        left = x;
      } else {
        right = winw - x - 16;
      }
      return (
        <div
          className="act-menu"
          style={{
            top: top != null ? top : "unset",
            left: left != null ? left : "unset",
            bottom: bottom != null ? bottom : "unset",
            right: right != null ? right : "unset"
          }}
        >
          <Menu />
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    menu: state.System.menu,
    lectures: state.Lectures,
    days: state.Days,
    times: state.Times,
    places: state.Places,
    subject: state.Subjects,
    teachers: state.Teachers,
    batches: state.Batches,
    tables: state.Tables
  };
};

export default connect(
  mapStateToProps,
  {
    showModal,
    unshowMenu,
    deleteDay,
    deleteBatch,
    deleteTeacher,
    deleteTime,
    deletePlace,
    deleteSubject,
    deleteLecture,
    updateLecture,
    updateDay,
    updateBatch,
    updateTeacher,
    updateTime,
    updatePlace,
    updateSubject,
    updateTable,
    swapDay,
    swapBatch,
    swapTeacher,
    swapTime,
    swapPlace,
    swapSubject,
    swapTable
  }
)(Menu);
