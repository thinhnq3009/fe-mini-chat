import style from "./NotificationContainer.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { NotificationItem } from "~/components/common/NotificationItem";

const cx = classNames.bind(style);

function NotificationContainer() {
    const notifications = useSelector((state) => state.notifications);

    return (
        <div className={cx("container")}>
            {notifications.map((notification, index) => {
                if (notification == null) {
                    return;
                }
                return <NotificationItem key={index} index={index} {...notification} />;
            })}
        </div>
    );
}

export default NotificationContainer;
