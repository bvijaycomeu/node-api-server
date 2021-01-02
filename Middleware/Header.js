const express = require('express');
const router = express.Router();

router.all("/*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type,Authorization,Accept"
    );
    if ("OPTIONS" == req.method) {
      res.status(200).end();
    } else {
      next();
    }
  });







module.exports = router;