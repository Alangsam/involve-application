import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../store/actions";
import axios from "axios";
import { format } from "date-fns";

class CaseOverview extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         id: "",
      };
   }

   componentDidMount() {
      axios
         .get(`/api/v1/users?id=${this.props.userId}`)
         .then((response) => {
            //console.log(response.data[0].name);
            this.setState({ id: response.data[0].name });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   truncateDescription() {
      if (this.props.description.length > 250) {
         let truncatedString = "";
         truncatedString = this.props.description.slice(0, 250) + "...";
         return truncatedString;
      } else {
         return this.props.description;
      }
   }

   storeIndexOfCase() {
      this.props.dispatch({
         type: actions.STORE_INDEXOF_CASE,
         payload: this.props.id,
      });
      //console.log(this.props.id);
   }

   render() {
      return (
         <div className="card mb-6 bg-transparent">
            {/* <h2 className="text-center bg-dark text-light mb-0 rounded-top  py-1"></h2> */}
            <div className="col px-0">
               <img
                  src={this.props.url}
                  alt="forgot this dudes name"
                  className="w-100"
               />
               <div className="caption bg-translucent text-center">
                  <h3 className="text-dark">{this.props.subTitle}</h3>
               </div>
            </div>
            <h6 className="text-muted">
               <b>{this.state.id + " "}</b>

               <b className="text-muted">
                  on {format(this.props.updatedAt, "PPPpp")}
               </b>
            </h6>
            <p
               className="text-left"
               dangerouslySetInnerHTML={{ __html: this.truncateDescription() }}
            ></p>
            <div>
               <Link
                  to="/case-name"
                  className="btn btn-dark text-light w-25 float-right"
                  onClick={() => {
                     this.storeIndexOfCase();
                  }}
               >
                  view more
               </Link>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      indexOfSelectedCase: state.indexOfSelectedCase,
   };
}

export default connect(mapStateToProps)(CaseOverview);
