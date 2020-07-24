require("dotenv").config();
const express = require("express");
const router = express.Router();
const getSignUpEmailError = require("../../validation/getSignUpEmailError");
const getSignUpPasswordError = require("../../validation/getSignUpPasswordError");
const { toHash } = require("../../utils/helpers");
const selectUserById = require("../../queries/selectUserById");
const dataBaseConnections = require("../../db");
const insertUser = require("../../queries/insertUser");
const getLoginEmailError = require("../../validation/getLoginEmailError");
const getLoginPasswordError = require("../../validation/getLoginPasswordError");
const getSignUpOrganizationError = require("../../validation/getSignUpOrganizationError");
const selectUserByEmail = require("../../queries/selectUserByEmail");
const getSignUpUsernameError = require("../../validation/getSignUpUsernameError");
const findNameById = require("../../queries/findNameById");
const jwt = require("jsonwebtoken");

//@route        POST api/v1/users
//@desc         Create a new user
//@access       Public
router.post("/", async (req, res) => {
   const { id, name, organization, email, password, created_date } = req.body;
   const userNameError = await getSignUpUsernameError(name);
   const orgError = await getSignUpOrganizationError(organization);
   const emailError = await getSignUpEmailError(email, organization);
   const passwordError = await getSignUpPasswordError(password, email);
   let dbError = "";
   if (
      emailError === "" &&
      passwordError === "" &&
      orgError === "" &&
      userNameError === ""
   ) {
      const user = {
         id,
         name,
         organization,
         email,
         password: await toHash(password),
         created_date,
      };
      dataBaseConnections
         .query(insertUser, user)
         .then(() => {
            dataBaseConnections
               .query(selectUserById, id)
               .then((users) => {
                  const user = {
                     id: users[0].id,
                     name: users[0].name,
                     organization: users[0].organization,
                     email: users[0].email,
                     created_date: users[0].created_date,
                  };
                  const accessToken = jwt.sign(
                     user,
                     process.env.JWT_ACCESS_SECRET,
                     {
                        expiresIn: "100m",
                     }
                  );
                  res.status(200).json(accessToken);
               })
               .catch((err) => {
                  console.log(err);
                  dbError = `${err.code} ${err.sqlMessage}`;
                  res.status(400).json({ dbError });
               });
         })
         .catch((err) => {
            console.log(err);
            dbError = `${err.code} ${err.sqlMessage}`;
            res.status(400).json({ dbError });
         });
   } else {
      res.status(400).json({
         userNameError,
         orgError,
         emailError,
         passwordError,
      });
   }
});

//@route        POST api/v1/users/auth
//@desc         Check the user against the db via email and password
//@access       Public
router.post("/auth", async (req, res) => {
   const { email, password } = req.body;
   const emailError = getLoginEmailError(email);
   const passwordError = await getLoginPasswordError(password, email);
   console.log({ emailError, passwordError });
   let dbError = "";
   if (emailError === "" && passwordError === "") {
      dataBaseConnections
         .query(selectUserByEmail, email)
         .then((users) => {
            const user = {
               id: users[0].id,
               name: users[0].name,
               organization: users[0].organization,
               email: users[0].email,
               created_date: users[0].created_date,
            };
            console.log(user);
            const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
               expiresIn: "100m",
            });
            res.status(200).json(accessToken);
         })
         .catch((err) => {
            console.log(err);
            dbError = `${err.code} ${err.sqlMessage}`;
            res.status(400).json({ dbError });
         });
   } else {
      res.status(400).json({ emailError, passwordError });
   }
});

router.get("/", (req, res) => {
   //console.log(req.query);
   const { id } = req.query;
   dataBaseConnections
      .query(findNameById, id)
      .then((name) => {
         //console.log(name);
         return res.json(name);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
