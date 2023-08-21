import { combineReducers } from "redux";
import chatboxReducer from "./chatbox.reducer";
import conversationReducer from "./conversation.reducer";
import notificationReducer from "./notification.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    notifications: notificationReducer,
    conversations: conversationReducer,
    chatbox: chatboxReducer
});

export default rootReducer;
