import {
    ADD_CONVERSATION,
    ADD_CONVERSATIONS,
    CLEAR_CONVERSATION,
    REMOVE_CONVERSATION,
    SET_CONVERSATIONS,
    SORT_CONVERSATIONS,
} from "./constants/conversation";

export const addConversation = (conversation) => {
    return {
        type: ADD_CONVERSATION, // Lưu ý sửa 'action' thành 'type'
        payload: conversation,
    };
};

export const addConversations = (conversations) => {
    if (!Array.isArray(conversations)) {
        throw new Error("Parameters in 'addConversations()' must be an array");
    }

    return {
        type: ADD_CONVERSATIONS,
        payload: conversations,
    };
};

export const clearConversation = () => {
    return {
        type: CLEAR_CONVERSATION,
    };
};

export const removeConversation = (conversationId) => {
    return {
        type: REMOVE_CONVERSATION,
        payload: conversationId,
    };
};

export const setConversations = (conversations) => {
    if (!Array.isArray(conversations)) {
        throw new Error("Parameters in 'setConversations()' must be an array");
    }
    return {
        type: SET_CONVERSATIONS,
        payload: conversations,
    };
};

export const sortConversations = (comparator) => {
    if (typeof comparator !== "function") {
        throw new Error("Parameters in 'sortConversations()' must be a function");
    }

    return {
        type: SORT_CONVERSATIONS,
        payload: comparator,
    };
};
