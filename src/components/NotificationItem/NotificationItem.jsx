import { IoMdClose } from "react-icons/io";
import style from "./NotificationItem.module.scss";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import useNotification from "~/hooks/useNotification";
import { useEffect, useState } from "react";

const cx = classNames.bind(style);

function NotificationItem({ text, type, index, duration }) {
    const { removeNotification } = useNotification();
    const [out, setOut] = useState(false);
    let timeOutId = undefined;
    useEffect(() => {
        timeOutId = setTimeout(closeHandler, duration || 3000);
    },[]);

    const closeHandler = () => {
        setOut(true);
        clearTimeout(timeOutId);
        setTimeout(() => {
            removeNotification(index);
        }, 1000);
    };

    return (
        <div className={cx("item", type, { out: out })}>
            <span>
                <span className={cx("icon")}></span>
                <span className={cx("text")}>{text}</span>
            </span>
            <span onClick={closeHandler} className={cx("close")}>
                <IoMdClose />
            </span>
        </div>
    );
}

export default NotificationItem;
