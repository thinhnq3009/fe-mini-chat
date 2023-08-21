import style from "./ConversationItem.module.scss";
import classNames from "classnames/bind";
import useTime from "~/hooks/useTime";

const cx = classNames.bind(style);

function ConversationItem({
    avatar,
    name,
    lastMessage,
    timeSent,
    active,
    online = true,
    chatting = false,
    ...passProps
}) {
    const sentAt = useTime(lastMessage.sentAt);

    return (
        <div className={cx("wrapper", { active })}>
            <img className={cx("avatar")} src={avatar} alt={name} />
            <div className={cx("info", {online})}>
                <h6 className={cx("title")}>{name}</h6>
                {lastMessage && (
                    <>
                        <span className={cx("last-message")}>{lastMessage.content}</span>
                        <span className={cx("sent-at")}>{sentAt.fromNow}</span>
                    </>
                )}
            </div>
        </div>
    );
}

export default ConversationItem;
