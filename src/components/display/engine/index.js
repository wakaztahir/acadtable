import AreaEditor from "../Modals/AreaEditor";
import ObjectEditor from "../Modals/ObjectEditor";

import { listKey, keyList, lectureValidator } from "../../actions/helpers";

export const lectureSwap = (from, to) => {
  let lectFind = this.props.lectures.filter(
    l => l.day === to.day && l.time === to.time && l.place === to.place
  );
  if (lectFind.length > 0) {
    let otherLecture = { ...lectFind[0] };
    otherLecture = {
      ...otherLecture,
      day: from.day,
      time: from.time,
      place: from.place
    };
    let otherValidator = lectureValidator(
      this.props.lectures,
      otherLecture,
      from
    );
    if (otherValidator.value) {
      this.props.updateLecture(otherLecture.id, otherLecture);
      let validator = lectureValidator(this.props.lectures, to, otherLecture);
      if (validator.value) {
        this.props.updateLecture(to.id, to);
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
    let validator = lectureValidator(this.props.lectures, to);
    if (validator.value) {
      this.props.updateLecture(to.id, to);
    } else {
      this.props.showModal("message", validator.message);
    }
  }
};
export const AreaEdit = (area, element) => {
  this.props.showModal(
    "content",
    <AreaEditor
      element={element}
      update={data => {
        this.switcher(area, "update")(element.id, data);
      }}
      delete={() => {
        this.switcher(area, "delete")(element.id);
      }}
    />
  );
};
export const ObjectEdit = (area, obj, element) => {
  this.props.showModal(
    "content",
    <ObjectEditor
      element={element}
      obj={obj}
      update={data => {
        this.switcher(keyList(area), "update")(element.id, data);
      }}
      delete={null}
    />
  );
};
export const deleter = (area, element) => {
  let deletor = null;
  deletor = this.switcher(area, "delete");
  if (deletor != null) {
    deletor(element.id);
  } else {
    console.log(deletor);
  }
};
