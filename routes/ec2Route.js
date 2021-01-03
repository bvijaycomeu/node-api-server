const express = require('express');
const router = express.Router();
const cred = require('../Custom/credentials')
const awsd = require('../Custom/awsInstance');
const compute = new awsd(cred);

router.get("/instanceId", (req, res) => {
  compute
  .InstanceIds().then((result) => {
    console.log(result);
    res.send(result);
  });
});

router.get("/startInstance", (req, res) => {
  compute
    .startInstances()
    .then((result) => {
      res.send({
        type: "Success",
        result,
      });
    })
    .catch((error) => {
      res.send({
        type: "Failure",
        error,
      });
    });
});

router.get("/stopInstance", (req, res) => {
  compute
    .stopInstances()
    .then((result) => {
      res.send({
        type: "Success",
        result,
      });
    })
    .catch((error) => {
      res.send({
        type: "Failure",
        error,
      });
    });
});


router.post("/SingleInstanceStop", (req, res) => {
  let instanceid =req.body.Selectedid
  compute
    .stopInstances(instanceid)
    .then((result) => {
      res.send({
        type: "Success",
        result,
      });
    })
    .catch((error) => {
      res.send({
        type: "Failure",
        error,
      });
    });
});

router.post("/SingleInstanceStart", (req, res) => {
  let instanceid =req.body.Selectedid
  compute
    .startInstances(instanceid)
    .then((result) => {
      res.send({
        type: "Success",
        result,
      });
    })
    .catch((error) => {
      res.send({
        type: "Failure",
        error,
      });
    });
});






module.exports = router;
