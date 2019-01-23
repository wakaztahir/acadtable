export const rand = (operator = "x", start = 3, end = 7) => {
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
