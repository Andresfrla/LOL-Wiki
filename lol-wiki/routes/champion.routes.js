const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("champions/champDetail");
});

module.exports = router;
