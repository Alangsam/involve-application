const dataBaseConnections = require("../db");
const selectOrgByName = require("../queries/selectOrgByName");

module.exports = async function getSignUpOrganizationError(organization) {
   if (organization === "") {
      return "Please enter your affiliated Organization.";
   }
   if ((await checkIsInDataBase(organization)) === false) {
      return "Please enter a trusted Organization";
   }
   return "";
};

function checkIsInDataBase(organization) {
   return dataBaseConnections
      .query(selectOrgByName, organization)
      .then((name) => {
         if (name.length === 0) {
            return false;
         } else return true;
      })
      .catch((err) => {
         console.log(err);
      });
}
