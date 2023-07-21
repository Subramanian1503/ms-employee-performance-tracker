const User = require("../../model/user");

// Define method to create user
module.exports.createUser = async (request, response) => {
  try {
    // Get required user inputs from request
    console.log(JSON.stringify(request.body));
    const {
      firstName,
      lastName,
      email,
      password,
      confirm_password,
      type,
      profilePicture,
      dateOfJoining,
    } = request.body;

    // Validate the required inputs for user creation
    if (password === confirm_password) {
      // Create user in DB
      const created_user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        type: type,
        profilePicture: profilePicture,
        dateOfJoining: dateOfJoining,
      });

      // Sending flash noty for user
      request.flash("success", "User created successfully");

      // Redirect to the view page
      return response.redirect("/user/signIn");
    }

    // Sending flash noty for user
    request.flash("error", "Password and Confirm password mismatch");

    return response.redirect("back");
  } catch (error) {
    console.log(`Error occured while trying to create user: ${error}`);

    // Sending flash noty for user
    request.flash("error", "Some error occured while trying to create user");

    return response.redirect("back");
  }
};

// Define method to get a user

// Define method to get all user

// Define method to update user

// Define method to delete user

// Define method to create session
module.exports.create_session = (request, response) => {
  try {

    if (request.user.type === "ADMIN") {

      // Sending flash noty for user
      request.flash("success", "User sign in successfully");

      // If user is a admin then view admin page
      return response.render("_admin");
    } else {

      // Sending flash noty for user
      request.flash("success", "User sign in successfully");

      // If user is a employee then view employee page
      return response.render("_employee");
    }
  } catch (error) {
    console.log(`Error occured while trying to create user: ${error}`);

    // Sending flash noty for user
    request.flash("error", "Some error occured while trying to create user");

    return response.redirect("back");
  }
};

// Logging out from the session
module.exports.destroySession = (request, response) => {
  request.logout((error) => {
  });

  // Sending flash noty for user
  request.flash("success", "User logged out successfully");

  return response.redirect("/user/signIn");
};
