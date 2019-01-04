export const getList = () => {
  let list;
  try {
    list = JSON.parse(sessionStorage.getItem("tables-list") || "[]");
  } catch (e) {
    list = [];
  }
  return list;
};

export const setList = list => {
  sessionStorage.setItem("tables-list", JSON.stringify(list));
};

export const getTables = () => {
  let tables;
  try {
    tables = JSON.parse(sessionStorage.getItem("tables") || "{}");
  } catch (e) {
    tables = {};
  }
  return tables;
};

export const setTables = tables => {
  sessionStorage.setItem("tables", JSON.stringify(tables));
};

export class Table {
  constructor(id) {
    this.table = JSON.parse(sessionStorage.getItem("tables"))[id];
    return this.table;
  }
  static byName = name => {
    let id =
      "t-" +
      Math.random()
        .toString()
        .split(".")[1]
        .substr(0, 5);

    let table = {
      name,
      id,
      data: {},
      styles: {},
      options: {},
      settings: {},
      extra: {}
    };
    let tableArray = [id, name];
    let list = getList();
    list[list.length] = tableArray;
    setList(list);
    let tables = getTables();
    tables[id] = table;
    setTables(tables);
    return table;
  };
}
