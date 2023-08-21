import { combineReducers } from "redux";
import conversationReducer from "./conversation.reducer";
import notificationReducer from "./notification.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    notifications: notificationReducer,
    conversations: conversationReducer
});

export default rootReducer;
