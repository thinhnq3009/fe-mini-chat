import style from "./ModalWrapper.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function ModalWrapper({ show = false, children}) {
    return <div className={cx("wrapper", { closed: !show })}>
        {children}
    </div>;
}

export default ModalWrapper;
