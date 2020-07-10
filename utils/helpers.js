const bcrypt = require("bcrypt");

module.exports = {
   removeFirstAndFinalIndex(string) {
      const newString = string.slice(2, string.length - 2);
   },

   toJson(data) {
      return JSON.stringify(data);
   },
   toSafeParse(string) {
      try {
         JSON.parse(string);
      } catch (error) {
         console.log(error);
         return string;
      }

      return JSON.parse(string);
   },

   toHash(password) {
      const saltRounds = 12;
      return bcrypt.hash(password, saltRounds);
   },

   EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};
