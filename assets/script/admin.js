$(document).ready(function () {

    // script to delete user
    $("#employee_delete_link").click((event) => {
        // prevent the default behavior
        event.preventDefault();

        // Trigger API call to delete the employee
        // $.ajax({
        //     type: "get",
        //     url: $("#employee_delete_link").attr("href"),
        //     success: (data) => {
        //         // Remove the requested post DOM from the existing list of posts DOM
        //         $(`#employee_info-container-${data.data.deleted_user_id}`).remove();
        //     },
        //     error: (error) => {
        //         console.log(error.responseText);
        //     },
        // });

        // Remove the employee from DOM
    })

    $("#add_employee_link").click((event) => {

        // prevent default behavior
        event.preventDefault();

        $("#add_employee_form_container").css("display", "block");
        // Change the CSS property from none to block
    })

    $("#close_cross").click((event) => {
        event.preventDefault();

        $("#add_employee_form_container").css("display", "none");
    })

    $("#add_performance_review_link").click((event) => {

        // prevent default behavior
        event.preventDefault();

        $("#add_performance_review_form_container").css("display", "block");
        // Change the CSS property from none to block
    })

    $("#close_cross_for_performance_review").click((event) => {
        event.preventDefault();

        $("#add_performance_review_form_container").css("display", "none");
    })

    $("#assign_performance_review_link").click((event) => {

        // prevent default behavior
        event.preventDefault();

        $("#assign_performance_review_form_container").css("display", "block");
        // Change the CSS property from none to block
    })

    $("#close_cross_for_assign_performance_review").click((event) => {
        event.preventDefault();

        $("#assign_performance_review_form_container").css("display", "none");
    })


    // $("#employee_update_button").click((event) => {

    //     // prevent default event
    //     event.preventDefault();

    //     // Get the values of the user

    //     const employee_id = $("#employee_update_button").attr("data-employee-id");

    //     const name = $(`#employee_name-${employee_id} > #employee_name_info`).innerText();

    //     // Update the user information
    //     $.ajax({
    //         type: "get",
    //         url: $("#employee_update_button").attr("href") + "?" + $.param({ name: name }),
    //         contentType: "application/json; charset=utf-8",
    //         dataType: "json",
    //         success: (data) => {
    //             const updated_user = data.data.updated_user;

    //             // remove the employee info from list
    //             $(`#employee_info-container-${employee_id}`).remove();

    //             // Add the new employee info list
    //             const updated_user_list = $(`
    //             <li id="employee_info-container-${updated_user._id}" class="employees_list_element">

    //                     <!-- employee avatar -->
    //                     <img id="employee_profile_pic" src="${updated_user.profilePicture}"
    //                         alt="add_item_image" height="100" width="100">

    //                     <!-- employee name (firstName + lastName) -->
    //                     <!-- employee inforamtion container -->
    //                     <div id="employee_name-${updated_user._id}" class = "employee_info">
    //                         <p><b>Name :</b> </p>
    //                         <p contenteditable="true" id="employee_name_info">
    //                         ${updated_user.firstName}
    //                         ${updated_user.lastName}
    //                         </p>
    //                         <p><b>Email :</b> </p>
    //                         <p id="employee_email_info">
    //                         ${updated_user.email}
    //                         </p>
    //                     </div>

    //                     <div id="access_info_section">
    //                         <!-- employee delete icon -->
    //                         <a href="/user/update/${updated_user._id}" class="text_content_center"
    //                             id="employee_update_button" data-employee-id=${updated_user._id}>
    //                             <button type="button">Update</button>
    //                         </a>

    //                         <!-- employee delete icon -->
    //                         <a href="/user/delete/${updated_user._id}" class="text_content_center"
    //                             id="employee_delete_button">
    //                             <button type="button">Delete</button>
    //                         </a>
    //                     </div>

    //                 </li>`);

    //             // Append the created student in current employee list
    //             $("#employee_list").prepend(updated_user_list);
    //         },
    //         error: (error) => {
    //             console.log(`Error occurred while trying to update employee: ${error}`);
    //         }
    //     })
    // });

    // show update user information form when update button clicked
    $(".employee_update_button").click((event) => {

        // prevent default behavior
        event.preventDefault();

        // Get the employee id of the user
        const employee_id = event.currentTarget.getAttribute("data-employee-id");

        // turn the update form modal container display from none to block
        $(`#employee_update_container-${employee_id}`).css("display", "block");
    })

    // close the update form when triggered
    $(".close_cross_for_update_form").click((event) => {

        // prevent default
        event.preventDefault();

        // Get the employee id of the user
        const employee_id = event.currentTarget.getAttribute("data-employee-id");

        // turn the update form modal container display from block to none
        $(`#employee_update_container-${employee_id}`).css("display", "none");
    })

    // Script to create employee for admin
    $("#add_employee_form").submit((event) => {
        // Prevent the default behvaiour
        event.preventDefault();

        const post_data = $("#add_employee_form").serialize();

        // Call the create employee call and get the response
        $.ajax({
            type: "post",
            url: "/user/create",
            data: post_data,
            success: (data) => {
                // If success, Get the current displaying employee list

                const created_user = data.data.created_user;

                console.log(JSON.stringify(created_user));

                // Convert the API response into into employee element
                const new_employee_list = $(`
                <li id="employee_info-container-${created_user._id}" class="employees_list_element"
                            data-employee-id=${created_user._id}>

                            <!-- employee avatar -->
                            <img id="employee_profile_pic" src=${created_user.profilePicture}
                                alt="add_item_image" height="100" width="100">

                            <!-- employee name (firstName + lastName) -->
                            <!-- employee inforamtion container -->
                            <div id="employee_name-${created_user._id}" class="employee_info">
                                <p><b>Name :</b> </p>
                                <p contenteditable="true" id="employee_name_info">
                                ${created_user.firstName} ${created_user.lastName}
                                </p>
                                <p><b>Email :</b> </p>
                                <p id="employee_email_info">
                                ${created_user.email}
                                </p>
                            </div>

                            <div id="access_info_section">
                                <!-- employee delete icon -->
                                <a href="/user/update/${created_user._id}" class="text_content_center employee_update_button"
                                    data-employee-id=${created_user._id} >
                                    <button type="button">Update</button>
                                </a>

                                <!-- employee delete icon -->
                                <a href="/user/delete/${created_user._id}" class="text_content_center"
                                    id="employee_delete_button">
                                    <button type="button">Delete</button>
                                </a>
                            </div>
                            <!-- </a> -->
                        </li>`);

                // Append the created student in current employee list
                $("#employee_list").prepend(new_employee_list);

                $("#add_employee_form_container").css("display", "none");
            },
            error: (error) => {
                console.log(`Error occurred while trying to creat employee: ${error}`);
            }
        })
    });
});