class storage {
  static create(id, name) {
    let list = storage.getList();
    let collection = {
      name,
      id
    };
    let data = {
      name,
      id,
      tables: [],
      blocks: [],
      days: [],
      times: [],
      places: [],
      batches: [],
      subjects: [],
      teachers: []
    };
    list.push(collection);
    storage.saveList(list);
    storage.saveData(id, data);
  }
  static getList() {
    let list = sessionStorage.getItem("collections") || "[]";
    try {
      list = JSON.parse(list);
    } catch (ex) {
      list = [];
    }
    return list;
  }
  static saveList(list = []) {
    sessionStorage.setItem("collections", JSON.stringify(list));
  }

  static getData(id) {
    let data = sessionStorage.getItem("c-" + id);
    data = JSON.parse(data);
    if (data !== undefined && data !== null) {
      return data;
    } else {
      return {};
    }
  }
  static saveData(id, data = {}) {
    sessionStorage.setItem("c-" + id, JSON.stringify(data));
  }
  static rename(id, newname) {
    let list = storage.getList();
    let newlist = list.map(item => {
      if (item.id === id) {
        item.name = newname;
      }
      return item;
    });
    storage.saveList(newlist);
  }
  static delete(id) {
    let list = storage.getList();
    let newlist = list.filter(item => item.id !== id);
    storage.saveList(newlist);
    sessionStorage.removeItem("c-" + id);
  }

  //Main User Functions

  static list(id, type) {
    let tableData = storage.getData(id);
    if (tableData) {
      if (!tableData[type]) {
        tableData[type] = [];
        storage.saveData(id, tableData);
      }
      let ListFunctions = {
        all: function() {
          let tableData = storage.getData(this.id);
          let list = tableData[this.type];
          return list;
        },
        getItem: function(itemID) {
          let tableData = storage.getData(this.id);
          let list = tableData[this.type];
          let items = list.filter(item => item.id === itemID);
          return items[0];
        },
        createItem: function(itemID, data) {
          let tableData = storage.getData(this.id);
          let list = tableData[this.type];
          let item = {
            id: itemID
          };
          Object.assign(item, data);
          list.push(item);
          storage.saveData(this.id, tableData);
          return item;
        },
        deleteItem: function(itemID) {
          let tableData = storage.getData(this.id);
          let list = tableData[this.type];
          tableData[this.type] = list.filter(item => item.id !== itemID);
          storage.saveData(this.id, tableData);
        }
      };
      ListFunctions.id = id;
      ListFunctions.type = type;
      return ListFunctions;
    } else {
      return null;
    }
  }
}

export default storage;
