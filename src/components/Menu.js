import React, { Component } from "react";

import { connect } from "react-redux";

import {
  unshowMenu,
  deleteDay,
  deleteBatch,
  deleteTeacher,
  deleteTime,
  deletePlace,
  deleteSubject,
  deleteLecture,
  swapDay,
  swapBatch,
  swapTeacher,
  swapTime,
  swapPlace,
  swapSubject,
  swapTable
} from "../actions";

import { reverse, keyList } from "../actions/helpers";

import "../resources/menu.css";

class Menu extends Component {
  editor(tochange) {}
  move(direction, thing, way = null) {
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
          break;
        case "down":
          break;
        case "left":
          break;
        case "right":
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
          this.editor(obj.tochange);
        };
        break;
      case "lecture":
        menuItems["Edit"] = () => {
          this.editor(obj.tochange);
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
        menuItems["Edit"] = () => {
          this.editor(obj.tochange);
        };
        menuItems["Move Up"] = () => {
          this.move("up", moveEle);
        };
        menuItems["Move Down"] = () => {
          this.move("down", moveEle);
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
    unshowMenu,
    deleteDay,
    deleteBatch,
    deleteTeacher,
    deleteTime,
    deletePlace,
    deleteSubject,
    deleteLecture,
    swapDay,
    swapBatch,
    swapTeacher,
    swapTime,
    swapPlace,
    swapSubject,
    swapTable
  }
)(Menu);
