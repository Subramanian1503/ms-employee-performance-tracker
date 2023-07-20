const mongoose = require("mongoose");

// Defining the mongoose connect url with host ip and database name
mongoose.connect("mongodb://127.0.0.1:27017/employee_performance_tracker_db");

// Getting the created connection using the mongo URL
let connection = mongoose.connection;


// Defining the error messages for different connection states
connection.on(
  "error",
  console.error.bind(
    console,
    "*** Error occured while trying to connect with database ***"
  )
);

connection.once("open", () => {
  console.log("*** Datebase connected successfully ***");
});
