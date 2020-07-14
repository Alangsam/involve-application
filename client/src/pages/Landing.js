import React from "react";
import CaseOverview from "../components/CaseOverview";
import "../style/master.scss"; //import my custom bootstrap
import { approvedOrgs } from "../objects/approvedOrgs";
import { Link } from "react-router-dom";
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
   convertDescriptionToHTML() {}

   render() {
      //const props = this.props;
      console.log(this.props.allCases);
      return (
         <div className="">
            <div className="container">
               <div className="row all-v">
                  <div className="col-lg-4 mt-6 ">
                     <div
                        className="d-flex align-items-start flex-column col-lg col-6 sticky-top mx-auto"
                        style={{ height: "95vh" }}
                     >
                        <div
                           className={`card ${this.state.marginBetweenStatementAndCards} bg-transparent border-none`}
                        >
                           <h1 className="text-center">Involve</h1>
                           <h4 className="text-center">
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
                        <div className="mt-9 mb-lg-0 mb-9 text-lg-left text-center mt-lg-auto align-bottom">
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
                        <Link to="/login" className="float-right">
                           <h3>
                              <b>...</b>
                           </h3>
                        </Link>
                     </div>
                     <div className="clearfix"></div>

                     <div>
                        {this.props.allCases.length > 0 &&
                           this.props.allCases.map((object, index) => {
                              const url = object.imageUrl;
                              const name = object.title;
                              const subTitle = object.subTitle;
                              const description = object.description;
                              const user = object.id;
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
