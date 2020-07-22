import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import WysiwygEdit from "../components/WysiwygEdit";
import axios from "axios";
import isEmpty from "lodash/isEmpty";
//import { v4 as getUuid } from "uuid";

class CaseFileEdit extends React.Component {
   constructor() {
      super();
      this.state = {
         imageUploadedText: "Upload Image",
         imageUploaded: false,
      };
   }

   setImageUploadedStates(e) {
      const image = e.target.files[0];
      if (image) {
         this.setState({
            imageUploadedText: image.name,
            imageUploaded: image,
         });
      } else {
         this.setState({
            imageUploadedText: "Upload Image",
            imageUploaded: false,
         });
      }
      console.log(this.state.imageUploaded);
      console.log(image);
   }

   async saveAllAndEnterToDb(e) {
      e.preventDefault();

      let imageUrl;
      let formData;
      if (this.state.imageUploaded === false) {
         console.log("no new image");
         imageUrl = this.props.allCases[this.props.indexOfSelectedCase]
            .imageUrl;
      } else {
         formData = await new FormData();
         await formData.append("case-image", this.state.imageUploaded);
         console.log("new image");
         await axios
            .post("/api/v1/caseImage", formData)
            .then((res) => {
               console.log(res.data);
               //this is the url of image
               imageUrl = res.data;
            })
            .catch((err) => {
               console.log(err.response.data);
            });
      }
      console.log(this.state.imageUploaded);

      const id = this.props.adminAccount.id;
      const caseId = this.props.allCases[this.props.indexOfSelectedCase].id;
      const name = document.getElementById("case-name-input").value;
      //const imageUrl = document.getElementById("case-image-url-input").value;
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
      console.log(newCase);
      axios
         .post("/api/v1/allCases/edit", newCase)
         .then((res) => {
            console.log(res);
            console.log(newCase);
         })
         .catch((err) => {
            console.log(err);
         });
      //this.props.history.push("/all-cases-admin");
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
                           {this.props.adminAccount.name}
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
                        <label>Current image</label>
                        <img
                           src={
                              this.props.allCases[
                                 this.props.indexOfSelectedCase
                              ].imageUrl
                           }
                           alt="current"
                           className="img-thumbnail"
                           width="200px"
                        />
                        <div className="clearfix py-4"></div>
                     </div>
                     <div className="col-md-6 offset-md-3 text-center">
                        <form id="image-form">
                           <label
                              className="custom-file-label"
                              htmlFor="image-input"
                           >
                              {this.state.imageUploadedText}
                           </label>
                           <input
                              id="case-image-url-input"
                              type="file"
                              className="custom-file-input"
                              onChange={(e) => {
                                 this.setImageUploadedStates(e);
                              }}
                           ></input>
                        </form>
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
                           form="image-form"
                           onClick={(e) => {
                              this.saveAllAndEnterToDb(e);
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
