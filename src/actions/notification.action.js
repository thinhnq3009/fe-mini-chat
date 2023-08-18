import {
    ADD_NOTIFICATION,
    ADD_SUCCESS,
    ADD_WARNING,
    REMOVE_NOTIFICATION,
} from "./constants/notification";

const templatePayload = {
    text: "",
    type: "info",
    duration: 3000,
};

export const addNotification = (text, type = "info", duration = 3000) => ({
    type: ADD_NOTIFICATION,
    payload: {
        text,
        type,
        duration,
    },
});

// export const addSuccessNotification = (text, duration = 3000) => ({
//     type: ADD_SUCCESS,
//     payload: {
//         text,
//         type: 'success',
//         duration,
//     }
// });

// export const addWarningNotification = (text, duration = 3000) => ({
//     type: ADD_WARNING,
//     payload: {
//         text,
//         type: 'warning',
//         duration,
//     }
// });

export const removeNotification = (notificationIndex) => ({
    type: REMOVE_NOTIFICATION,
    payload: notificationIndex,
});
