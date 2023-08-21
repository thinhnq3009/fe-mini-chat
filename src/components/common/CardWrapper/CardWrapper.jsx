import style from "./CardWrapper.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function CardWrapper({
    header,
    footer,
    children,
    className,
    bodyOverXScroll = false,
    bodyOverYScroll = false,
    bodyOverScroll = false,
}) {
    const isText = (obj) => typeof obj === "string";

    return (
        <div className={cx("wrapper") + " " + className}>
            {header && (
                <header className={cx("header", { textOnly: isText(header) })}>{header}</header>
            )}
            <main
                className={cx("body", {
                    textOnly: isText(children),
                    bodyOverScroll,
                    bodyOverXScroll,
                    bodyOverYScroll,
                })}
            >
                {children}
            </main>
            {footer && (
                <footer className={cx("footer", { textOnly: isText(footer) })}>{footer}</footer>
            )}
        </div>
    );
}

export default CardWrapper;
