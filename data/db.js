const path = require("path");
const dataPath = path.join(__dirname, "/db.json");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(dataPath);
const db = low(adapter);

// Defaults
const defaults = require("./defaults");

db.defaults(defaults).write();

module.exports = {
  db,
};
