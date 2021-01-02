const express = require('express');
const router = express.Router();


const cred = require('../Custom/credentials')
const awsd = require('../Custom/awsInstance');
const compute = new awsd(cred);

router.get("/instanceId", (req, res) => {
  compute
  .InstanceIds().then((result) => {
    console.log(result);
    res.send({
      type: "Success",
      result,
    });
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

module.exports = router;
