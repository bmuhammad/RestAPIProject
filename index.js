// Add express server and create application
let express = require("express");
let app = express();

//Assign variable for accessing data. Data is in an array.
let satelliteRepo = require("./repos/satelliteRepo");

//Use the express Router opbject
let router = express.Router();

//Configure middleware to support JSON data parsing in request object
app.use(express.json());

//Create GET to return a list of satellites
router.get("/", function (req, res, next) {
  satelliteRepo.get(
    function (data) {
      res.status(200).json({
        status: 200,
        sttusText: "OK",
        message: "All satellites retrieved.",
        data: data,
      });
    },
    function (err) {
      next(err);
    }
  );
});

//Create GET/search?id=t&type= str to search for satellites by 'id' and/ or 'type'
router.get("/search", function (req, res, next) {
  let searchObject = {
    id: req.query.id,
    type: req.query.type,
  };

  satelliteRepo.search(
    searchObject,
    function (data) {
      res.status(200).json({
        status: 200,
        statusText: "OK",
        message: "All satellites retrieved.",
        data: data,
      });
    },
    function (err) {
      next(err);
    }
  );
});

router.get("/:id", function (req, res, next) {
  satelliteRepo.getById(
    req.params.id,
    function (data) {
      if (data) {
        res.status(200).json({
          status: 200,
          statusText: "OK",
          message: "Single satellites retrieved.",
          data: data,
        });
      } else {
        res.status(404).json({
          status: 400,
          stausText: "Not found",
          message: "The satellite '" + req.params.id + "' could not be found.",
          error: {
            code: "NOT_FOUND",
            message:
              "The satellite '" + req.params.id + "' could not be found.",
          },
        });
      }
    },
    function (err) {
      next(err);
    }
  );
});

router.post("/", function (req, res, next) {
  satelliteRepo.insert(
    req.body,
    function (data) {
      res.status(201).json({
        status: 201,
        statusText: "Created",
        message: "New Satellite Added",
        data: data,
      });
    },
    function (err) {
      next(err);
    }
  );
});

router.put("/:id", function (req, res, next) {
  satelliteRepo.getById(req.params.id, function (data) {
    if (data) {
      //Attempt to update the data
      satelliteRepo.update(req.body, req.params.id, function (data) {
        res.status(200).json({
          status: 200,
          statusText: "OK",
          message: "Satellite '" + req.params.id + "' update.",
          data: data,
        });
      });
    } else {
      res.status(404).json({
        status: 404,
        stausText: "Not found",
        message: "The satellite '" + req.params.id + "' could not be found.",
        error: {
          code: "NOT_FOUND",
          message: "The satellite '" + req.params.id + "' could not be found.",
        },
      });
    }
  }, function(err) {
    next(err);
  });
});

router.delete("/:id", function (req, res, next) {
  satelliteRepo.getById(req.params.id, function (data) {
    if (data) {
      //Attempt to delete the data
      satelliteRepo.delete(req.params.id, function (data) {
        res.status(200).json({
          status: 200,
          statusText: "OK",
          message: "The satellite '" + req.params.id + "' is deleted.",
          data: "Satellite '" + req.params.id + "' deleted.",
        });
      });
    } else {
      res.status(404).json({
        status: 404,
        stausText: "Not found",
        message: "The satellite '" + req.params.id + "' could not be found.",
        error: {
          code: "NOT_FOUND",
          message: "The satellite '" + req.params.id + "' could not be found.",
        },
      });
    }
  }, function(err) {
    next(err);
  });
});

router.patch("/:id", function (req, res, next) {
  satelliteRepo.getById(req.params.id, function (data) {
    if (data) {
      //Attempt to update the data
      satelliteRepo.update(req.body, req.params.id, function (data) {
        res.status(200).json({
          status: 200,
          statusText: "OK",
          message: "Satellite '" + req.params.id + "' patched.",
          data: data
        });
      });
    } else {
      res.status(404).json({
        status: 404,
        stausText: "Not found",
        message: "The satellite '" + req.params.id + "' could not be found.",
        error: {
          code: "NOT_FOUND",
          message: "The satellite '" + req.params.id + "' could not be found.",
        },
      });
    }
  }, function(err) {
    next(err);
  });
});

//Configure router so all routes are prefixed /api/v1
app.use("/api/", router);

//Create server to listen on port 3000
var server = app.listen(5000, function () {
  console.log("Node server is running on http://localhose:5000..");
});
