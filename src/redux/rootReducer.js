import { combineReducers } from "redux";
import { userReducer, USERS_FEATURE_KEY } from "./user/user-reducer";

let rootReducer=combineReducers({
    [USERS_FEATURE_KEY]:userReducer
})

export {rootReducer}