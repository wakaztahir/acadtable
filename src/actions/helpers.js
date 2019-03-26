export const COLORS = ["#ff5e52", "#fff60c", "#a7e034", "#fff00", "#6777eb"];

export const LECTURE_COLOR = "transparent";
export const DAY_COLOR = "#ff5e52";
export const TIME_COLOR = "#fff60c";
export const PLACE_COLOR = "#a7e034";
export const BATCH_COLOR = "#fff00";
export const SUBJECT_COLOR = "#6777eb";
export const TEACHER_COLOR = "#6777eb";

export const random = (operator = "x", start = 3, end = 7) => {
  switch (operator) {
    case "collection":
      operator = "cn";
      break;
    case "table":
      operator = "tl";
      break;
    case "block":
      operator = "bk";
      break;
    case "day":
      operator = "dy";
      break;
    case "time":
      operator = "tm";
      break;
    case "place":
      operator = "pl";
      break;
    case "batch":
      operator = "bh";
      break;
    case "subject":
      operator = "st";
      break;
    case "teacher":
      operator = "tr";
      break;
    default:
      break;
  }
  let id = Math.random()
    .toString()
    .split(".")[1]
    .substr(start, end);
  return operator + id;
};

export const keyList = keyName => {
  switch (keyName) {
    case "batch":
      return "batches";
    default:
      return keyName + "s";
  }
};

export const listKey = listName => {
  switch (listName) {
    case "batches":
      return "batch";
    default:
      return listName.substr(0, listName.length - 1);
  }
};

export const lectureValidator = (lectures, lect, ex = { id: "exception" }) => {
  let lectFind = lectures.filter(
    l => l.time === lect.time && l.day === lect.day && l.place === lect.place
  );
  if (lectFind.length > 0 && lectFind[0].id !== ex.id) {
    return {
      value: false,
      message: "There's already a lecture on the same day,time & place."
    };
  } else {
    let secLectFind = lectures.filter(
      l =>
        l.batch === lect.batch &&
        l.time === lect.time &&
        l.day === lect.day &&
        l.id !== lect.id
    );
    if (secLectFind.length > 0 && secLectFind[0].id !== ex.id) {
      return {
        value: false,
        message: "This batch is already taking lecture on the same time & day."
      };
    } else {
      return {
        value: true,
        message: ""
      };
    }
  }
};
