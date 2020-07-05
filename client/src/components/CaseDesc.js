import React from "react";
import ContactInfo from "./ContactInfo";
import { connect } from "react-redux";

class CaseDesc extends React.Component {
   constructor() {
      super();
      this.state = {};
   }

   render() {
      const exampleCase = this.props.allCases[this.props.indexOfSelectedCase];
      console.log(exampleCase);
      return (
         <div>
            <div className="text-center text-dark">
               <h1>{exampleCase.title}</h1>
            </div>
            <img
               className="w-100 rounded"
               src={exampleCase.imageUrl}
               alt={exampleCase.title}
            />
            <div className="row">
               <div id="top-text" className="col-8 ">
                  <h1 className="d-block">{exampleCase.subTitle}</h1>
                  {/* figure out using capital w what is the most characters someone
                        can put here to maintain a single line */}
                  <div id="last-date-edited">
                     <h6 className="d-inline-block align-bottom">
                        <b>{exampleCase.lastUpdatedAt}</b>
                     </h6>
                     <h6 className="float-md-right d-inline-block align-bottom">
                        <b>{exampleCase.updatedByUserId}</b>
                     </h6>
                  </div>
               </div>
               <div className="clearfix"></div>
               <div id="left-text" className="col-8">
                  <p>{exampleCase.description}</p>
               </div>
               <div id="right-text" className="col-4">
                  <ContactInfo case={exampleCase} />
               </div>
            </div>

            <div className="mt-9"></div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      indexOfSelectedCase: state.indexOfSelectedCase,
      allCases: state.allCases,
   };
}

export default connect(mapStateToProps)(CaseDesc);
