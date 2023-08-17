import style from "./Header.module.scss";
import classNames from "classnames/bind";
import logo from "~/images/3.svg";
const cx = classNames.bind(style);

function Header({}) {
    return (
        <header className={cx("container")}>
            <div className={cx("wrapper")}>
                <div className={cx("logo-container")}>
                    <img className={cx("logo")} src={logo} alt="Mini Chat" width={50} height={50} />
                    Mini Chat
                </div>
                <div className={cx("user-info")}>Nguyễn Thịnh</div>
            </div>
        </header>
    );
}

export default Header;
