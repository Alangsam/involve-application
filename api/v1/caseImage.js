const express = require("express");
const router = express.Router();
const db = require("../../db");
const validateJwt = require("../../utils/validateJwt");

router.post("/", validateJwt, (req, res) => {
   const image = req.body;
   console.log("hello");
});

module.exports = router;
