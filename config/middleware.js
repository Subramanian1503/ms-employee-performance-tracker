module.exports.setFlashInformation = (request, response, next) => {

  // Setting up the flash information in response to be used in view
  response.locals.flash = {
    success: request.flash("success"),
    error: request.flash("error"),
  };
  
  // Calling the next steps
  next();
};
