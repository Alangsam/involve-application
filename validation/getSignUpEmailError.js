const { EMAIL_REGEX } = require("../utils/helpers");
const selectUserByEmail = require("../queries/selectUserByEmail");
const dataBaseConnections = require("../db");
const selectOrgNameByDomain = require("../queries/selectOrgNameByDomain");
const selectOrgByName = require("../queries/selectOrgByName");

module.exports = async function getSignUpEmailError(email, organization) {
   const emailSplit = email.split("@");
   const domain = emailSplit[1];
   if (email === "") {
      return "Please enter your email address.";
   }
   if (EMAIL_REGEX.test(email) === false) {
      return "Please enter a valid email address";
   }
   if (await checkIsInDataBase(email)) {
      return "This email address already exists";
   }
   if (await checkDomainMatchesOrg(domain, organization)) {
      console.log(domain);
      return "This email isn't associated with that Organization";
   }
   return "";
};

function checkIsInDataBase(email) {
   return dataBaseConnections
      .query(selectUserByEmail, email)
      .then((users) => {
         //console.log(users);
         if (users.length === 0) {
            return false;
         } else return true;
      })
      .catch((err) => {
         console.log(err);
      });
}
function checkDomainMatchesOrg(domain, organization) {
   return dataBaseConnections
      .query(selectOrgNameByDomain, domain)
      .then((orgReturned) => {
         if (orgReturned.length > 0) {
            //console.log(orgReturned[0].name);
            if (
               orgReturned[0].name.toLowerCase() === organization.toLowerCase()
            ) {
               return false;
            } else return true;
         } else return true;
      })
      .catch((error) => {
         console.log(error);
      });
}
