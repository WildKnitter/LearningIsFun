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
                        let url = "register.html?courseid=" + chosenDetail;

                        $("#courseTableBody").empty();
                        for (let i = 0; i < objs.length; i++) {
                            if (chosenDetail == objs[i].CourseId) {
                                let markupBody0 = "<tr><td class='firstRow'>" + "Course ID" + "</td><td class='firstRow'>" + objs[i].CourseId + "</td></tr>";
                                $("#courseTableBody").append(markupBody0);
                                let markupBody1 = "<tr><td>" + "Course Name" + "</td><td id='title'>" + objs[i].Title + "</td></tr>";
                                $("#courseTableBody").append(markupBody1);
                                let markupBody2 = "<tr><td>" + "Category" + "</td><td id='category'>" + objs[i].Category + "</td></tr>";
                                $("#courseTableBody").append(markupBody2);
                                let markupBody3 = "<tr><td>" + "Location" + "</td><td id='location'>" + objs[i].Location + "</td></tr>";
                                $("#courseTableBody").append(markupBody3);
                                let markupBody4 = "<tr><td>" + "Start Date" + "</td><td id='startdate'>" + objs[i].StartDate + "</td></tr>";
                                $("#courseTableBody").append(markupBody4);
                                let markupBody5 = "<tr><td>" + "End Date" + "</td><td id='enddate'>" + objs[i].EndDate + "</td></tr>";
                                $("#courseTableBody").append(markupBody5);
                                let markupBody6 = "<tr><td>" + "Days and Time" + "</td><td id='meets'>" + objs[i].Meets + "</td></tr>";
                                $("#courseTableBody").append(markupBody6);
                                let markupBody7 = "<tr><td>" + "Class Fee" + "</td><td id='fee'>" + objs[i].Fee + "</td></tr>";
                                $("#courseTableBody").append(markupBody7);
                                let markupBody8 = "<tr><td>" + "Students Registered" + "</td><td id='studentCnt'></td></tr>";
                                $("#courseTableBody").append(markupBody8);
                                if (objs[i].Students.length == 0) {
                                    $("#studentCnt").html("No Students Registered");
                                    $("#studentsTable").hide();
                                } else {
                                    $("#studentCnt").html(objs[i].Students.length);
                                }
                                $("#studentTableHead").empty();
                                let markupHeader = "<tr><th>" + "Student Name" + "</th><th>" + "Student Email" + "</th></tr>";
                                $("#studentTableHead").append(markupHeader);
                                $("#studentTableHead").css("font-weight", "bold");
                                $("#studentTableBody").empty();
                                for (let j = 0; j < objs[i].Students.length; j++) {
                                    let markupBody9 = "<tr><td>" + objs[i].Students[j].StudentName + "</td><td>" + objs[i].Students[j].Email + "</td></tr>";
                                    $("#studentTableBody").append(markupBody9);
                                } // end of if for student table load
                            } // end of if for table load
                        } // end of for (table)

                        $("#btnRegister").on("click", registerForCourse);
                        // when the REGISTER button is clicked, the url created in 
                        // the function createDetailTable sends the user to the
                        // registration page.
                        function registerForCourse() {
                            location.href = url;
                        } // end of registerForCourse Function
                    } // end of function
                } // end of function(data)
            ) // end of .getJSON

    }) // end of READY EVENT HANDLER