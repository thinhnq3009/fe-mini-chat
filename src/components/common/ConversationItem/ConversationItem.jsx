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
    onClick = () => {},
    isHeader = false,
}) {
    const sentAt = useTime(lastMessage ? lastMessage.sentAt : null);

    // console.log("Pass props", passProps);

    return (
        <div className={cx("wrapper", { active })} onClick={onClick} >
            <img className={cx("avatar")} src={avatar} alt={name} />
            <div className={cx("info", { online })}>
                <h6 className={cx("title")}>{name}</h6>
                {lastMessage && (
                    <>
                        <span className={cx("last-message", { hidden: isHeader })}>
                            {lastMessage.content}
                        </span>
                        <span className={cx("sent-at", { hidden: isHeader })}>
                            {sentAt.fromNow}
                        </span>
                        {/* <span className={cx("sent-at", { hidden: !isHeader })}>
                            {onlineAt.fromNow}
                        </span> */}
                    </>
                )}
            </div>
        </div>
    );
}

export default ConversationItem;
