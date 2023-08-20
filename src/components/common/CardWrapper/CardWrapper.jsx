import style from "./CardWrapper.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function CardWrapper({ header, footer, children }) {
    return <div className={cx("wrapper")}>
        {children}
    </div>;
}

export default CardWrapper;
