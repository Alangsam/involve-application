const express = require("express");
const router = express.Router();
const db = require("../../db");
const validateJwt = require("../../utils/validateJwt");
const upload = require("../../upload");

router.post("/", validateJwt, (req, res) => {
   const image = req.body;
   console.log("hello");
   upload.single("case-image")(req, res, (err) => {
      if (!req.file && !err) {
         return res.status(400).json({ uploadError: "No File Saved" });
      } else if (!req.file && err) {
         return res.status(400).json({ uploadError: err.message });
      } else {
         return res.status(200).json(req.file.location);
      }
   });
});

module.exports = router;
