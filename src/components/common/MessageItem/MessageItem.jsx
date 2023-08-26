import useTime from "~/hooks/useTime";
import style from "./MessageItem.module.scss";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css'
import { useSelector } from "react-redux";
import quickSelector from "~/services/quickSeletor";

const cx = classNames.bind(style);

function MessageItem({ content,  sentAt, sender }) {

    const selector = quickSelector();

    const username = useSelector(selector.getUsername)

    const isMine = username === sender.username;

    const { string } = useTime(sentAt, 'HH:mm:ss');
    // console.log(sender);
    return (
        <div className={cx("item", { isMine })}>
            {sender && (
                <Tippy content={sender.username} delay={[0, 0]}>
                    <img className={cx("avatar")} src={sender.avatarUrl} alt={sender.displayName} />
                </Tippy>
            )}
            <p className={cx("content")}>{content}</p>
            <span className={cx("sent-at")}>{string}</span>
        </div>
    );
}

export default MessageItem;
