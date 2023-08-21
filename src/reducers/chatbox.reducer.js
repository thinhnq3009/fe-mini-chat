// reducers/chatboxReducer.js
import { ADD_MESSAGE, ADD_MESSAGES, SET_CONVERSATION, SET_MESSAGES, SET_PAGE } from "~/actions/constants/chatbox";

const initialState = {
    messages: [],
    conversation: {},
    currentPage: 1,
};

const chatboxReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        case ADD_MESSAGES:
            return {
                ...state,
                messages: [...state.messages, ...action.payload],
            };
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.payload,
            };
        case SET_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };
        case SET_CONVERSATION: 
            return {
                ...state,
                conversation: action.payload,
            }
        default:
            return state;
    }
};

export default chatboxReducer;
