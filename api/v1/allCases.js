const express = require("express");
const router = express.Router();
const db = require("../../db");
const allCases = require("../../queries/allCases");

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

module.exports = router;
