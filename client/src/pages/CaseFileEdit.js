import React from "react";
import Wysiwyg from "../components/Wysiwyg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class CaseFileEdit extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-inline">
                                <h4 className="d-inline">Logged in as:</h4>
                                <h5 className="d-inline">
                                    Alex Langsam / red Cross
                                </h5>
                                <Link
                                    to="/all-cases-admin"
                                    className="float-right d-inline"
                                >
                                    ...
                                </Link>
                            </div>
                            <div className="clearfix py-4"></div>
                            <div className="col-md-6 offset-md-3 text-center">
                                <label className="text-center">
                                    <h5>Case Title/Name</h5>
                                </label>
                                <input
                                    className="form-control"
                                    defaultValue={
                                        this.props.allCases[
                                            this.props.indexOfSelectedCase
                                        ].nameOfPersonOrGroup
                                    }
                                ></input>
                                <button
                                    className="btn btn-dark w-25 mt-2"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                            <div className="clearfix py-4"></div>
                            <div className="col-md-6 offset-md-3 text-center">
                                <h5>Upload Image or Enter URL</h5>
                                <input
                                    type="file"
                                    className="form-control-file"
                                ></input>
                                <input
                                    className="form-control"
                                    defaultValue={
                                        this.props.allCases[
                                            this.props.indexOfSelectedCase
                                        ].urlOfPicture
                                    }
                                ></input>
                                <button
                                    className="btn btn-dark w-25 mt-2"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                            <div className="clearfix py-4"></div>
                            <div className="col-md-6 offset-md-3 text-center">
                                <label className="text-center">
                                    <h5>What Needs Involvement</h5>
                                </label>
                                <input
                                    className="form-control"
                                    defaultValue={
                                        this.props.allCases[
                                            this.props.indexOfSelectedCase
                                        ].whatHappened
                                    }
                                ></input>
                                <button
                                    className="btn btn-dark w-25 mt-2"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                            <div className="clearfix py-4"></div>
                            <div className="offset-md-3 col-md-6 pb-4 text-center">
                                <label
                                    className="text-center"
                                    htmlFor="text-editor"
                                >
                                    Background information
                                </label>
                                <div
                                    id="text-editor"
                                    className="border border-bottom-0 rounded-top border-dark"
                                >
                                    <Wysiwyg></Wysiwyg>
                                </div>
                                <button
                                    className="btn-dark w-100 rounded-bottom"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                            <div className="text-center">
                                <div className="col-lg-4 col-6 d-inline-block">
                                    <label className="text-center">
                                        <h5>Contact Title</h5>
                                    </label>
                                    <input
                                        id="Title-1"
                                        className="form-control "
                                        defaultValue={
                                            this.props.allCases[
                                                this.props.indexOfSelectedCase
                                            ].whoToContact[0]
                                        }
                                    ></input>
                                    <input
                                        id="Title-2"
                                        className="form-control "
                                        defaultValue={
                                            this.props.allCases[
                                                this.props.indexOfSelectedCase
                                            ].whoToContact[1]
                                        }
                                    ></input>
                                    <input
                                        id="Title-3"
                                        className="form-control "
                                        defaultValue={
                                            this.props.allCases[
                                                this.props.indexOfSelectedCase
                                            ].whoToContact[2]
                                        }
                                    ></input>
                                </div>
                                <div className="col-lg-4 col-6 d-inline-block">
                                    <label className="text-center">
                                        <h5>Contact Info</h5>
                                    </label>
                                    <input
                                        id="info-1"
                                        className="form-control "
                                        defaultValue={
                                            this.props.allCases[
                                                this.props.indexOfSelectedCase
                                            ].howToContact[0]
                                        }
                                    ></input>
                                    <input
                                        id="info-2"
                                        className="form-control "
                                        defaultValue={
                                            this.props.allCases[
                                                this.props.indexOfSelectedCase
                                            ].howToContact[1]
                                        }
                                    ></input>
                                    <input
                                        id="info-3"
                                        className="form-control "
                                        defaultValue={
                                            this.props.allCases[
                                                this.props.indexOfSelectedCase
                                            ].howToContact[2]
                                        }
                                    ></input>
                                </div>
                                <div className="clearfix"></div>
                                <button
                                    className="btn btn-dark w-25 mt-2"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                            <div className="col-md-6 offset-md-3 text-center pt-3">
                                <label className="text-center">
                                    <h5>Location</h5>
                                </label>
                                <input
                                    className="form-control "
                                    defaultValue={
                                        this.props.allCases[
                                            this.props.indexOfSelectedCase
                                        ].whereIsThisTakingPlace
                                    }
                                ></input>
                                <button
                                    className="btn btn-dark w-25 mt-2"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                            <div className="col-md-6 offset-md-3 text-center py-7">
                                <button
                                    className="btn btn-danger w-100 mt-2 p-4"
                                    type="submit"
                                >
                                    <h4>SAVE ALL</h4>
                                </button>
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
        indexOfSelectedCase: state.indexOfSelectedCase,
        allCases: state.allCases,
        adminAccount: state.adminAccount,
    };
}

export default connect(mapStateToProps)(CaseFileEdit);
