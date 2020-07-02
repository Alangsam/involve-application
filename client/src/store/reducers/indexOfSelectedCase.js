import actions from "../actions";

export default function indexOfSelectedCase(indexOfSelectedCase = 0, action) {
    let newIndex = indexOfSelectedCase;
    switch (action.type) {
        case actions.STORE_INDEXOF_CASE:
            newIndex = action.payload;
            return newIndex;
        default:
            return newIndex;
    }
}
