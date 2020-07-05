import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../store/actions";

class CaseOverview extends React.Component {
   constructor(props) {
      super(props);
   }

   truncateDescription() {
      if (this.props.description.length > 150) {
         let truncatedString = "";
         truncatedString = this.props.description.slice(0, 150) + "...";
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
      console.log(this.props.id);
   }

   render() {
      return (
         <div className="card mb-6 bg-transparent">
            <h2 className="text-center bg-dark text-light mb-0 rounded-top">
               {this.props.name}
            </h2>
            <div className="hmmm">
               <img
                  src={this.props.url}
                  alt="forgot this dudes name"
                  className="thumb-post rounded-bottom"
               />
            </div>

            <h5 className="text-center">{this.truncateDescription()}</h5>
            <h6 className="">
               <b>posted by {this.props.user} on jan/1/20 at 11:11pm</b>
            </h6>
            <Link
               to="/case-name"
               className="btn btn-dark text-light"
               onClick={() => {
                  this.storeIndexOfCase();
               }}
            >
               <h3>view more</h3>
            </Link>
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
