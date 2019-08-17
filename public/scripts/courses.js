"use strict";
//This scripts contains code to dynamically create information on different courses from a JSON file.
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
        let categ;

        //Starts the communication to the server
        $.getJSON(
            "/api/categories",
            //This function doesn't necessarily run instantaneously
            function(data) {
                categ = data;
                //load dropdown lists here (code)
                for (let i = 0; i < categ.length; i++) {
                    let courseOption = $("<option>", { text: categ[i].Category, value: categ[i].Value });
                    $("#courseChoice").append(courseOption);
                } // end of for
                createCourseTable(); //calls function to initially load course dropdown choice
            } // end of CALLBACK function
        ); // end of call to $.getJSON                 

        $("#courseChoice").on("change", createCourseTable);
        $("#btnAllCourses").on("click", createCourseTableAll);

        // Function to create a table for courses.
        function createCourseTable() {
            let objs;
            //Starts the communication to the server
            $.getJSON(
                "/api/courses/bycategory/" + $("#courseChoice").val(),
                //This function doesn't necessarily run instantaneously
                function(data) {
                    objs = data;
                    $("#courseTableHead").empty();
                    let markupHeader = "<tr><th>" + "Course ID" + "</th><th>" + "Course Name" + "</th><th>" + "Link" + "</th></tr>";
                    $("#courseTableHead").append(markupHeader);
                    $("#courseTableHead").css("font-weight", "bold");
                    $("#courseTableBody").empty();
                    for (let i = 0; i < objs.length; i++) {
                        let url = "details.html?courseid=" + objs[i].CourseId;
                        let markupBody = "<tr><td>" + objs[i].CourseId + "</td><td>" + objs[i].Title + "</td><td><a href=" + url + ">View Details</a></td >< /tr>";
                        $("#courseTableBody").append(markupBody);
                    } // end of for
                } // end of CALLBACK function
            ); // end of call to $.getJSON     
        } // end of createCourseTable function

        // Function to create a table for ALL courses.
        function createCourseTableAll() {
            let objs;
            //Starts the communication to the server
            $.getJSON(
                "/api/courses",
                //This function doesn't necessarily run instantaneously
                function(data) {
                    objs = data;
                    $("#courseTableHead").empty();
                    let markupHeader = "<tr><th>" + "Course ID" + "</th><th>" + "Course Name" + "</th><th>" + "Link" + "</th></tr>";
                    $("#courseTableHead").append(markupHeader);
                    $("#courseTableHead").css("font-weight", "bold");
                    $("#courseTableBody").empty();
                    for (let i = 0; i < objs.length; i++) {
                        let url = "details.html?courseid=" + objs[i].CourseId;
                        let markupBody = "<tr><td>" + objs[i].CourseId + "</td><td>" + objs[i].Title + "</td><td><a href=" + url + ">View Details</a></td >< /tr>";
                        $("#courseTableBody").append(markupBody);
                    } // end of for
                } // end of CALLBACK function
            ); // end of call to $.getJSON     
        } // end of createCourseTableAll function

    }) // end of READY EVENT HANDLER