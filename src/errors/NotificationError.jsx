class NotificationError extends Error {
    constructor(notificationType) {
        super(`"${notificationType}" is invalid. Try other types.`);
        this.name = "NotificationError";
        this.notificationType = notificationType;
    }
}


export default NotificationError