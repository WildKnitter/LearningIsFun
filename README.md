# Learning is Fun!
Our fourth Friday Project! A site to search for and register for continuing education courses at a community center.

![IndexPage](images/learningisfunscreenshot.jpg?raw=true "IndexPage")


## Purpose and goals of this site
- To give information about continuing education courses
- To provide students a place to register for the courses

## Audience
- Prospective and Returning Students  
- ### What do they want from my site?
- To search for continuing education courses by category.
- To find out details about their prospective course, including:
- Course ID, Title, Category, Location, Start Date, End Date, Time and Days the class meets, and the Fee.
- To register for the course.

## Server setup and start
This assumes that the user has Node.js installed globally on their machine.

### Installing the Express framework into the application and setting up the folders:

- First, clone or copy project from GitHub down to a folder on your machine.  
- Your folder setup should look like this (folder is an example):

**Main Folder:**  
c:>LearningIsFun
place the server.js under here

**subfolders under LearningIsFun:**
data (where the JSON data files would be placed)
public (this is your "root" directory)

**subfolders under public:**
css (your styles.css)
images (any images)
scripts (your js scripts other than server.js)

- Go to your Command Prompt
- Under your folder for the application, install the Express framework using NPM by typing:
> npm install express --save <enter>

- Then you'd install the body-parser package using NPM by next typing:
> npm install body-parser --save <enter>

- Now, you'd start the server by typing:
> node server.js <enter>

- You will get a response saying:
**App listening at port 8081**

- To view your page in the browser, you would go to:
http://localhost:8081/index.html


