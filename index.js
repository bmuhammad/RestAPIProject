// Add express server and create application
let express = require("express");
let app = express();

//Use the express Router opbject
let router = express.Router();

//Create GET to return a list of satellites
router.get("/", function (req, res, next) {
    res.send("communication");
  });


//Configure router so all routes are prefixed /api/v1
app.use('/api/', router);

//Create server to listen on port 3000
var server = app.listen(5000, function () {
    console.log('Node server is running on http://localhose:5000..');
  });
