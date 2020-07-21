import React from "react";
import "./style/master.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import AllCasesAdmin from "./pages/AllCasesAdmin";
import CaseFile from "./pages/CaseFile";
import CaseFileEdit from "./pages/CaseFileEdit";
import Login from "./pages/Login";
import CreateCase from "./pages/CreateCase";
import jwtDecode from "jwt-decode";
import store from "./store/store";
import actions from "./store/actions";
import axios from "axios";

const authToken = localStorage.authToken;
if (authToken) {
   const currentTimeInSec = Date.now() / 1000;
   const user = jwtDecode(authToken);
   if (currentTimeInSec > user.exp) {
      console.log("expired token");
      store.dispatch({
         type: actions.STORE_CURRENT_ADMIN,
         payload: {},
      });
      delete axios.defaults.headers.common["x-auth-token"];
      const currentUrl = window.location.pathname;
      if (
         currentUrl !== "/" &&
         currentUrl !== "/case-name" &&
         currentUrl !== "/login"
      ) {
         window.location.href = "/";
         console.log(currentUrl);
      }
   } else {
      console.log("valid token");
      store.dispatch({
         type: actions.STORE_CURRENT_ADMIN,
         payload: user,
      });
      axios.defaults.headers.common["x-auth-token"] = authToken;
      const currentUrl = window.location.pathname;
      if (currentUrl === "/" || currentUrl === "/case-name") {
         window.location.href = "/all-cases-admin";
      }
   }
} else {
   console.log("no token");
   delete axios.defaults.headers.common["x-auth-token"];
   const currentUrl = window.location.pathname;
   //console.log(currentUrl);
   if (
      currentUrl !== "/" &&
      currentUrl !== "/case-name" &&
      currentUrl !== "/login"
   ) {
      window.location.href = "/";
      console.log(currentUrl);
   }
}

export default function App() {
   return (
      <Router>
         <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/all-cases-admin" component={AllCasesAdmin} />
            <Route exact path="/case-name" component={CaseFile} />
            <Route exact path="/case-name-edit" component={CaseFileEdit} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/case-new" component={CreateCase} />
         </Switch>
      </Router>
   );
}
