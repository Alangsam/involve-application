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
      this.state = {
         order: "cases.title%20ASC",
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
            console.log(document.getElementById("search-button"));
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
            console.log(res);
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
                        <h6
                           className="btn btn-dark"
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
                           {this.props.adminAccount.name}
                        </h6>
                     </div>
                     <div className="d-inline col-1 mt-n1 mr-n3 ml-3">
                        <button
                           className="btn"
                           id="search-button"
                           onClick={() => {
                              this.setSearchTerm();
                           }}
                        >
                           <FontAwesomeIcon
                              type="button"
                              icon={faSearch}
                              className="float-right"
                              size="2x"
                           />
                        </button>
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
                           onChange={(e) => {
                              this.setOrder(e);
                           }}
                        >
                           <option value="cases.title%20ASC">A-Z</option>
                           <option value="cases.title%20DESC">Z-A</option>
                           <option value="cases.created_at%20DESC">
                              Most Recent
                           </option>
                           <option value="cases.created_at%20ASC">
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

                                 return (
                                    <div
                                       key={Math.random()}
                                       className="d-inline-block col-lg-6"
                                    >
                                       <CaseOverview
                                          key={Math.random()}
                                          id={index}
                                          name={name}
                                          subTitle={subTitle}
                                          url={url}
                                          description={description}
                                          user={user}
                                       />
                                    </div>
                                 );
                              })}
                           {this.state.userCases.length > 0 &&
                              this.state.usingAllCases === false &&
                              this.state.userCases.map((object, index) => {
                                 const url = object.imageUrl;
                                 const name = object.title;
                                 const description = object.description;
                                 const user = object.updatedByUserId;

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
                                          description={description}
                                          user={user}
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
