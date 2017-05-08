 var express = require("express");
 var path = require('path')
 var app = express();

 /* serves main page */
 app.get("/", function(req, res) {
    res.sendFile(path.resolve('./dist/index.html'))
 });

 /* serves all the static files */
 app.use("/", express.static(__dirname + '/dist'));

 var port = process.env.PORT || 8080;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });
