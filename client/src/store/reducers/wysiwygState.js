import actions from "../actions";

export default function wysiwygState(wysiwygState = {}, action) {
   switch (action.type) {
      case actions.STORE_WYSIWYG:
         return action.payload;
      default:
         return wysiwygState;
   }
}
