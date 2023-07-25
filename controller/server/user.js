const User = require("../../model/user");
const ReviewMetadata = require("../../model/review_metadata");
const Review = require("../../model/review");

// Define method to create user
module.exports.create_user = async (request, response) => {
  try {
    // Get required user inputs from request
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
        email: email.toLowerCase(),
        password: password,
        type: type,
        profilePicture: profilePicture,
        dateOfJoining: dateOfJoining,
      });

      // Sending flash noty for user
      request.flash("success", "User created successfully");

      if (request.xhr) {
        return response.status(200).json({
          data: {
            created_user: created_user,
          }
        })
      }

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

// Define method to update user
module.exports.update_user = async (request, response) => {

  console.log("entered update controller");

  // Get the user updated information
  const { firstName, lastName, profilePicture, dateOfJoining, email, type } = request.body;

  const user_id = request.params.id;

  console.log(`${user_id}`);

  // Update the user
  const update_user = await User.findById(user_id);

  if (firstName) {
    update_user.firstName = firstName;
  }

  if (lastName) {
    update_user.lastName = lastName;
  }

  if (profilePicture) {
    update_user.profilePicture = profilePicture;
  }

  if (dateOfJoining) {
    update_user.dateOfJoining = dateOfJoining;
  }

  if (email) {
    update_user.email = email;
  }

  if (type) {
    update_user.type = type;
  }

  console.log(`Updated user: ${update_user}`);

  update_user.save();

  return response.redirect("/admin");
}

// Define method to delete user
module.exports.delete_user = async (request, response) => {

  // Get the user id that needs to be deleted
  const requested_user_id = request.params.id;
  const current_user = request.user;

  // Check if the current user is a ADMIN
  if (current_user.type == "ADMIN") {

    const reviewMetadataByUser = await ReviewMetadata.findOne({
      for: requested_user_id
    });

    if (reviewMetadataByUser) {
      console.log(`*** Request by user available: ${reviewMetadataByUser} ***`);

      const review_result_id = reviewMetadataByUser.review_result._id;

      console.log(`***review_result: ${review_result_id} ***`);

      await Review.deleteOne(review_result_id);

      console.log(`*** review_metadata: ${reviewMetadataByUser._id} ***`);

      await ReviewMetadata.deleteOne(reviewMetadataByUser._id);
    }

    const reviewMetadataToUser = await ReviewMetadata.find({
      to: requested_user_id
    });

    if (reviewMetadataToUser) {
      console.log(`*** Request by user available: ${reviewMetadataToUser} ***`);

      const review_result_id_to_user = reviewMetadataToUser.review_result;

      console.log(`*** review_result: ${review_result_id_to_user} ***`);

      await Review.deleteOne(review_result_id_to_user);

      console.log(`*** review_metadata: ${reviewMetadataToUser._id} ***`);

      await ReviewMetadata.deleteOne(reviewMetadataToUser._id);
    }

    // Execute the delete from DB 
    await User.findByIdAndRemove(requested_user_id);


    // Sending flash noty for user
    request.flash("success", "Employee deleted successfully");

    // if request from ajax send response
    if (request.xhr) {
      return response.status(200).json({
        data: {
          deleted_user_id: requested_user_id,
        }
      });
    }

    // render admin page
    return response.redirect("/admin");
  }
  else {

    // Show a flash message that user is not ADMIN
    request.flash("error", "User has no privillege to delete employee");

    return response.redirect("back");
  }
}

// Define method to create session
module.exports.create_session = (request, response) => {
  try {

    if (request.user.type === "ADMIN") {

      // Sending flash noty for user
      request.flash("success", "User sign in successfully");

      // If user is a admin then view admin page
      return response.redirect("/admin");
    } else {

      // Sending flash noty for user
      request.flash("success", "User sign in successfully");

      // If user is a employee then view employee page
      return response.redirect("/employee");
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
