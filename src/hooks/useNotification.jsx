import { useDispatch } from "react-redux";
import { info } from "sass";
import TYPES_NOTIFICATION from "~/actions/constants/notification";
import { addNotification as actionCreator, removeNotification } from "~/actions/notification.action";
import NotificationError from "~/errors/NotificationError";

function useNotification() {

    const dispatch = useDispatch();

    const addNotification = function (text, type = "info", duration = 3000) {
        if (!TYPES_NOTIFICATION.includes(type.toLowerCase())) {
            throw new NotificationError(type);
        }
        dispatch(actionCreator(text, type, duration));
    };
    return {
        addNotification,
        addSuccessNotification: function (text, duration) {
            addNotification(text, "success", duration);
        },
        addWarningNotification: function (text, duration) {
            addNotification(text, "warning", duration);
        },
        addErrorNotification: function (text, duration) {
            addNotification(text, "error", duration);
        },
        addInfoNotification: function (text, duration) {
            addNotification(text, "info", duration);
        },
        removeNotification: function (index) {
            console.log('removeNotification called ' + index );
            dispatch(removeNotification(index));
        }
    }
}

export default useNotification;
