const express = require("express");
const router = express.Router();
const db = require("../../db");
const allCases = require("../../queries/allCases");
const dataBaseConnections = require("../../db");
const insertCase = require("../../queries/insertCase");

//@route        GET api/v1/users
//@desc         GET all memory cards for a user by search term and order
//@access       Public
router.get("/", (req, res) => {
   /* https://www.npmjs.com/package/mysql#escaping-query-values */
   db.query(allCases)
      .then((allCases) => {
         const camelCaseCases = allCases.map((aCase) => {
            return {
               id: aCase.id,
               title: aCase.title,
               imageUrl: aCase.image_url,
               subTitle: aCase.sub_title,
               description: aCase.description,
               createdAt: aCase.created_at,
               lastUpdatedAt: aCase.last_updated_at,
               updatedByUserId: aCase.updated_by_user_id,
               createdByUserId: aCase.created_by_user_id,
               contactName: aCase.contact_name,
               contactPhone: aCase.contact_phone,
               contactEmail: aCase.contact_email,
            };
         });

         res.json(camelCaseCases);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

router.post("/", (req, res) => {
   //need to make sure case name doesnt already exist(server side)
   //need to add validation(no blanks, character counter)(front end)
   const newCase = {
      id: req.body.id,
      title: req.body.title,
      image_url: req.body.imageUrl,
      sub_title: req.body.subTitle,
      description: req.body.description,
      created_at: req.body.createdAt,
      last_updated_at: req.body.lastUpdatedAt,
      updated_by_user_id: req.body.updatedByUserId,
      created_by_user_id: req.body.createdByUserId,
      contact_name: req.body.contactName,
      contact_phone: req.body.contactPhone,
      contact_email: req.body.contactEmail,
   };
   dataBaseConnections
      .query(insertCase, newCase)
      .then(() => {})
      .catch((err) => {
         console.log(err);
         dbError = `${err.code} ${err.sqlMessage}`;
         res.status(400).json({ dbError });
      });
});

module.exports = router;
