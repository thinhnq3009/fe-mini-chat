import style from "../LoginPage/LoginPage.module.scss";
import classNames from "classnames/bind";
import { BiUser } from "react-icons/bi";
import { BsKey, BsEyeSlash, BsEye } from "react-icons/bs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import authenticateApi from "~/apis/authenticateApi";
import {  useNavigate } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { Button } from "~/components/common/Button";
import { CardWrapper } from "~/components/common/CardWrapper";
import useNotification from "~/hooks/useNotification";
const cx = classNames.bind(style);

function RegisterPage() {
    const [show, setShow] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const { register: apiRegister } = authenticateApi();
    const {  addNotification } = useNotification();
    const navigate = useNavigate();
    const PasswordIcon = show ? BsEye : BsEyeSlash;
    const passwordType = show ? "text" : "password";

    const onSubmit = (data) => {
        apiRegister(data)
            .then(({statusCode, message}) => {
                if (statusCode !== 200) {
                    addNotification(message, 'info')
                }
                addNotification(message, 'success')
                navigate("/login");

            })
            .catch(({ message }) => {
                addNotification(message, 'error');
            });
    };

    console.log(watch("username"));

    return (
        <div className={cx("container")}>
            <div className={cx("wrapper")}>
                <CardWrapper className="px-5">
                    <div className={cx("header")}>Register Account</div>
                    <div className={cx("body")}>
                        <form onSubmit={handleSubmit(onSubmit)} autoComplete={false}>
                            <div className={cx("form-group")}>
                                <label>Username</label>
                                <BiUser className={cx("icon", "icon-left")} />
                                <input
                                    {...register("username", { required: true })}
                                    type="text"
                                    placeholder="Enter your username"
                                />
                                {errors.username && <small className={cx("error")}></small>}
                            </div>
                            <div className={cx("form-group")}>
                                <label>Display Name</label>
                                <BiUser className={cx("icon", "icon-left")} />
                                <input
                                    {...register("displayName", { required: true })}
                                    type="text"
                                    placeholder="Enter your display name"
                                />
                                {errors.displayName && <small className={cx("error")}></small>}
                            </div>
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
                                {errors.username && <small className={cx("error")}></small>}
                            </div>
                            <div className={cx("form-group")}>
                                <label>Password</label>
                                <BsKey className={cx("icon", "icon-left")} />
                                <input
                                    {...register("confirmPassword", { required: true })}
                                    type={passwordType}
                                    placeholder="Enter your password again"
                                />
                                <PasswordIcon
                                    className={cx("icon", "icon-right")}
                                    onClick={() => setShow(!show)}
                                />
                                {errors.confirmPassword && <small className={cx("error")}></small>}
                            </div>
                            <Button hover>Login</Button>
                        </form>
                    </div>
                    <div className={cx("card-text")}>
                        Do you have an account ? <Link to="/login">Login here</Link>
                    </div>
                </CardWrapper>
            </div>
        </div>
    );
}

export default RegisterPage;
