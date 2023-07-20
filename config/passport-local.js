const passport = require("passport");
const User = require("../model/user");

const LocalStrategy = require("passport-local");

// Implement the local strategy by getting the user name field that needs to be occured while signing in the user
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    (request, email, password, done) => {
      // Finding the user whether present in DB using email sent as input
      User.findOne({ email: email })
        .then((user) => {
          // If the user is present and password provided by the user matches, then allow
          if (user && user.password === password) {
            console.log(`*** Login successful ***`);
            return done(null, user);
          } else {
            // If not then done allow
            console.log(`*** User details does not match ***`);
            return done(null, false);
          }
        })
        .catch((error) => {
          if (error) {
            console.log(
              `*** Error occured while trying to login in user: ${error} ***`
            );
            return done(error);
          }
        });
    }
  )
);

// Tell express that what needs to be stored as part of the cookie session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Tell express that how the stored session information can be converted into user
passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      return done(null, user);
    })
    .catch((error) => {
      return done(error);
    });
});

// Method implementation to check whether the request is authenticated and if not redirect back to user sign in page
passport.checkAuthentication = (request, response, next) => {
  if (request.isAuthenticated()) {
    next();
  }
  return response.redirect("user/signIn");
};

// Method implementation to set the user in the current function response
passport.setAuthenticatedUserInfo = (request, response, next) => {
  if(request.isAuthenticated()){
    // Setting the user information in the request of the controller action
    response.locals.user = request.user;
  }
  next();
}
