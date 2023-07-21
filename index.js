const express = require("express");

// Defining the express application
const application = express();

// Declaring a port that can be used for the application
// const SERVICE_PORT = 8080;

// Initialing the dot env to store secrets
require("dotenv").config();

// Setting up the request parser for express
application.use(express.urlencoded());
application.use(express.json());

// Initializing the created mongoose configuration with express application
const databaseConfig = require("./config/mongoose");

// Define the express layout to use same headers and footers across all the views
const expressLayout = require("express-ejs-layouts");
application.use(expressLayout);

// Setting up the static file directory
application.use(express.static("./assets"));

// Setup the view engine and view folder
application.set("view engine", "ejs");
application.set("views", "./view");

// Setting up the extract style and script from layout property
application.set("layout extractStyles", true);
application.set("layout extractScripts", true);

// Initializing the authentication configuration with express application
const passport_local = require("./config/passport-local");
const passport = require("passport");
const express_session = require("express-session");
const MongoStore = require("connect-mongo");

// Initialize and configure express session as middle ware to save sessions
application.use(
  express_session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: parseInt(process.env.SESSION_EXPIRY_AGE),
    },
    store: MongoStore.create({
      mongoUrl: process.env.SESSION_STORE_DB,
    }),
  })
);

// Setting up middle ware to use session of passport and initialize it
application.use(passport.initialize());
application.use(passport.session());

// Use middleware to set authentication user information in the response so that views can use that
application.use(passport.setAuthenticatedUserInfo);

// Initialize the express flash and setup the middleware to pass the message to view
const flash = require("connect-flash");
const customMiddleware = require("./config/middleware");
application.use(flash());
application.use(customMiddleware.setFlashInformation);

// Defining the main router with the express application
const main_router = require("./router");
application.use("/", main_router);

// Definfing the application to start at service port 8080
application.listen(process.env.SERVICE_PORT, (error) => {
  if (error) {
    console.log(
      `*** Error occured while trying to make the service up: ${error} ***`
    );
    return;
  }
  console.log(
    `*** Employee performance tracker application started at port: ${process.env.SERVICE_PORT} ***`
  );
});
