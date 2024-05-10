var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use("/web3", express.static(__dirname + "/node_modules/web3.js-browser/build/"));
app.use("/scripts", express.static(__dirname + "/node_modules/web3.js-browser/build/"));
var fs = require("fs");
var server = require("http").Server(app);
server.listen(3000);
var io = require("socket.io")(server);
app.io = io;

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

require("./routes/main")(app);





