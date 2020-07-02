import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CaseOverview from "../components/CaseOverview";
import { connect } from "react-redux";
import axios from "axios";
import actions from "../store/actions";

class AllCasesAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        axios
            .get(
                "https://raw.githubusercontent.com/Alangsam/involve-app/master/src/objects/caseInformation.json"
            )
            .then((response) => {
                // handle success
                props.dispatch({
                    type: actions.STORE_ALL_CASES,
                    payload: response.data,
                });
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <div className="">
                    <div className="text-center">
                        <Link to="/" className="btn  pb-0">
                            <h6>Log out</h6>
                        </Link>
                        <Link to="/case-new" className="btn  pb-0">
                            <h6>Create New </h6>
                        </Link>
                    </div>
                    <div className="container">
                        <div className="row no-gutters my-5">
                            <div className="col-3 d-inline-block text-left">
                                <h6 className="">Logged in as:</h6>
                                <h6 className="">Alex Langsam/ Red Cross</h6>
                            </div>
                            <div className="d-inline col-1 pr-2 mt-1">
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="float-right"
                                    size="2x"
                                />
                            </div>
                            <div className="col-4 d-inline-block align-bottom">
                                <input
                                    id="search-cases"
                                    className="form-control d-inline"
                                ></input>
                            </div>
                            <div className="col-4 align-bottom d-inline-block pl-7">
                                <select
                                    id="sort-cases"
                                    className="form-control "
                                >
                                    <option>A-Z</option>
                                    <option>Z-A</option>
                                    <option>Most Recent</option>
                                    <option>Oldest</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="">
                                    {this.props.allCases.length > 0 &&
                                        this.props.allCases.map(
                                            (object, index) => {
                                                const url = object.urlOfPicture;
                                                const name =
                                                    object.nameOfPersonOrGroup;
                                                const description =
                                                    object.backgroundInformation;
                                                const user =
                                                    object.whoUpdatedLast[0];

                                                return (
                                                    <div
                                                        key={Math.random()}
                                                        className="d-inline-block col-lg-6"
                                                    >
                                                        <CaseOverview
                                                            key={Math.random()}
                                                            id={index}
                                                            name={name}
                                                            url={url}
                                                            description={
                                                                description
                                                            }
                                                            user={user}
                                                        />
                                                    </div>
                                                );
                                            }
                                        )}
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
        indexOfSelectedCase: state.indexOfSelectedCase,
        allCases: state.allCases,
    };
}

export default connect(mapStateToProps)(AllCasesAdmin);
