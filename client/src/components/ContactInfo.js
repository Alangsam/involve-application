import React from "react";

export default class ContactInfo extends React.Component {
   constructor() {
      super();
      this.state = {
         contactsShown: true,
         detailsShown: false,
         buttonShown: true,
      };
   }

   // renderContacts() {
   //     const props = this.props;
   //     const newArr = [];
   //     for (let i = 0; i < props.case.howToContact.length; i += 1) {
   //         newArr.push(<p key={[i]}>{props.case.howToContact[i]}</p>);
   //     }
   //     console.log(newArr);
   //     return newArr;
   // }
   // renderWhoToContact() {
   //     const props = this.props;
   //     const newArr = [];
   //     for (let i = 0; i < props.case.whoToContact.length; i += 1) {
   //         newArr.push(<p key={[i]}>{props.case.whoToContact[i]}</p>);
   //     }
   //     return newArr;
   // }
   render() {
      const props = this.props;
      return (
         <div>
            {this.state.buttonShown && (
               <button
                  className="btn btn-block btn-dark"
                  onClick={() => {
                     this.setState({
                        contactsShown: false,
                        detailsShown: true,
                        buttonShown: false,
                     });
                  }}
               >
                  Get Involved
               </button>
            )}
            {this.state.detailsShown === false && <div>Name</div>}
            {this.state.detailsShown === false && <div>Number</div>}
            {this.state.detailsShown === false && <div>Email</div>}

            {this.state.detailsShown && (
               <div>Name: {this.props.case.contactName}</div>
            )}
            {this.state.detailsShown && (
               <div>Number: {this.props.case.contactPhone}</div>
            )}
            {this.state.detailsShown && (
               <div>Email: {this.props.case.contactEmail}</div>
            )}
         </div>
      );
   }
}
