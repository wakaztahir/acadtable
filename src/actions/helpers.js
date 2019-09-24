export const COLORS = [
  "transparent",
  "rgba(66,133,244,.3)",
  "rgba(219,68,55,.3)",
  "rgba(244,160,0,.3)",
  "rgba(15,157,88,.3)"
];

export const LECTURE_COLOR = "transparent";
export const DAY_COLOR = "transparent";
export const TIME_COLOR = "transparent";
export const PLACE_COLOR = "transparent";
export const BATCH_COLOR = "transparent";
export const SUBJECT_COLOR = "transparent";
export const TEACHER_COLOR = "transparent";
export const TABLE_HEADER_COLOR = "transparent";
export const TABLE_FOOTER_COLOR = "transparent";

export const DEFAULT_LECTURE = {
  id: null,
  day: null,
  time: null,
  place: null,
  subject: null,
  teacher: null,
  batch: null,
  color: LECTURE_COLOR,
  display: ["batch", "subject", "teacher"]
};

export const random = (operator = "x", start = 3, end = 7) => {
  switch (operator) {
    case "collection":
      operator = "cn";
      break;
    case "table":
      operator = "tl";
      break;
    case "lecture":
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

export const reverse = id => {
  let operator = id[0] + id[1];
  switch (operator) {
    case "cn":
      operator = "collection";
      break;
    case "tl":
      operator = "table";
      break;
    case "bk":
      operator = "lecture";
      break;
    case "dy":
      operator = "day";
      break;
    case "tm":
      operator = "time";
      break;
    case "pl":
      operator = "place";
      break;
    case "bh":
      operator = "batch";
      break;
    case "st":
      operator = "subject";
      break;
    case "tr":
      operator = "teacher";
      break;
    default:
      operator = null;
      break;
  }
  return operator;
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
    l =>
      l.time === lect.time &&
      l.day === lect.day &&
      l.place === lect.place &&
      l.id !== lect.id
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
        message:
          "This batch/class is already taking lecture on the same time & day."
      };
    } else {
      let secLectFind = lectures.filter(
        l =>
          l.teacher === lect.teacher &&
          l.time === lect.time &&
          l.day === lect.day &&
          l.id !== lect.id
      );
      if (secLectFind.length > 0 && secLectFind[0].id !== ex.id) {
        return {
          value: false,
          message:
            "One teacher cannot teach two batches/classes at the same time."
        };
      } else {
        return {
          value: true,
          message: ""
        };
      }
    }
  }
};

export const batchValidator = (batches, batch, ex = { id: "exception" }) => {
  let batchFind = batches.filter(
    b => b.name === batch.name && b.id !== batch.id
  );
  if (batchFind.length > 0 && batchFind[0].id !== ex.id) {
    return {
      value: false,
      message: "A batch with same name already exists."
    };
  } else {
    return {
      value: true,
      message: ""
    };
  }
};
export const dayValidator = (days, day, ex = { id: "exception" }) => {
  let dayFind = days.filter(d => d.name === day.name && d.id !== day.id);
  if (dayFind.length > 0 && dayFind[0].id !== ex.id) {
    return {
      value: false,
      message: "A day with same name already exists."
    };
  } else {
    return {
      value: true,
      message: ""
    };
  }
};
export const timeValidator = (times, time, ex = { id: "exception" }) => {
  let timeFind = times.filter(t => t.name === time.name && t.id !== time.id);
  if (timeFind.length > 0 && timeFind[0].id !== ex.id) {
    return {
      value: false,
      message: "A time with same name already exists."
    };
  } else {
    return {
      value: true,
      message: ""
    };
  }
};
export const placeValidator = (places, place, ex = { id: "exception" }) => {
  let placeFind = places.filter(
    p => p.name === place.name && p.id !== place.id
  );
  if (placeFind.length > 0 && placeFind[0].id !== ex.id) {
    return {
      value: false,
      message: "A place with same name already exists."
    };
  } else {
    return {
      value: true,
      message: ""
    };
  }
};
export const subjectValidator = (
  subjects,
  subject,
  ex = { id: "exception" }
) => {
  let subjectFind = subjects.filter(
    s => s.name === subject.name && s.id !== subject.id
  );
  if (subjectFind.length > 0 && subjectFind[0].id !== ex.id) {
    return {
      value: false,
      message: "A subject with same name already exists."
    };
  } else {
    return {
      value: true,
      message: ""
    };
  }
};
export const teacherValidator = (
  teachers,
  teacher,
  ex = { id: "exception" }
) => {
  let teacherFind = teachers.filter(
    t => t.name === teacher.name && t.id !== teacher.id
  );
  if (teacherFind.length > 0 && teacherFind[0].id !== ex.id) {
    return {
      value: false,
      message: "A teacher with same name already exists."
    };
  } else {
    return {
      value: true,
      message: ""
    };
  }
};
