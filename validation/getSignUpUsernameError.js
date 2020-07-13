const dataBaseConnections = require("../db");
const selectUserNameByName = require("../queries/selectUserNameByName");

module.exports = async function getSignUpUsernameError(username) {
   if (username === "") {
      return "Please enter a username, preferably one which correlates to your name.";
   }
   if (username.length > 25) {
      return "Username cannot be more than 25 characters.";
   }
   if (await checkIsInDataBase(username)) {
      return "That Name already exists.";
   }
   return "";
};

function checkIsInDataBase(username) {
   return dataBaseConnections
      .query(selectUserNameByName, username)
      .then((name) => {
         console.log(name[0].name);
         if (name[0].name.length === 0) {
            return false;
         } else return true;
      })
      .catch((err) => {
         console.log(err);
      });
}
