const express = require('express');
const responseTime = require("response-time");

const router = express.Router();

router.use(
    responseTime((req, res, time) => {
      let stat = (req.method + req.url + " - " + res.statusCode)
        .toLowerCase()
        .replace(/[:\.]/g, "")
        .replace(/\//g, " - ");
      console.log(`${stat} - ${time} ms`);
    })
  );

module.exports = router;