import React from "react";
import ContactInfo from "./ContactInfo";
import { connect } from "react-redux";
import axios from "axios";
import { format } from "date-fns";

class CaseDesc extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         id: "",
      };
   }

   componentDidMount() {
      const exampleCase = this.props.allCases[this.props.indexOfSelectedCase];
      axios
         .get(`/api/v1/users?id=${exampleCase.updatedByUserId}`)
         .then((response) => {
            //console.log(response.data);
            this.setState({ id: response.data[0].name });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   render() {
      const exampleCase = this.props.allCases[this.props.indexOfSelectedCase];
      //console.log(exampleCase);
      return (
         <div>
            {/* <div className="text-center text-dark">
               <h1>{exampleCase.title}</h1>
            </div> */}
            <div className="clearfix pb-4"></div>
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
                     <h6 className="">
                        <b>{this.state.id}</b>
                     </h6>
                     <div className="clearfix"></div>
                     <h6 className="">
                        <b>{format(exampleCase.lastUpdatedAt, "PPPpp")}</b>
                     </h6>
                  </div>
               </div>
               <div className="clearfix"></div>
               <div id="left-text" className="col-8">
                  <p
                     dangerouslySetInnerHTML={{
                        __html: exampleCase.description,
                     }}
                  ></p>
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
