import actions from "../actions";
import { isEmpty } from "lodash";
import axios from "axios";

export default function adminAccount(adminAccount = {}, action) {
   switch (action.type) {
      case actions.STORE_CURRENT_ADMIN:
         if (isEmpty(action.payload)) {
            window.localStorage.removeItem("authToken");
            delete axios.defaults.headers.common["x-auth-token"];
         }
         return action.payload;
      default:
         return adminAccount;
   }
}
