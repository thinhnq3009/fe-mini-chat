import style from "./LoginPage.module.scss";
import classNames from "classnames/bind";
import { BiUser } from "react-icons/bi";
import { BsKey, BsEyeSlash, BsEye } from "react-icons/bs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const cx = classNames.bind(style);

function LoginPage() {
    const [show, setShow] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const PasswordIcon = show ? BsEye : BsEyeSlash;
    const passwordType = show ? "text" : "password";

    const onSubmit = (data) => console.log(data);

    console.log(watch("username"));

    return (
        <div className={cx("container")}>
            <div className={cx("card")}>
                <div className={cx("header")}>Login Form</div>
                <div className={cx("body")}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={cx("form-group")}>
                            <label>Username</label>
                            <BiUser className={cx("icon", "icon-left")} />
                            <input
                                {...register("username", { required: true })}
                                type="text"
                                placeholder="Enter your username"
                            />
                            <small>Error</small>
                        </div>{" "}
                        <div className={cx("form-group")}>
                            <label>Password</label>
                            <BsKey className={cx("icon", "icon-left")} />
                            <input
                                {...register("password", { required: true })}
                                type={passwordType}
                                placeholder="Enter your password"
                            />
                            <PasswordIcon
                                className={cx("icon", "icon-right")}
                                onClick={() => setShow(!show)}
                            />
                            <small></small>
                        </div>
                        <button className={cx("submit-btn")}>Login</button>
                    </form>
                </div>
                <div className={cx("card-text")}>
                    Do not have an account ? <Link to="/register">Register account here</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
