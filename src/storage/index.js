class storage {
  constructor(focus) {
    if (focus === "batch") {
      this.focus = focus;
      this.list = "batches-list";
      this.data_prefix = "bt-";
    } else if (focus === "table") {
      this.focus = focus;
      this.list = "tables-list";
      this.data_prefix = "td-";
    }
  }
  getList() {
    let list = sessionStorage.getItem(this.list) || "[]";
    try {
      list = JSON.parse(list);
    } catch (ex) {
      list = [];
    }
    return list;
  }
  getData(id) {
    let data = sessionStorage.getItem(this.data_prefix + id);
    data = JSON.parse(data);
    if (data !== undefined && data !== null) {
      return data;
    } else {
      return {};
    }
  }
  saveList(list = []) {
    sessionStorage.setItem(this.list, JSON.stringify(list));
  }
  saveData(id, data = {}) {
    sessionStorage.setItem(this.data_prefix + id, JSON.stringify(data));
  }
  create(name, id) {
    let session = new storage(this.focus);
    let list = session.getList();
    let table = {
      name,
      id
    };
    list.push(table);
    session.saveList(list);
  }
  rename(newname, id) {
    let session = new storage(this.focus);
    let list = session.getList();
    let newlist = list.map(item => {
      if (item.id === id) {
        item.name = newname;
      }
      return item;
    });
    session.saveList(newlist);
  }
  delete(id) {
    let session = new storage(this.focus);
    let list = session.getList();
    let newlist = list.filter(item => item.id !== id);
    session.saveList(newlist);
  }
}

export default storage;