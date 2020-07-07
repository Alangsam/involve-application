import React from "react";
//import { approvedOrgs } from "../objects/approvedOrgs";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../store/actions";
import { v4 as getUuid } from "uuid";
import axios from "axios";

class Login extends React.Component {
   constructor() {
      super();
      this.state = {
         createPasswordHasError: false,
         createPasswordError: "",
         createEmailHasError: false,
         createEmailError: "",
      };
   }
   //    isTheEmailValidOrganization = () => {
   //       const listOfOrgs = approvedOrgs.map((things) => things.domain);
   //       const newEmailValue = document.getElementById("email-create").value;
   //       const emailOnlyDomain = String(newEmailValue.match(/(?<=@).*/gi));
   //       if (listOfOrgs.indexOf(emailOnlyDomain) === -1) {
   //          this.setState({ emailNotApprovedOrgWarning: false });
   //       } else {
   //          this.setState({ emailNotApprovedOrgWarning: true });
   //       }
   //    };
   validateAndStoreAdminInfo() {
      const adminAccount = {
         userName: "paulasanchez10",
         userEmail: "p.sanchez@innocenceproject.org",
         userPassword: "paulalikesrunning",
         createdDate: "1591898317",
      };
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
            console.log(res.data);
            this.props.dispatch({
               type: actions.STORE_CURRENT_ADMIN,
               payload: res.data,
            });
            this.props.history.push("/all-cases-admin");
         })
         .catch((err) => {
            const { data } = err.response;
            console.log(data);
            const { emailError, passwordError } = data;
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

   render() {
      return (
         <div className="">
            <div className="container">
               <div className="row">
                  <div className="col-12">
                     <div>
                        <Link to="/" className="btn text-dark col-4">
                           <h4>Back to Homepage</h4>
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
                              <label htmlFor="email-login">Unique Name</label>
                              <input
                                 id="email-login"
                                 className=" form-control"
                              ></input>
                              <label
                                 htmlFor="password-login"
                                 className="text-center pt-2"
                              >
                                 Password
                              </label>
                              <input
                                 id="password-login"
                                 className=" form-control"
                              ></input>
                           </form>
                           <Link
                              to="/all-cases-admin"
                              className="btn btn-dark"
                              onClick={() => {}}
                           >
                              Login
                           </Link>
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
                              <input
                                 id="name-create"
                                 className=" form-control"
                              ></input>
                              <label htmlFor="email-create">Organization</label>
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
