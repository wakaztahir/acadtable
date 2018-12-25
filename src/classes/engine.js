class engine {
  constructor(name, data) {
    this._name = name;
    this._id = Math.random()
      .toString(36)
      .substr(2, 9);
    this._data = data;
    let saved = this.save();
    return saved;
  }
  object() {
    let name = this.name;
    let id = this.id;
    let data = this.data;
    return {
      name,
      id,
      data
    };
  }
  toString() {
    return JSON.stringify(this.object());
  }
  delete() {
    let tempData = engine.getTables();
    let deleted = false;
    if (tempData[this.id] !== undefined) {
      tempData[this.id] = undefined;
      deleted = true;
    }
    engine.setTables(tempData);
    return deleted;
  }
  rename(newname) {
    let tempData = engine.getTables();
    let renamed = false;
    if (tempData[this.id] !== undefined) {
      if (newname != null) {
        tempData[this.id].name = newname;
        renamed = true;
      }
    }
    engine.setTables(tempData);
    return renamed;
  }
  save(overwrite = false) {
    let tempData = engine.getTables();
    let saved = false;
    if (tempData[this.id] === undefined) {
      tempData[this.id] = this.object();
      saved = true;
    } else {
      if (overwrite) {
        tempData[this.id] = this.object();
        saved = true;
      }
    }
    engine.setTables(tempData);
    return saved;
  }

  //Getters & Setters

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get data() {
    return this._data;
  }

  //Static Functions
  static table(id) {
    let tempData = engine.getTables();
    if (tempData[id] != null) {
      return tempData[id];
    } else {
      return null;
    }
  }
  static getTables() {
    let tempData = {};
    if (localStorage.getItem("tablesData") != null) {
      tempData = JSON.parse(localStorage.getItem("tablesData"));
    }
    return tempData;
  }
  static getTablesArray() {
    let tempData = engine.getTables();
    let newdata = Object.keys(tempData).map(key => {
      return tempData[key];
    });
    return newdata;
  }
  static setTables(tablesData) {
    if (tablesData != null) {
      localStorage.setItem("tablesData", JSON.stringify(tablesData));
    }
  }
}

export default engine;
