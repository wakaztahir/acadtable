import { openDb, deleteDb } from "idb";

import { random } from "./helpers";

class local {
  constructor(datacenter) {
    this.datacenter = datacenter;
    let localData = this.getData();
    if (localData == null || localData === "") {
      this.setData({});
    }
  }
  getData() {
    let localData = localStorage.getItem(this.datacenter);
    return JSON.parse(localData);
  }
  setData(data) {
    localStorage.setItem(this.datacenter, JSON.stringify(data));
  }
  getDataItem(id) {
    let data = this.getData();
    if (data[id] != null) {
      return data[id];
    } else {
      return null;
    }
  }
  setDataItem(id, userdata = {}) {
    let data = this.getData();
    if (data[id] != null) {
      data[id] = Object.assign(data[id], userdata);
    } else {
      data[id] = userdata;
    }
    data[id].id = id;
    this.setData(data);
    return userdata;
  }
  delDataItem(id) {
    let data = this.getData();
    let tobedeleted = data[id];
    delete data[id];
    this.setData(data);
    return tobedeleted;
  }
}

class db {
  constructor(id, data) {
    this.dbName = id;
    this.db = openDb(id, 1, this.upgrade);
  }
  upgrade(uDb) {
    let lecturesObS = uDb.createObjectStore("lectures", {
      keyPath: "id"
    });
    lecturesObS.createIndex("id", "id", { unique: true });
    let tablesObS = uDb.createObjectStore("tables", { keyPath: "id" });
    tablesObS.createIndex("id", "id", { unique: true });
    let batchesObS = uDb.createObjectStore("batches", { keyPath: "id" });
    batchesObS.createIndex("id", "id", { unique: true });
    let daysObS = uDb.createObjectStore("days", { keyPath: "id" });
    daysObS.createIndex("id", "id", { unique: true });
    let timesObS = uDb.createObjectStore("times", { keyPath: "id" });
    timesObS.createIndex("id", "id", { unique: true });
    let placesObS = uDb.createObjectStore("places", { keyPath: "id" });
    placesObS.createIndex("id", "id", { unique: true });
    let subjectsObS = uDb.createObjectStore("subjects", {
      keyPath: "id"
    });
    subjectsObS.createIndex("id", "id", { unique: true });
    let teachersObS = uDb.createObjectStore("teachers", {
      keyPath: "id"
    });
    teachersObS.createIndex("id", "id", { unique: true });
  }
  async delete() {
    return await deleteDb(this.dbName);
  }
}

class user {
  constructor(id) {
    this.id = id != null ? id : random("collection");
    this.local = new local("collections");
  }
  init(id = random("collection")) {
    this.id = id;
    this.db = new db(this.id);
  }
  all() {
    return this.local.getData();
  }
  get(id = this.id) {
    return this.local.getDataItem(id);
  }
  set(data = {}) {
    return this.local.setDataItem(this.id, data);
  }
  delete() {
    this.db.delete();
    return this.local.delDataItem(this.id);
  }
  list() {}
}

export default user;
