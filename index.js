const port = 3000;
const http = require("http");
const httpStatus = require("http-status-codes");
const fs = require("fs");

var today = new Date();
var slash = "/"
var year = today.getFullYear();
var month = today.getMonth() + 1;
var day = today.getDate();
var date = month + slash + day + slash + year;

var hours = today.getHours();
var min = today.getMinutes();
var sec = today.getSeconds();
var milsec = today.getMilliseconds();
var time = hours + ':' + min + ':' + sec + '.' + milsec; 


const routeResponseMap = {
  "/": "views/index.html",
  "/Books.html": "views/Books.html",
  "/CompanyTown.html": "views/CompanyTown.html",
  "/1984.html": "views/1984.html",
  "/theCatcherintheRye.html": "views/theCatcherintheRye.html",
  "/Catcher.jpg": "public/Images/Catcher.jpg",
  "/1984.jpg": "public/Images/1984.jpg",
  "/CompanyTown.jpg": "public/Images/CompanyTown.jpg",
  "/error": "<h1>Error! This page cannot be located!</h1>",
};

const app = http.createServer();
app.on("request", (req, res) => {

  res.writeHead(httpStatus.StatusCodes.OK, {
    "Content-Type": "text/html",
  });

  if (routeResponseMap[req.url]) {
    fs.readFile(routeResponseMap[req.url], (error, data) => {
      res.write(data);
      res.end();
      console.log(`Request recieved for page ${req.url} on ${date} at ${time}`)
    });
  } else {
    res.end(routeResponseMap["/error"]);

    console.log(`An error occured. Request for page ${req.url} could not be found on the server. ${date} ${time}`)
  }
});
app.listen(port);
console.log(`The server has started and is listening on port number:${port}`);
