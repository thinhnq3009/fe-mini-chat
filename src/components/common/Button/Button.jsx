import style from "./Button.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function Button({ hover, children, ...passProps }) {
    const classNames = cx("btn", { hover });

    return <button className={classNames} {...passProps}>{children}</button>;
}


export default Button;
