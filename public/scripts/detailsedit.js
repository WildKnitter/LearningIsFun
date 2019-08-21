"use strict";
//This script contains code to dynamically create information on different courses from a JSON file.
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

Categories:
categ
categ.length
categ[i].Category
categ[i].Value
*/

$(function() {
        let objs;

        //Starts the communication to the server
        $.getJSON(
                "/api/courses",
                //This function doesn't necessarily run instantaneously
                function(data) {
                    objs = data;

                    createDetailTable();

                    //This function dynamically creates the course table.
                    function createDetailTable() {
                        let urlParams = new URLSearchParams(location.search);
                        let chosenDetail = urlParams.get("courseid");
                        $("#detailsFormCreate").empty();
                        for (let i = 0; i < objs.length; i++) {
                            if (chosenDetail == objs[i].CourseId) {
                                let markupBody0 = "<div class='form-group'><label for='courseId'>Course ID:</label><input type='text' class='form-control' id='courseId' name='courseid' value = '" + objs[i].CourseId + "' readonly></div>";
                                $("#detailsFormCreate").append(markupBody0);

                                let markupBody1 = "<div class='form-group'><label for='title'>Title:</label><input type='text' class='form-control' id='title' name='title' value = '" + objs[i].Title + "' ></div>";
                                $("#detailsFormCreate").append(markupBody1);

                                let markupBody2 = "<div class='form-group'><label for='category'>Category:</label><input type='text' class='form-control' id='category' name='category' value = '" + objs[i].Category + "' readonly></div>";
                                $("#detailsFormCreate").append(markupBody2);

                                let markupBody3 = "<div class='form-group'><label for='location'>Location:</label><input type='text' class='form-control' id='location' name='location' value = '" + objs[i].Location + "' ></div>";
                                $("#detailsFormCreate").append(markupBody3);

                                let markupBody4 = "<div class='form-group'><label for='startDate'>Start Date:</label><input type='text' class='form-control' id='startDate' name='startdate' value = '" + objs[i].StartDate + "' ></div>";
                                $("#detailsFormCreate").append(markupBody4);

                                let markupBody5 = "<div class='form-group'><label for='endDate'>End Date:</label><input type='text' class='form-control' id='endDate' name='enddate' value = '" + objs[i].EndDate + "' ></div>";
                                $("#detailsFormCreate").append(markupBody5);

                                let markupBody6 = "<div class='form-group'><label for='meets'>Days and Time:</label><input type='text' class='form-control' id='meets' name='meets' value = '" + objs[i].Meets + "' ></div>";
                                $("#detailsFormCreate").append(markupBody6);

                                let markupBody7 = "<div class='form-group'><label for='fee'>Class Fee:</label><input type='text' class='form-control' id='fee' name='fee' value = '" + objs[i].Fee + "' ></div>";
                                $("#detailsFormCreate").append(markupBody7);
                            } // end of if for table load
                        } // end of for (table)
                    } // end of createDetailTable function
                } // end of function(data)

            ) // end of .getJSON

        $("#btnUpdateCourse").on("click", updateCourse);
        $("#btnCancelUpdate").on("click", cancelUpdates);

        //when ADD button is clicked:
        function updateCourse() {
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
            // EDIT A COURSE
            {
                $.ajax({
                        url: "api/courses", // your api url
                        data: $("#detailsFormEdit").serialize(), // id of your form
                        method: "PUT", // method is any HTTP method
                        success: function() {
                                alert("Updated!");
                                location.href = "details.html?courseid=" + $("#courseId").val();
                            } // end of success function
                    }) // end of ajax PUT
                    .fail(function() {
                        alert("Didn't Update!");
                        location.href = "courses.html";
                    }); // end of fail function
            } // end of EDIT A COURSE
        } // end of updateCourse function

        //Validate the form
        // Note: Need to add the forward slash to the front and back of regular 
        // expressions to make them behave correctly when code is run. 
        function validateForm() {
            let errMsgs = [];
            let dateReg = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
            let numReg = /^\d{0,9}(\.\d{0,2})?$/;
            if ($("#title").val().trim() == "") {
                errMsgs[errMsgs.length] = "Course Name is REQUIRED";
            }
            if ($("#location").val().trim() == "") {
                errMsgs[errMsgs.length] = "Location is REQUIRED";
            }
            if ($("#startDate").val().trim() == "") {
                errMsgs[errMsgs.length] = "Start Date is REQUIRED";
            }
            if (dateReg.test($("#startDate").val()) == false) {
                errMsgs[errMsgs.length] = "Start Date needs to be in mm/dd/yy format!";
            }
            if ($("#endDate").val().trim() == "") {
                errMsgs[errMsgs.length] = "End Date is REQUIRED";
            }
            if (dateReg.test($("#endDate").val()) == false) {
                errMsgs[errMsgs.length] = "End Date needs to be in mm/dd/yy format!";
            }
            if ($("#meets").val().trim() == "") {
                errMsgs[errMsgs.length] = "Day and Time Information is REQUIRED";
            }
            if ($("#fee").val().trim() == "") {
                errMsgs[errMsgs.length] = "Class Fee is REQUIRED";
            }
            if (numReg.test($("#fee").val()) == false) {
                errMsgs[errMsgs.length] = "Fee is numeric and needs to be in a 9999.99 format!";
            }

            return errMsgs;
        } // end of validateForm function

        //when CANCEL button is clicked:
        function cancelUpdates() {
            location.reload();
            $("#msgDiv").html("Action Canceled");
            location.href = "courses.html";
        }; // end of Cancel Function

    }) // end of READY EVENT HANDLER