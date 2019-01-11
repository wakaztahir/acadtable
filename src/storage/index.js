class storage {
  static getList() {
    let tablesList = sessionStorage.getItem("tables-list") || "[]";
    try {
      tablesList = JSON.parse(tablesList);
    } catch (ex) {
      tablesList = [];
    }
    return tablesList;
  }
  static getTable(id) {
    let tableData = sessionStorage.getItem("td-" + id);
    tableData = JSON.parse(tableData);
    if (tableData !== undefined && tableData !== null) {
      return tableData;
    } else {
      return {};
    }
  }
  static saveList(list = []) {
    sessionStorage.setItem("tables-list", JSON.stringify(list));
  }
  static saveTable(id, data = {}) {
    sessionStorage.setItem("td-" + id, JSON.stringify(data));
  }
  static createTable(name, id) {
    let list = storage.getList();
    let table = {
      name,
      id
    };
    list.push(table);
    storage.saveList(list);
  }
  static renameTable(newname, id) {
    let list = storage.getList();
    let newlist = list.map(item => {
      if (item.id === id) {
        item.name = newname;
      }
      return item;
    });
    console.log("rename", list, newlist);
    storage.saveList(newlist);
  }
  static deleteTable(id) {
    let list = storage.getList();
    let newlist = list.filter(item => item.id !== id);
    storage.saveList(newlist);
  }
}

export default storage;
