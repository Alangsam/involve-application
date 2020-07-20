import React from "react";
import CaseOverview from "../components/CaseOverview";
import "../style/master.scss"; //import my custom bootstrap
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { connect } from "react-redux";
import actions from "../store/actions";

class Landing extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         buttonDisplay: "",
         cardDisplayLogin: "none",
         cardDisplayCreate: "none",
         emailNotApprovedOrgWarning: "none",
         marginBetweenStatementAndCards: "mb-8",

         //add state(hasBeenScrolled), boolean, if the window has been scrolled(true), then onclick of button go back to top
      };
      axios
         .get("/api/v1/allCases")
         //.get("http://localhost:3013/api/v1/allCases")
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
      //const props = this.props;
      //console.log(this.props.allCases);
      return (
         <div className="">
            <div className="container">
               <div className="row all-v">
                  <div className="col-lg-4">
                     <div
                        className="d-flex align-items-start flex-column col-md-7 col-lg sticky-top mx-auto"
                        style={{ height: "95vh" }}
                     >
                        <div className="card pt-6 bg-transparent border-none">
                           <div className="text-xl-center text-center text-lg-left">
                              <img
                                 src={require("../images/logoNoText.png")}
                                 alt="logo"
                                 className=" d-inline-block"
                              />
                           </div>
                           <h4 className="text-left">
                              Here you can involve yourself, in all the
                              systematic problems that the public sector has
                              both created and refused to solve
                           </h4>
                        </div>
                        {/* <button
                                    className="btn btn-dark text-light btn-block"
                                    onClick={() => {
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    Back To Top
                                </button> */}
                        <div className="mt-9 mb-lg-0 mb-9 text-lg-left text-left mt-lg-auto align-bottom">
                           <h1>IN ° VOLVE</h1>
                           <h3>
                              To cause (a person or group) to experience or
                              participate in an activity or situation.
                           </h3>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-7 offset-lg-1">
                     <div className="">
                        <Link to="/login" className="float-right text-dark">
                           <h3 className="d-inline mr-2">
                              <b>Admin</b>
                           </h3>
                           <FontAwesomeIcon
                              type="button"
                              icon={faSignInAlt}
                              className="float-right"
                              size="2x"
                           />
                        </Link>
                     </div>
                     <div className="clearfix pb-2"></div>
                     <div>
                        {this.props.allCases.length > 0 &&
                           this.props.allCases.map((object, index) => {
                              const url = object.imageUrl;
                              const name = object.title;
                              const subTitle = object.subTitle;
                              const description = object.description;
                              const user = object.id;
                              const updatedAt = object.lastUpdatedAt;
                              return (
                                 <CaseOverview
                                    key={index}
                                    id={index}
                                    userId={object.updatedByUserId}
                                    name={name}
                                    url={url}
                                    subTitle={subTitle}
                                    description={description}
                                    user={user}
                                    updatedAt={updatedAt}
                                 />
                              );
                           })}
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
      allCases: state.allCases,
   };
}

export default connect(mapStateToProps)(Landing);
