const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(
  `mongodb://localhost:27017/firebase`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("Unable to connect database");
      process.exit(1);
    } else {
      console.log("Successfully Connect To the Database.");
    }
  }
);
mongoose.set("useCreateIndex", true);
const db = mongoose.connection;
db.on("error", (err) => {
  console.log(`There was an error connecting to the database: ${err}`);
});
db.once("open", () => {
  console.log(`You have successfully connected to your mongo database: `);
});

module.exports = db;
