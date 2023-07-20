const mongoose = require("mongoose");

// Defining the schema of the user
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["EMPLOYEE", "ADMIN"],
      default: "EMPLOYEE",
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    dateOfJoining: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Converting the schema into model
const User = mongoose.model("User", userSchema);

// Exporting the created model
module.exports = User;
