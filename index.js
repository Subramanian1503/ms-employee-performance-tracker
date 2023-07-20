const express = require("express");

// Defining the express application
const application = express();

// Declaring a port that can be used for the application
const SERVICE_PORT = 8080;

// Initializing the created mongoose configuration with express application
const mongoose = require("./config/mongoose");

// Defining the main router with the express application
const main_router = require("./router");
application.use("/", main_router);

// Definfing the application to start at service port 8080
application.listen(SERVICE_PORT, (error) => {
  if (error) {
    console.log(
      `*** Error occured while trying to make the service up: ${error} ***`
    );
    return;
  }
  console.log(
    `*** Employee performance tracker application started at port: ${SERVICE_PORT} ***`
  );
});
