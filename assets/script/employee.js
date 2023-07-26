$(document).ready(function () {

    //  view performance review form when link gets cliked
    $("#view_performance_review_link_employee").click((event) => {

        // Prevent default
        event.preventDefault();

        // Get the performance review metadata id
        const performance_review_metadata_id = event.currentTarget.getAttribute("data-review-metadata-id");

        // display the form
        $(`#add_performance_review_form_container-${performance_review_metadata_id}`).css("display", "block");

    })

    // Close the performance review form when clicked
    $("#close_cross_for_performance_review_employee").click((event) => {
        event.preventDefault();

        // Get the performance review metadata id
        const performance_review_metadata_id = event.currentTarget.getAttribute("data-review-metadata-id");

        $(`#add_performance_review_form_container-${performance_review_metadata_id}`).css("display", "none");
    })
});