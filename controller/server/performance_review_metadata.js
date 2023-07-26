const Review = require("../../model/review");
const Review_Metadata = require("../../model/review_metadata");
const User = require("../../model/user");

// Method used to create review_metadata and review 
module.exports.create_review_by_admin = async (request, response) => {

    // Get required information from request
    const {
        fromUser,
        toUser,
        jobKnowledge,
        workQuality,
        productivity,
        technicalSkills,
        work,
        consistency,
        attitude,
        attendance
    } = request.body;

    // Get the user by emailId
    const toUserInfo = await User.findOne({
        email: toUser,
    })

    const fromUserInfo = await User.findOne({
        email: fromUser,
    })

    // Create review for with information
    const createdReview = await Review.create({
        jobKnowledge,
        workQuality,
        productivity,
        technicalSkills,
        work,
        consistency,
        attitude,
        attendance
    });

    const current_date = new Date();

    // Create review_metadata
    const createdReviewMetadata = await Review_Metadata.create({
        for: fromUserInfo._id,
        to: toUserInfo._id,
        review_period: current_date,
        status: "IN_REVIEW",
        review_result: createdReview
    });

    // Send response
    return response.redirect("/admin");
}

// Method used to create review_metadata and review 
module.exports.create_review_by_employee = async (request, response) => {

    // Get required information from request
    const {
        fromUser,
        toUser,
        jobKnowledge,
        workQuality,
        productivity,
        technicalSkills,
        work,
        consistency,
        attitude,
        attendance
    } = request.body;

    const review_metadata_id = request.param.id;

    // Create review for with information
    const createdReview = await Review.create({
        jobKnowledge,
        workQuality,
        productivity,
        technicalSkills,
        work,
        consistency,
        attitude,
        attendance
    });

    console.log(`${createdReview}`);

    // Create review_metadata
    const reviewMetadata = await Review_Metadata.findOne({
        id: review_metadata_id,
    });

    console.log(`${reviewMetadata}`);

    reviewMetadata.review_result = createdReview._id;

    reviewMetadata.status = "IN_REVIEW";

    reviewMetadata.save();

    console.log(`${reviewMetadata}`);

    // Send response
    return response.redirect("/employee");
}

// Method used to create review_metadata and review 
module.exports.assign_review = async (request, response) => {

    // Get required information from request
    const {
        fromUser,
        toUser
    } = request.body;

    console.log(`${fromUser}`);
    console.log(`${toUser}`);

    // Get the user by emailId
    const toUserInfo = await User.findOne({
        email: toUser.toLowerCase(),
    })

    const fromUserInfo = await User.findOne({
        email: fromUser.toLowerCase(),
    });

    const current_date = new Date();

    // Create review_metadata
    const createdReviewMetadata = await Review_Metadata.create({
        for: fromUserInfo._id,
        to: toUserInfo._id,
        review_period: current_date,
        status: "TODO",
    });

    // Send response
    return response.redirect("/admin");
}

//Method to update the status of the performance review
module.exports.update_status = async (request, response) => {

    const { update_status } = request.query;

    const review_metadata_id = request.params.id;

    const update_review = await Review_Metadata.findById(review_metadata_id);

    update_review.status = update_status;

    update_review.save();

    return response.redirect("/admin");
}