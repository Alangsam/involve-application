import React, { Component } from "react";
import {
   Editor,
   EditorState,
   RichUtils,
   getCurrentContent,
   ContentState,
   convertToRaw,
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { connect } from "react-redux";
import actions from "../store/actions";

class Wysiwyg extends Component {
   constructor(props) {
      super(props);
      this.state = {
         editorState: EditorState.createEmpty(),
         placeholderExists: this.props.placeholderExists,
         objectForStorage: {},
      };
      this.focus = () => this.refs.editor.focus();
      this.onChange = (editorState) => this.setState({ editorState });
      this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
   }

   _toggleInlineStyle(inlineStyle) {
      this.onChange(
         RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
      );
   }

   sendWysiwygToStore() {
      this.props.dispatch({
         type: actions.STORE_WYSIWYG,
         payload: this.state.objectForStorage,
      });
   }

   render() {
      const { editorState } = this.state;

      // If the user changes block type before entering any text, we can
      // either style the placeholder or hide it. Let's just hide it now.
      // eslint-disable-next-line

      return (
         <div id="case-description-input">
            <div className="RichEditor-root">
               <InlineStyleControls
                  editorState={editorState}
                  onToggle={this.toggleInlineStyle}
               />
               <Editor
                  id="case-description-input"
                  editorState={this.state.editorState}
                  onChange={this.onChange}
                  customStyleMap={styleMap}
                  spellCheck={true}
                  placeholder={
                     this.state.placeholderExists &&
                     this.props.allCases[this.props.indexOfSelectedCase]
                        .description
                  }
               />
               <button
                  className="btn-dark w-100 rounded-bottom"
                  type="submit"
                  onClick={async () => {
                     await this.setState({
                        objectForStorage: stateToHTML(
                           this.state.editorState.getCurrentContent()
                        ),
                     });
                     this.sendWysiwygToStore();
                     // console.log(
                     //    this.state.editorState
                     //       .getCurrentContent()
                     //       .getPlainText(),
                     //    this.state.objectForStorage,
                     //    convertToRaw(this.state.objectForStorage)
                     // );
                     console.log(
                        stateToHTML(this.state.editorState.getCurrentContent())
                     );
                  }}
               >
                  Save
               </button>
            </div>
         </div>
      );
   }
}
const styleMap = {
   CODE: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
   },
};

class StyleButton extends React.Component {
   constructor() {
      super();
      this.onToggle = (e) => {
         e.preventDefault();
         this.props.onToggle(this.props.style);
      };
   }
   render() {
      // let className = "RichEditor-styleButton";
      // if (this.props.active) {
      //     className += " RichEditor-activeButton";
      // }
      return (
         <button className={"btn "} onMouseDown={this.onToggle}>
            {this.props.label}
         </button>
      );
   }
}

const INLINE_STYLES = [
   {
      label: "Bold",
      style: "BOLD",
   },
   {
      label: "Italic",
      style: "ITALIC",
   },
   {
      label: "Underline",
      style: "UNDERLINE",
   },
   {
      label: "Monospace",
      style: "CODE",
   },
];

const InlineStyleControls = (props) => {
   var currentStyle = props.editorState.getCurrentInlineStyle();
   return (
      <div className=" border-bottom border-dark">
         {INLINE_STYLES.map((type) => (
            <StyleButton
               key={type.label}
               active={currentStyle.has(type.style)}
               label={type.label}
               onToggle={props.onToggle}
               style={type.style}
            />
         ))}
      </div>
   );
};

function mapStateToProps(state) {
   return {
      indexOfSelectedCase: state.indexOfSelectedCase,
      allCases: state.allCases,
      adminAccount: state.adminAccount,
      wysiwygState: state.wysiwygState,
   };
}

export default connect(mapStateToProps)(Wysiwyg);
