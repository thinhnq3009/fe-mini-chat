import {
    ADD_MESSAGE,
    ADD_MESSAGES,
    SET_MESSAGES,
    SET_PAGE,
    SET_CONVERSATION,
} from "./constants/chatbox";

export const addMessage = (messageObject) => {
    return {
        type: ADD_MESSAGE,
        payload: messageObject,
    };
};
export const addMessages = (messages) => {
    if (!Array.isArray(messages)) {
        throw new Error("Parameter in 'addMessages()' must be an array");
    }

    return {
        type: ADD_MESSAGES,
        payload: messages,
    };
};
export const setMessages = (messages) => {
    if (!Array.isArray(messages)) {
        throw new Error("Parameter in 'setMessages()' must be an array");
    }
    return {
        type: SET_MESSAGES,
        payload: messages,
    };
};
export const setPage = (page) => {
    return {
        type: SET_PAGE,
        payload: page,
    };
};

export const setConversation = (conversation) => {
    return {
        type: SET_CONVERSATION,
        payload: conversation,
    };
};
