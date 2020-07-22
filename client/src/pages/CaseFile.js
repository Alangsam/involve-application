import React from "react";
import { Link } from "react-router-dom";
import CaseDesc from "../components/CaseDesc";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCaretSquareLeft } from "@fortawesome/free-solid-svg-icons";

class CaseFile extends React.Component {
   render() {
      //console.log(isEmpty(this.props.adminAccount));
      return (
         <div className="">
            <div className="container">
               <div className="row">
                  <div className="col-md-8 offset-md-2 text-dark">
                     <div className="">
                        {isEmpty(this.props.adminAccount) && (
                           <Link to="/" className="btn text-dark">
                              <FontAwesomeIcon
                                 type="button"
                                 icon={faCaretSquareLeft}
                                 className=""
                                 size="2x"
                              />
                           </Link>
                        )}

                        {isEmpty(this.props.adminAccount) === false && (
                           <div>
                              <Link
                                 to="/all-cases-admin"
                                 className="btn text-dark"
                              >
                                 <FontAwesomeIcon
                                    type="button"
                                    icon={faCaretSquareLeft}
                                    className=""
                                    size="2x"
                                 />
                              </Link>
                              <Link
                                 to="/case-name-edit"
                                 className="btn text-dark float-right"
                              >
                                 <FontAwesomeIcon
                                    type="button"
                                    icon={faEdit}
                                    className=""
                                    size="2x"
                                 />
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
