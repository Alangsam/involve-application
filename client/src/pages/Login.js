import React from "react";
//import { approvedOrgs } from "../objects/approvedOrgs";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../store/actions";
import { v4 as getUuid } from "uuid";
import axios from "axios";
import jwtDecode from "jwt-decode";

class Login extends React.Component {
   constructor() {
      super();
      this.state = {
         createNameHasError: false,
         createNameError: "",
         createOrgHasError: false,
         createOrgError: "",
         createEmailHasError: false,
         createEmailError: "",
         createPasswordHasError: false,
         createPasswordError: "",
         passwordHasError: false,
         passwordError: "",
         emailHasError: false,
         emailError: "",
      };
   }
   validateAndStoreAdminInfo() {
      const inputedName = document.getElementById("name-create").value;
      const inputedOrganization = document.getElementById("organization-create")
         .value;
      const inputedEmail = document.getElementById("email-create").value;
      const inputedPassword = document.getElementById("password-create").value;

      const adminUser = {
         id: getUuid(),
         name: inputedName,
         organization: inputedOrganization,
         email: inputedEmail,
         password: inputedPassword,
         created_date: Date.now(),
      };

      axios
         .post("/api/v1/users", adminUser)
         .then((res) => {
            // console.log(res.data);
            // this.props.dispatch({
            //    type: actions.STORE_CURRENT_ADMIN,
            //    payload: res.data,
            // });
            // this.props.history.push("/all-cases-admin");
            const authToken = res.data;
            localStorage.setItem("authToken", authToken);
            const user = jwtDecode(authToken);
            this.props.dispatch({
               type: actions.STORE_CURRENT_ADMIN,
               payload: user,
            });
            console.log(res.data);
            axios.defaults.headers.common["x-auth-token"] = authToken;
            this.props.history.push("/all-cases-admin");
         })
         .catch((err) => {
            const { data } = err.response;
            console.log(data);
            const { userNameError, orgError, emailError, passwordError } = data;
            if (userNameError !== "") {
               this.setState({
                  createNameHasError: true,
                  createNameError: userNameError,
               });
            } else {
               this.setState({
                  createNameHasError: false,
                  createNameError: userNameError,
               });
            }
            if (orgError !== "") {
               this.setState({
                  createOrgHasError: true,
                  createOrgError: orgError,
               });
            } else {
               this.setState({
                  createOrgHasError: false,
                  createOrgError: orgError,
               });
            }
            if (emailError !== "") {
               this.setState({
                  createEmailHasError: true,
                  createEmailError: emailError,
               });
            } else {
               this.setState({
                  createEmailHasError: false,
                  createEmailError: emailError,
               });
            }
            if (passwordError !== "") {
               this.setState({
                  createPasswordHasError: true,
                  createPasswordError: passwordError,
               });
            } else {
               this.setState({
                  createPasswordHasError: false,
                  createPasswordError: passwordError,
               });
            }
         });
   }
   loginUser() {
      const inputedEmail = document.getElementById("email-login").value;
      const inputedPassword = document.getElementById("password-login").value;

      const user = {
         email: inputedEmail,
         password: inputedPassword,
      };
      axios
         .post("/api/v1/users/auth", user)
         .then((res) => {
            // handle success
            const authToken = res.data;
            localStorage.setItem("authToken", authToken);
            const user = jwtDecode(authToken);
            this.props.dispatch({
               type: actions.STORE_CURRENT_ADMIN,
               payload: user,
            });
            console.log(res.data);
            axios.defaults.headers.common["x-auth-token"] = authToken;
            this.props.history.push("/all-cases-admin");
         })
         .catch((err) => {
            const { data } = err.response;
            console.log(data);
            const { emailError, passwordError } = data;
            if (emailError !== "") {
               this.setState({
                  emailHasError: true,
                  emailError: emailError,
               });
            } else {
               this.setState({
                  emailHasError: false,
                  emailError: emailError,
               });
            }
            if (passwordError !== "") {
               this.setState({
                  passwordHasError: true,
                  passwordError: passwordError,
               });
            } else {
               this.setState({
                  passwordHasError: false,
                  passwordError: passwordError,
               });
            }
         });
   }

   render() {
      return (
         <div className="">
            <div className="container">
               <div className="row">
                  <div className="col-12">
                     <div>
                        <Link to="/" className="text-dark col-4">
                           <h4>Back to Involve</h4>
                        </Link>
                     </div>
                  </div>
                  <div className="col-12 col-lg-12 col-md-8 offset-md-2 offset-lg-0 mt-lg-9 mt-4">
                     <div className="card bg-white d-lg-inline-block col-lg-4">
                        <h2 className="card-header bg-white text-center">
                           <b>Login for Admin</b>
                        </h2>
                        <div className="card-body">
                           <h5 className="card-title text-center">
                              Login, Inform People
                           </h5>
                           <form className="form-group text-center">
                              <label htmlFor="email-login">Email</label>
                              <input
                                 id="email-login"
                                 className=" form-control"
                                 type="email"
                              ></input>
                              {this.state.emailHasError && (
                                 <div
                                    htmlFor="email-login"
                                    id="you-have-enter-email"
                                    className="text-danger"
                                 >
                                    {this.state.emailError}
                                 </div>
                              )}
                              <label
                                 htmlFor="password-login"
                                 className="text-center pt-2"
                              >
                                 Password
                              </label>
                              {this.state.passwordHasError && (
                                 <div
                                    htmlFor="password-login"
                                    id="you-have-to-enter-password"
                                    className="text-danger"
                                 >
                                    {this.state.passwordError}
                                 </div>
                              )}
                              <input
                                 id="password-login"
                                 className=" form-control"
                                 type="password"
                              ></input>
                           </form>
                           <button
                              to=""
                              className="btn btn-dark"
                              onClick={() => {
                                 this.loginUser();
                              }}
                           >
                              Login
                           </button>
                        </div>
                     </div>
                     <div className="card bg-white d-lg-inline-block float-right col-lg-4 ">
                        <h2 className="card-header bg-white text-center">
                           <b>Create Account</b>
                        </h2>
                        <div className="card-body">
                           <h5 className="card-title text-center">
                              Sign up, get Involved
                           </h5>
                           <form className="form-group text-center">
                              <label htmlFor="name-create">Username</label>
                              {this.state.createNameHasError && (
                                 <div
                                    htmlFor="userName-create"
                                    id="you-have-to-enter-something-userName"
                                    className="text-danger"
                                 >
                                    {this.state.createNameError}
                                 </div>
                              )}
                              <input
                                 id="name-create"
                                 className=" form-control"
                                 type="username"
                              ></input>
                              <label htmlFor="email-create">Organization</label>
                              {this.state.createOrgHasError && (
                                 <div
                                    htmlFor="organization-create"
                                    id="you-have-to-enter-something-organization"
                                    className="text-danger"
                                 >
                                    {this.state.createOrgError}
                                 </div>
                              )}
                              <input
                                 id="organization-create"
                                 className=" form-control"
                              ></input>
                              <label htmlFor="email-create">Email</label>
                              {this.state.createEmailHasError && (
                                 <div
                                    htmlFor="email-create"
                                    id="you-have-to-create-email"
                                    className="text-danger"
                                 >
                                    {this.state.createEmailError}
                                 </div>
                              )}
                              <input
                                 id="email-create"
                                 className=" form-control"
                                 type="email"
                              ></input>
                              <label
                                 htmlFor="password-create"
                                 className="text-center pt-2"
                              >
                                 Password
                              </label>
                              {this.state.createPasswordHasError && (
                                 <div
                                    htmlFor="password-create"
                                    id="you-have-to-enter-something-password"
                                    className="text-danger"
                                 >
                                    {this.state.createPasswordError}
                                 </div>
                              )}
                              <input
                                 id="password-create"
                                 className=" form-control"
                                 type="password"
                              ></input>
                           </form>
                           <button
                              className="btn btn-dark"
                              onClick={() => {
                                 this.validateAndStoreAdminInfo();
                              }}
                           >
                              Create
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      adminAccount: state.adminAccount,
   };
}

export default connect(mapStateToProps)(Login);
