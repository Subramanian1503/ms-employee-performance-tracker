const ReviewMetadata = require("../../model/review_metadata");

module.exports.employee_page = async (request, response) => {

    try {
        console.log("entered employee");

        const current_user = request.user;

        // Load all the review metadata that needs to be revied by user
        const reviewMetadataList_to_review = await ReviewMetadata.find({
            status: "TODO",
            for: current_user._id,
        }).populate("for").populate("to");

        // Load all the review metadata that already reviewed by the user
        const reviewMetadataList_reviewed = await ReviewMetadata.find({
            status: {
                $ne: "TODO"
            },
            for: current_user._id,
        }).populate("for").populate("to");

        console.log("rendering employee view");

        return response.render("_employee", {
            need_to_review_list: reviewMetadataList_to_review,
            already_reviewed_list: reviewMetadataList_reviewed
        });
    }
    catch (error) {
        console.log(`Error occured while trying to load employee page: ${error}`);

        // Sending flash noty for user
        request.flash("error", "Some error occured while trying to load employee page");

        return response.redirect("back");
    }
}