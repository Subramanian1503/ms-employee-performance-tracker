// Defining render action for sign in 
module.exports.signIn = (request, response) => {

    return response.render("user_sign_in");
}

// Defining render action for sign up
module.exports.signUp = (request, response) => {

    return response.render("user_sign_up");
}