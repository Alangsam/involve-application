import actions from "../actions";

export default function adminAccount(adminAccount = {}, action) {
    switch (action.type) {
        case actions.STORE_CURRENT_ADMIN:
            return action.payload;
        default:
            return adminAccount;
    }
}
