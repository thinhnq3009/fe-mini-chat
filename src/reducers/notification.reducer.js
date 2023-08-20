import {
    ADD_NOTIFICATION,
    REMOVE_NOTIFICATION,
} from "~/actions/constants/notification";

const initialState = [
  
];

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return [...state, action.payload];
        case REMOVE_NOTIFICATION:
            return state.filter((item, id) => id != action.payload);
        default:
            return state;
    }
};

export default notificationReducer;
