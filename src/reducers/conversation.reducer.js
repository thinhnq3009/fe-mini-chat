import {
    ADD_CONVERSATION,
    ADD_CONVERSATIONS,
    CLEAR_CONVERSATION,
    REMOVE_CONVERSATION,
    SET_CONVERSATIONS,
    SORT_CONVERSATIONS,
} from "~/actions/constants/conversation";

const initialState = [];

const conversationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONVERSATION:
            return [...state, action.payload];
        case ADD_CONVERSATIONS:
            return [...state, ...action.payload];
        case SET_CONVERSATIONS: 
            return [...action.payload];
        case CLEAR_CONVERSATION:
            return initialState;
        case REMOVE_CONVERSATION:
            return state.filter((i, index) => index !== action.payload);
        case SORT_CONVERSATIONS:
            return state.sort(action.payload);
        default:
            return state;
    }
};

export default conversationReducer;
