import React from "react";
import { Link } from "react-router-dom";
import CaseDesc from "../components/CaseDesc";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";

class CaseFile extends React.Component {
    render() {
        console.log(isEmpty(this.props.adminAccount));
        return (
            <div className="">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 text-dark">
                            <div className="">
                                {isEmpty(this.props.adminAccount) && (
                                    <Link to="/" className="btn text-dark">
                                        Back
                                    </Link>
                                )}

                                {isEmpty(this.props.adminAccount) === false && (
                                    <div>
                                        <Link
                                            to="/all-cases-admin"
                                            className="btn text-dark"
                                        >
                                            Back
                                        </Link>
                                        <Link
                                            to="/case-name-edit"
                                            className="btn text-dark float-right"
                                        >
                                            ...
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <CaseDesc />
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

export default connect(mapStateToProps)(CaseFile);
