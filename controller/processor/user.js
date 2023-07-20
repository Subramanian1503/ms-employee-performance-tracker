//Define a process to create user may be employee or admin
module.exports.create = (request, response) => {
  // Do the process
  // Redirect to the view page
};

// Define a process to create user session for the user
module.exports.create_session = (request, response) => {

  console.log("*** User session creation successfull***");

  if(request.user.type === "ADMIN"){
    // If user is a admin then view admin page
    return response.redirect("_admin");
  }
  else{
    // If user is a employee then view employee page
    return response.redirect("_employee");
  }
};
