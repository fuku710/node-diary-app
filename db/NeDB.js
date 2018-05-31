const Datastore = require("nedb");

const db = new Datastore({
  filename: "db/diary",
  timestampData: true,
  autoload: true
});

module.exports = db;