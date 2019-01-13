class storage {
  constructor(focus) {
    switch (focus) {
      case "table":
      default:
        this.list = "tables-list";
        this.data_prefix = "td-";
        break;
      case "batch":
        this.list = "batches-list";
        this.data_prefix = "bt-";
        break;
      case "lecture":
        this.list = "lectures-list";
        this.data_prefix = "lt-";
        break;
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
      console.log(data);
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
  deleteData(id) {
    sessionStorage.removeItem(this.data_prefix + id);
  }
  create(name, id) {
    let list = this.getList();
    let creation = {
      name,
      id
    };
    let data = {
      name,
      id,
      list: []
    };
    console.log("list", list);
    list.push(creation);
    this.saveList(list);
    this.saveData(id, data);
  }
  rename(newname, id) {
    let list = this.getList();
    let newlist = list.map(item => {
      if (item.id === id) {
        item.name = newname;
      }
      return item;
    });
    this.saveList(newlist);
  }
  delete(id) {
    let list = this.getList();
    let newlist = list.filter(item => item.id !== id);
    this.saveList(newlist);
    this.deleteData(id);
  }
}

export default storage;
