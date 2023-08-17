import style from "./HomePage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function HomePage() {
    return (
        <div className={cx("container")}>
           HomePage
        </div>
    );
}

export default HomePage;
