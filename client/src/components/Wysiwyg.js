import React, { Component } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import { connect } from "react-redux";

class Wysiwyg extends Component {
   constructor(props) {
      super(props);
      this.state = {
         editorState: EditorState.createEmpty(),
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

   render() {
      const { editorState } = this.state;

      // If the user changes block type before entering any text, we can
      // either style the placeholder or hide it. Let's just hide it now.
      // eslint-disable-next-line

      return (
         <div
            onClick={(e) => {
               console.log(e.target);
            }}
         >
            <div className="RichEditor-root pb-6">
               <InlineStyleControls
                  editorState={editorState}
                  onToggle={this.toggleInlineStyle}
               />
               <Editor
                  editorState={this.state.editorState}
                  onChange={this.onChange}
                  customStyleMap={styleMap}
                  spellCheck={true}
                  placeholder={
                     this.props.allCases[this.props.indexOfSelectedCase]
                        .description
                  }
               />
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
   };
}

export default connect(mapStateToProps)(Wysiwyg);
