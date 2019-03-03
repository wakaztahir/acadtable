import { random, listKey } from "./helpers";

class datamanager {
  constructor(datacenter, datakey, data = null) {
    this.datacenter = datacenter;
    this.datakey = datakey;
    let localData = this.getData();
    if (Object.keys(localData).length === 0) {
      this.setData({});
    }
    if (data != null) {
      this.setData(data);
    }
  }
  getData() {
    let localData;
    if (this.datacenter === "local") {
      localData = localStorage.getItem(this.datakey);
    } else if (this.datacenter === "session") {
      localData = sessionStorage.getItem(this.datakey);
    } else {
      return false;
    }
    return this.validator(JSON.parse(localData));
  }
  setData(data) {
    if (this.datacenter === "local") {
      localStorage.setItem(this.datakey, JSON.stringify(data));
      return true;
    } else if (this.datacenter === "session") {
      sessionStorage.setItem(this.datakey, JSON.stringify(data));
      return true;
    } else {
      console.warning("Data could't be saved", this.datacenter, this.datakey);
      return false;
    }
  }
  delData() {
    if (this.datacenter === "local") {
      localStorage.removeItem(this.datakey);
      return true;
    } else if (this.datacenter === "session") {
      sessionStorage.removeItem(this.datakey);
      return true;
    } else {
      return false;
    }
  }
  getDataItem(id) {
    let data = this.getData();
    return this.validator(data[id]);
  }
  setDataItem(id, userdata = {}) {
    userdata = this.validator(userdata);
    let data = this.getData();
    data[id] = userdata;
    let response = this.setData(data);
    if (response) {
      return userdata;
    } else {
      return null;
    }
  }
  delDataItem(id) {
    let data = this.getData();
    let tobedeleted = data[id];
    delete data[id];
    this.setData(data);
    return this.validator(tobedeleted);
  }
  validator(data) {
    if (data != null) {
      return data;
    } else {
      return {};
    }
  }
}

class user {
  constructor(id) {
    this.id = id != null ? id : random("collection");
    this.collections = new datamanager("local", "collections");
    this.local = null;
    this.session = null;
  }
  init(id = random("collection")) {
    this.id = id;
    this.local = new datamanager("local", id);
    this.session = {
      tables: new datamanager(
        "session",
        "tables",
        this.local.getDataItem("tables")
      ),
      batches: new datamanager(
        "session",
        "batches",
        this.local.getDataItem("batches")
      ),
      days: new datamanager("session", "days", this.local.getDataItem("days")),
      places: new datamanager(
        "session",
        "places",
        this.local.getDataItem("places")
      ),
      times: new datamanager(
        "session",
        "times",
        this.local.getDataItem("times")
      ),
      lectures: new datamanager(
        "session",
        "lectures",
        this.local.getDataItem("lectures")
      ),
      subjects: new datamanager(
        "session",
        "subjects",
        this.local.getDataItem("subjects")
      ),
      teachers: new datamanager(
        "session",
        "teachers",
        this.local.getDataItem("teachers")
      )
    };
    return id;
  }
  get list() {
    return this.collections.getData();
  }
  get(id = this.id) {
    return this.collections.getDataItem(id);
  }
  set(data) {
    data.id = this.id;
    return this.collections.setDataItem(this.id, data);
  }
  getData(id = this.id) {
    let local = new datamanager("local", id);
    return local.getData();
  }
  setData(data) {
    this.local.setData(data);
    this.session.tables.setData(data.tables);
    this.session.batches.setData(data.batches);
    this.session.days.setData(data.days);
    this.session.times.setData(data.times);
    this.session.places.setData(data.places);
    this.session.lectures.setData(data.lectures);
    this.session.subjects.setData(data.subjects);
    this.session.teachers.setData(data.teachers);
  }
  getDataKey(key) {
    return this.session[key].getData();
  }
  setDataKey(key, data) {
    this.session[key] = data;
  }
  getDataItem(key, id) {
    return this.session[key].getDataItem(id);
  }
  setDataItem(key, id = null, data) {
    if (id == null) {
      id = random(listKey(key));
    }
    data.id = id;
    return this.session[key].setDataItem(id, data);
  }
  delDataItem(key, id) {
    return this.session[key].delDataItem(id);
  }
  save = event => {
    if (this.session != null) {
      this.local.setDataItem("tables", this.session.tables.getData());
      this.local.setDataItem("batches", this.session.batches.getData());
      this.local.setDataItem("days", this.session.days.getData());
      this.local.setDataItem("times", this.session.times.getData());
      this.local.setDataItem("places", this.session.places.getData());
      this.local.setDataItem("lectures", this.session.lectures.getData());
      this.local.setDataItem("subjects", this.session.subjects.getData());
      this.local.setDataItem("teachers", this.session.teachers.getData());
    }
  };
  delete() {
    this.local.delData();
    Object.values(this.session).forEach(s => {
      let deleted = s.delData();
      if (!deleted) {
        console.warning("dataitem ", s, " cannot be deleted");
      }
    });
    return this.collections.delDataItem(this.id);
  }
}

let storage = new user();

export default storage;
