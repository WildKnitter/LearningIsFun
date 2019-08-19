"use strict";
//This script contains code to post a new course to a JSON file.
//Author:  Pam Belknap

/*
Key for understanding how to access the fields in the JSON file:
objs
objs.length
objs[i].CourseId
objs[i].Title
objs[i].Category
objs[i].Location
objs[i].StartDate
objs[i].EndDate
objs[i].Meets
objs[i].Fee
objs[i].Students (its own array)
*/

//Ready Load
$(function() {
    let categ;

    //Starts the communication to the server
    $.getJSON(
        "/api/categories",
        //This function doesn't necessarily run instantaneously
        function(data) {
            categ = data;
            //load dropdown lists here (code)
            for (let i = 0; i < categ.length; i++) {
                let categoryOption = $("<option>", { text: categ[i].Category, value: categ[i].Category });
                $("#categoryChoice").append(categoryOption);
            } // end of for
        } // end of CALLBACK function
    ); // end of call to $.getJSON      

    $("#btnAddCourse").on("click", addNewCourse);
    $("#btnCancelAdd").on("click", cancelAdd);

}); // end of Ready Load

//when ADD button is clicked:
function addNewCourse() {
    let errMsgs = validateForm();
    $("#msgDiv").empty();
    if (errMsgs.length > 0) {
        let msg = "";
        for (let i = 0; i < errMsgs.length; i++) {
            msg = msg + errMsgs[i] + "<br>"
        }
        $("#msgDiv").html(msg);
        return false;
    }
    $.post("api/courses", $("#detailsInputForm").serialize(), function(data) {
        location.href = "details.html?courseid=" + $("#courseid").val();
    }); // end of post
    return false;
} // end of registerForCourse function

//Validate the form
function validateForm() {
    let errMsgs = [];
    if ($("#courseId").val() == "") {
        errMsgs[errMsgs.length] = "Course Number is REQUIRED";
    }
    if ($("#title").val() == "") {
        errMsgs[errMsgs.length] = "Course Name is REQUIRED";
    }
    if ($("#location").val() == "") {
        errMsgs[errMsgs.length] = "Location is REQUIRED";
    }
    if ($("#startDate").val() == "") {
        errMsgs[errMsgs.length] = "Start Date is REQUIRED";
    }
    if ($("#endDate").val() == "") {
        errMsgs[errMsgs.length] = "End Date is REQUIRED";
    }
    if ($("#meets").val() == "") {
        errMsgs[errMsgs.length] = "Day and Time Information is REQUIRED";
    }
    if ($("#fee").val() == "") {
        errMsgs[errMsgs.length] = "Class Fee is REQUIRED";
    }
    return errMsgs;
} // end of validateForm function

//when CANCEL button is clicked:
function cancelAdd() {
    location.reload();
    $("#msgDiv").html("Action Canceled");
    location.href = "index.html";
}; // end of Cancel Function