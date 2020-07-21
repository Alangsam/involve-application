import React from "react";
import { Link } from "react-router-dom";
import Wysiwyg from "../components/Wysiwyg";
import { connect } from "react-redux";
import { v4 as getUuid } from "uuid";
import axios from "axios";
import isEmpty from "lodash/isEmpty";

class CreateCase extends React.Component {
   constructor() {
      super();
      this.state = {
         imageUploadedText: "Upload Image",
         imageUploaded: {},
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
            imageUploaded: {},
         });
      }
   }

   // getWhatsInputed(e) {
   //     e.target.value;
   // }

   saveImage(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("case-image", this.state.imageUploaded);
      axios
         .post("/api/v1/caseImage", formData)
         .then((res) => {
            console.log(res.data);
         })
         .catch((err) => {
            console.log(err.response.data);
         });
   }

   saveAllAndEnterToDb() {
      const id = this.props.adminAccount.id;
      const name = document.getElementById("case-name-input").value;
      const imageUrl = document.getElementById("case-image-url-input").value;
      const subTitle = document.getElementById("case-subtitle-input").value;
      const description = this.props.wysiwygState;
      const contactName = document.getElementById("contact-name-input").value;
      const contactPhone = document.getElementById("contact-phone-input").value;
      const contactEmail = document.getElementById("contact-email-input").value;
      const newCase = {
         id: getUuid(),
         title: name,
         imageUrl: imageUrl,
         subTitle: subTitle,
         description: description,
         createdAt: Date.now(),
         lastUpdatedAt: Date.now(),
         updatedByUserId: id,
         createdByUserId: id,
         contactName: contactName,
         contactPhone: contactPhone,
         contactEmail: contactEmail,
      };
      axios
         .post("/api/v1/allCases", newCase)
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
                           {this.props.adminAccount.id}
                        </h5>
                        <Link
                           to="/all-cases-admin"
                           className="float-right d-inline"
                        >
                           ...
                        </Link>
                     </div>
                     <div className="clearfix py-4"></div>
                     <div className="col-md-4 offset-md-4 text-center">
                        <label className="text-center">
                           <h5>Case Title/Name</h5>
                        </label>
                        <input
                           className="form-control"
                           id="case-name-input"
                        ></input>
                     </div>
                     <div className="clearfix py-4"></div>
                     <div className="col-md-4 offset-md-4">
                        <form
                           id="image-form"
                           onSubmit={(e) => {
                              this.saveImage(e);
                              console.log("submit");
                           }}
                        >
                           <label
                              className="custom-file-label"
                              htmlFor="image-input"
                           >
                              {this.state.imageUploadedText}
                           </label>
                           <input
                              type="file"
                              className="custom-file-input"
                              id="image-input"
                              onChange={(e) => {
                                 this.setImageUploadedStates(e);
                              }}
                           ></input>
                        </form>
                     </div>
                     <div className="clearfix py-4"></div>
                     <div className="col-md-4 offset-md-4 text-center">
                        <label className="text-center">
                           <h5>What Needs Involvement</h5>
                        </label>
                        <input
                           className="form-control"
                           id="case-subtitle-input"
                        ></input>
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
                           ></input>
                           <label className="text-center">
                              <h5>Contact Phone</h5>
                           </label>
                           <input
                              id="contact-phone-input"
                              className="form-control "
                           ></input>
                           <label className="text-center">
                              <h5>Contact Email</h5>
                           </label>
                           <input
                              id="contact-email-input"
                              className="form-control "
                           ></input>
                        </div>
                        <div className="clearfix py-4"></div>
                        <div className="offset-md-3 col-md-6 pb-4 text-center">
                           <label className="text-center" htmlFor="text-editor">
                              <h5>Background information</h5>
                           </label>
                           <p className="text-center text-muted my-0">
                              MUST SAVE BEFORE SAVING ALL
                           </p>
                           <div
                              id="text-editor"
                              className="border  rounded border-dark"
                           >
                              <Wysiwyg placeholderExists={false}></Wysiwyg>
                           </div>
                        </div>
                     </div>
                     <div className="col-md-4 offset-md-4 text-center py-7">
                        {isEmpty(this.props.wysiwygState) === false && (
                           <button
                              className="btn btn-danger w-100 mt-2 p-4"
                              type="submit"
                              form="image-form"
                              // onClick={() => {
                              //    this.saveAllAndEnterToDb();
                              // }}
                           >
                              <h4>SAVE ALL</h4>
                           </button>
                        )}
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

export default connect(mapStateToProps)(CreateCase);
