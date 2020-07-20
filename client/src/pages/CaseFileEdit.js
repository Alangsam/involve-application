import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import WysiwygEdit from "../components/WysiwygEdit";
import axios from "axios";
//import { v4 as getUuid } from "uuid";

class CaseFileEdit extends React.Component {
   saveAllAndEnterToDb() {
      const id = this.props.adminAccount.id;
      const caseId = this.props.allCases[this.props.indexOfSelectedCase].id;
      const name = document.getElementById("case-name-input").value;
      const imageUrl = document.getElementById("case-image-url-input").value;
      const subTitle = document.getElementById("case-subtitle-input").value;
      const description = this.props.wysiwygState;
      const createdAt = this.props.allCases[this.props.indexOfSelectedCase]
         .createdAt;
      const createdByUserId = this.props.allCases[
         this.props.indexOfSelectedCase
      ].createdByUserId;
      const contactName = document.getElementById("contact-name-input").value;
      const contactPhone = document.getElementById("contact-phone-input").value;
      const contactEmail = document.getElementById("contact-email-input").value;
      const newCase = {
         id: caseId,
         title: name,
         imageUrl: imageUrl,
         subTitle: subTitle,
         description: description,
         createdAt: createdAt,
         lastUpdatedAt: Date.now(),
         updatedByUserId: id,
         createdByUserId: createdByUserId,
         contactName: contactName,
         contactPhone: contactPhone,
         contactEmail: contactEmail,
      };
      axios
         .post("/api/v1/allCases/edit", newCase)
         .then((res) => {
            console.log(res);
            console.log(newCase);
         })
         .catch((err) => {
            console.log(err);
         });
      this.props.history.push("/all-cases-admin");
   }

   render() {
      return (
         <div>
            <div className="container">
               <div className="row">
                  <div className="col-12">
                     <div className="d-inline">
                        <h4 className="d-inline">Logged in as:</h4>
                        <h5 className="d-inline">
                           {this.props.adminAccount.userName}
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
                           id="case-name-input"
                           defaultValue={
                              this.props.allCases[
                                 this.props.indexOfSelectedCase
                              ].title
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
                           id="case-image-url-input"
                           className="form-control"
                           defaultValue={
                              this.props.allCases[
                                 this.props.indexOfSelectedCase
                              ].imageUrl
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
                           id="case-subtitle-input"
                           className="form-control"
                           defaultValue={
                              this.props.allCases[
                                 this.props.indexOfSelectedCase
                              ].subTitle
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
                     <div className="text-center">
                        <div className="col-lg-4 col-6 d-inline-block">
                           <label className="text-center">
                              <h5>Contact Name</h5>
                           </label>
                           <input
                              id="contact-name-input"
                              className="form-control "
                              defaultValue={
                                 this.props.allCases[
                                    this.props.indexOfSelectedCase
                                 ].contactName
                              }
                           ></input>
                           <label className="text-center">
                              <h5>Contact Phone</h5>
                           </label>
                           <input
                              id="contact-phone-input"
                              className="form-control "
                              defaultValue={
                                 this.props.allCases[
                                    this.props.indexOfSelectedCase
                                 ].contactPhone
                              }
                           ></input>
                           <label className="text-center">
                              <h5>Contact Email</h5>
                           </label>
                           <input
                              id="contact-email-input"
                              className="form-control "
                              defaultValue={
                                 this.props.allCases[
                                    this.props.indexOfSelectedCase
                                 ].contactEmail
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
                     <div className="clearfix py-4"></div>
                     <div className="offset-md-3 col-md-6 pb-4 text-center">
                        <label className="text-center" htmlFor="text-editor">
                           Background information
                        </label>
                        <div
                           id="text-editor"
                           className="border border-bottom-0 rounded-top border-dark"
                        >
                           <WysiwygEdit></WysiwygEdit>
                        </div>
                     </div>

                     <div className="col-md-6 offset-md-3 text-center py-7">
                        <button
                           className="btn btn-danger w-100 mt-2 p-4"
                           type="submit"
                           onClick={() => {
                              this.saveAllAndEnterToDb();
                           }}
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
      wysiwygState: state.wysiwygState,
   };
}

export default connect(mapStateToProps)(CaseFileEdit);
