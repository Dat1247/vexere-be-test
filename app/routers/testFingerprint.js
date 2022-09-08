const express = require("express");

const fingerprintRouter = express.Router();

fingerprintRouter.get("/", function(req, res) {
    res.send(req.fingerprint);
});

module.exports = { fingerprintRouter };