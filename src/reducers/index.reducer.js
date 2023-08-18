import { combineReducers } from "redux";
import notificationReducer from "./notification.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    notifications: notificationReducer 
});

export default rootReducer;
