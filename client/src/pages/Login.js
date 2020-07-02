import React from "react";
import { approvedOrgs } from "../objects/approvedOrgs";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../store/actions";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            buttonDisplay: "",
            cardDisplayLogin: "none",
            cardDisplayCreate: "none",
            emailNotApprovedOrgWarning: "none",
            marginBetweenStatementAndCards: "mb-8",
        };
    }
    changeDisplayButton = (e) => {
        if (
            e.target.id === "sign-in-or-create-button" ||
            e.target.id === "sign-in-or-create-button-text"
        ) {
            this.setState({ buttonDisplay: "none" });
            this.setState({ cardDisplayLogin: "" });
            this.setState({ marginBetweenStatementAndCards: "mb-3" });
        } else if ((e.target.id = "show-create-card-button")) {
            this.setState({ cardDisplayLogin: "none" });
            this.setState({ cardDisplayCreate: "" });
            this.setState({ marginBetweenStatementAndCards: "mb-6" });
        }

        console.log(Boolean(NaN));
    };
    isTheEmailValidOrganization = () => {
        const listOfOrgs = approvedOrgs.map((things) => things.domain);
        const newEmailValue = document.getElementById("email-create").value;
        const emailOnlyDomain = String(newEmailValue.match(/(?<=@).*/gi));
        if (listOfOrgs.indexOf(emailOnlyDomain) === -1) {
            this.setState({ emailNotApprovedOrgWarning: "" });
        } else {
            this.setState({ emailNotApprovedOrgWarning: "none" });
        }
    };
    storeAdminInfo() {
        const adminAccount = {
            userName: "paulasanchez10",
            userEmail: "p.sanchez@innocenceproject.org",
            userPassword: "paulalikesrunning",
            createdDate: "1591898317",
        };

        this.props.dispatch({
            type: actions.STORE_CURRENT_ADMIN,
            payload: adminAccount,
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
                                        <label htmlFor="email-login">
                                            Unique Name
                                        </label>
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
                                        onClick={() => {
                                            this.storeAdminInfo();
                                        }}
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
                                        <label htmlFor="email-login">
                                            Email
                                        </label>
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
                                        className="btn btn-dark"
                                        to="/all-cases-admin"
                                        onClick={() => {
                                            this.storeAdminInfo();
                                        }}
                                    >
                                        Create
                                    </Link>
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
