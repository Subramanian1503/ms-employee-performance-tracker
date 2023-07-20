const User = require("../../model/user");

// Define method to create user
module.exports.createUser = async (request, response) => {
  try {
    // Get required user inputs from request
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      type,
      profilePicture,
      dateOfJoining,
    } = request.body;

    // Validate the required inputs for user creation
    if (password === confirmPassword) {
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

      // Return created user response
      return response.status(200).json({
        message: "Create user successfull",
        data: {
          created_user,
        },
      });
    }

    return response.status(400).json({
      message: "Password and confirm password doesn't match",
      data: {},
    });
  } catch (error) {
    console.log(`Error occured while trying to create user: ${error}`);
    return response.status(500).json({
      message: `Error occured while trying to create user: ${error}`,
      data: {},
    });
  }
};

// Define method to get a user

// Define method to get all user

// Define method to update user

// Define method to delete user
