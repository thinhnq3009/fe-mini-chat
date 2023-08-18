import { LOGIN, LOGOUT, REMOVE_TOKEN, SET_TOKEN } from "~/actions/constants/user";

const template = {
    token: null,
    user: {},
};

export const login = (payload = template) => {
    return {
        type: LOGIN,
        payload,
    };
};

export const logout = () => {
    return {
        type: LOGOUT,
    };
};

export const setToken = (payload = "") => {
    return {
        type: SET_TOKEN,
        payload,
    };
};

export const removeToken = () => {
    return {
        type: REMOVE_TOKEN,
    };
};
