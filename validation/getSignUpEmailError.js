const { EMAIL_REGEX } = require("../utils/helpers");
const selectUserByEmail = require("../queries/selectUserByEmail");
const dataBaseConnections = require("../db");

module.exports = async function getSignUpEmailError(email) {
   if (email === "") {
      return "Please enter your email address.";
   }
   if (EMAIL_REGEX.test(email) === false) {
      return "Please enter a valid email address";
   }
   if (await checkIsInDataBase(email)) {
      return "This email address already exists";
   }
   return "";
};

function checkIsInDataBase(email) {
   return dataBaseConnections
      .query(selectUserByEmail, email)
      .then((users) => {
         console.log(users);
         if (users.length === 0) {
            return false;
         } else return true;
      })
      .catch((err) => {
         console.log(err);
      });
}
