import { LOGIN, LOGOUT, REMOVE_TOKEN, SET_TOKEN } from "~/actions/constants/user";

const initialState = {
    token: null,
    user: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            localStorage.setItem("token", action.payload);
            return {
                ...state,
                token: action.payload,
            };
        case REMOVE_TOKEN:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
            };
        case LOGIN:
            localStorage.setItem("token", action.payload.token);
            return {
                token: action.payload.token,
                user: action.payload.user,
            };
        case LOGOUT:
            localStorage.removeItem("token");
            return initialState;
        default:
            return state;
    }
};

export default userReducer;
