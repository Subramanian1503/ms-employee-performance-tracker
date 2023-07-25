const User = require("../../model/user");
const ReviewMetadata = require("../../model/review_metadata");

// Method to populate required information for server for admin page
module.exports.admin_page = async (request, response) => {

    // Get required information from request
    const current_user = request.user;

    // Get all the employees for admin
    const employees_list = await User.find({
        $and: [
            {
                email: {
                    $ne: current_user.email,
                }
            },
            {
                type: "EMPLOYEE"
            }
        ]
    });

    // Get all the performance review for review by admin
    const reviewMetadataInReview = await ReviewMetadata.find({
        status: "IN_REVIEW"
    }).populate("for").populate("to");

    const reviewMetadata = await ReviewMetadata.find({
        status: {
            $ne: "IN_REVIEW"
        }
    }).populate("for").populate("to");


    // Provide a employee list without any reviews

    // Render the admin page with all the above information
    return response.render("_admin", {
        employees_list: employees_list,
        review_metadata_list: reviewMetadataInReview,
        assigned_review_metadata_list: reviewMetadata
    })
}