class storage {
  constructor(id = null) {
    this.init(id);
  }
  init(id) {
    if (id != null) {
      this.id = id;
    }
  }
  static create(name, id) {
    let list = storage.getList();
    let creation = {
      name,
      id
    };
    let data = {
      name,
      id,
      blockList: [],
      batchesList: [],
      lecturesList: []
    };
    list.push(creation);
    storage.saveList(list);
    storage.saveData(id, data);
  }
  static getList() {
    let list = sessionStorage.getItem("tables-list") || "[]";
    try {
      list = JSON.parse(list);
    } catch (ex) {
      list = [];
    }
    return list;
  }
  static saveList(list = []) {
    sessionStorage.setItem("tables-list", JSON.stringify(list));
  }

  static getData(id) {
    let data = sessionStorage.getItem("td-" + id);
    data = JSON.parse(data);
    if (data !== undefined && data !== null) {
      return data;
    } else {
      return {};
    }
  }
  static saveData(id, data = {}) {
    sessionStorage.setItem("td-" + id, JSON.stringify(data));
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
    sessionStorage.removeItem("td-" + id);
  }

  //Main User Functions

  getBatchList() {}
  createBatch(name) {
    console.log("batch", "create", name);
  }
  renameBatch(batchID, newname) {
    console.log("batch", "rename", batchID, newname);
  }
  deleteBatch(batchID) {
    console.log("batch", "delete", batchID);
  }

  getLectureList() {}
  createLecture(name) {
    console.log("lecture", "create", name);
  }
  renameLecture(lectureID, newname) {
    console.log("lecture", "rename", lectureID, newname);
  }
  deleteLecture(lectureID) {
    console.log("lecture", "delete", lectureID);
  }
}

export default storage;
