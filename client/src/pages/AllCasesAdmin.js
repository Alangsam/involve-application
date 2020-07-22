import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faSearch,
   faUserCircle,
   faFolderPlus,
   faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import CaseOverview from "../components/CaseOverview";
import { connect } from "react-redux";
import axios from "axios";
import actions from "../store/actions";

class AllCasesAdmin extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         order: "cases.sub_title%20ASC",
         cases: [],
         searchTerm: "",
         userCases: [],
         usingAllCases: true,
      };
   }

   componentDidMount() {
      if (this.state.usingAllCases) {
         this.setCases();
      } else {
         this.setUserCases();
      }
   }

   logOutCurrentUser() {
      this.props.dispatch({
         type: actions.STORE_CURRENT_ADMIN,
         payload: {},
      });
   }

   setOrder(e) {
      const newOrder = e.target.value;
      if (this.state.usingAllCases) {
         this.setState({ order: newOrder }, () => {
            this.setCases();
         });
      } else {
         this.setState({ order: newOrder }, () => {
            this.setUserCases();
         });
      }
   }
   addEnterListener() {
      const input = document.getElementById("search-cases");
      input.addEventListener("keyup", function (event) {
         if (event.keyCode === 13) {
            event.preventDefault();
            //console.log(document.getElementById("search-button"));
            document.getElementById("search-button").click();
         }
      });
   }

   setSearchTerm() {
      const searchInput = document.getElementById("search-cases").value;
      if (this.state.usingAllCases) {
         this.setState({ searchTerm: searchInput }, () => {
            this.setCases();
         });
      } else {
         this.setState({ searchTerm: searchInput }, () => {
            this.setUserCases();
         });
      }
   }
   async setCases() {
      axios
         .get(
            `/api/v1/cases?searchTerm=${this.state.searchTerm}&order=${this.state.order}`
         )
         .then((res) => {
            // handle success
            //console.log(res);
            this.setState({
               cases: res.data,
            });
            this.props.dispatch({
               type: actions.STORE_ALL_CASES,
               payload: res.data,
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }
   async setUserCases() {
      const userId = await this.props.adminAccount.id;
      axios
         .get(
            `/api/v1/cases/userCases?userId=${userId}&searchTerm=${this.state.searchTerm}&order=${this.state.order}`
         )
         .then((res) => {
            // handle success
            console.log(res);
            this.setState({
               userCases: res.data,
            });
            this.props.dispatch({
               type: actions.STORE_ALL_CASES,
               payload: res.data,
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }
   render() {
      return (
         <div onLoad={() => this.addEnterListener()}>
            <div className="">
               <div className="py-6 btn-group btn-block ">
                  <Link
                     to="/"
                     className="btn text-light"
                     style={{
                        width: "33%",
                        backgroundColor: "hsl(210, 10%, 27%)",
                     }}
                     onClick={() => {
                        this.logOutCurrentUser();
                     }}
                  >
                     <FontAwesomeIcon
                        type="button"
                        icon={faSignOutAlt}
                        className="mb-n1"
                        size="2x"
                     />
                     <h6 className="btn text-light">
                        <b>Log Out</b>
                     </h6>
                  </Link>
                  <div
                     className="btn text-light"
                     style={{
                        width: "33%",
                        backgroundColor: "hsl(210, 10%, 25%)",
                     }}
                  >
                     <FontAwesomeIcon
                        type="button"
                        icon={faFolderPlus}
                        className="mb-n1"
                        size="2x"
                     />
                     <h6 className="btn text-light">
                        <b>Create New</b>
                     </h6>
                  </div>

                  <div
                     className="btn text-light"
                     style={{
                        width: "33%",
                        backgroundColor: "hsl(210, 10%, 23%)",
                     }}
                     onClick={() => {
                        this.setState(
                           {
                              usingAllCases: !this.state.usingAllCases,
                           },
                           () => {
                              this.setUserCases();
                           }
                        );
                     }}
                  >
                     <FontAwesomeIcon
                        type="button"
                        icon={faUserCircle}
                        className="mb-n1"
                        size="2x"
                     />
                     <h6 className="btn text-light">
                        <b>{this.props.adminAccount.name}</b>
                     </h6>
                  </div>
               </div>
               <div className="container">
                  <div className="row no-gutters my-5">
                     <div className="input-group col-md-6 pr-md-3 pb-3 pb-md-0">
                        <input
                           id="search-cases"
                           className="form-control d-inline"
                        ></input>
                        <div className="input-group-append">
                           {/* <span class="input-group-text" id="basic-addon2">
                              @example.com
                           </span> */}
                           <button
                              className="btn bg-dark text-light py-0"
                              id="search-button"
                              onClick={() => {
                                 this.setSearchTerm();
                              }}
                           >
                              <FontAwesomeIcon
                                 type="button"
                                 icon={faSearch}
                                 className=""
                                 size="2x"
                              />
                           </button>
                        </div>
                     </div>
                     {/* <div className="d-inline col-md-1 mt-n1 "></div> */}
                     <div className="col-md-6 align-bottom d-inline-block pl-md-3">
                        <select
                           id="sort-cases"
                           className="form-control "
                           onChange={(e) => {
                              this.setOrder(e);
                           }}
                        >
                           <option value="cases.sub_title%20ASC">A-Z</option>
                           <option value="cases.sub_title%20DESC">Z-A</option>
                           <option value="cases.last_updated_at%20DESC">
                              Most Recent
                           </option>
                           <option value="cases.last_updated_at%20ASC">
                              Oldest
                           </option>
                        </select>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-12">
                        <div className="">
                           {this.state.cases.length > 0 &&
                              this.state.usingAllCases &&
                              this.state.cases.map((object, index) => {
                                 const url = object.imageUrl;
                                 const name = object.title;
                                 const subTitle = object.subTitle;
                                 const description = object.description;
                                 const user = object.updatedByUserId;
                                 const updatedAt = object.lastUpdatedAt;
                                 return (
                                    <div
                                       key={Math.random()}
                                       className="d-inline-block col-lg-6"
                                    >
                                       <CaseOverview
                                          key={Math.random()}
                                          id={index}
                                          name={name}
                                          userId={object.updatedByUserId}
                                          subTitle={subTitle}
                                          url={url}
                                          description={description}
                                          user={user}
                                          updatedAt={updatedAt}
                                       />
                                    </div>
                                 );
                              })}
                           {this.state.userCases.length > 0 &&
                              this.state.usingAllCases === false &&
                              this.state.userCases.map((object, index) => {
                                 const url = object.imageUrl;
                                 const name = object.title;
                                 const subTitle = object.subTitle;
                                 const description = object.description;
                                 const user = object.updatedByUserId;
                                 const updatedAt = object.lastUpdatedAt;
                                 return (
                                    <div
                                       key={Math.random()}
                                       className="d-inline-block col-lg-6"
                                    >
                                       <CaseOverview
                                          key={Math.random()}
                                          id={index}
                                          name={name}
                                          userId={object.updatedByUserId}
                                          subTitle={subTitle}
                                          url={url}
                                          description={description}
                                          user={user}
                                          updatedAt={updatedAt}
                                       />
                                    </div>
                                 );
                              })}
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
      adminAccount: state.adminAccount,
   };
}

export default connect(mapStateToProps)(AllCasesAdmin);
