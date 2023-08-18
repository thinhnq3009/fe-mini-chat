import {
    ADD_NOTIFICATION,
    REMOVE_NOTIFICATION,
} from "~/actions/constants/notification";

const initialState = [
    {
        text: "This is a new notification",
        type: "info",
        duration: 3000,
    },
    {
        text: "This is a new notification",
        type: "error",
        duration: 3000,
    },
    {
        text: "This is a new notification",
        type: "warning",
        duration: 3000,
    },
    {
        text: "This is a new notification",
        type: "success",
        duration: 3000,
    },
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
