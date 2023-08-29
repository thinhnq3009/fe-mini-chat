import style from "./LoginPage.module.scss";
import classNames from "classnames/bind";
import { BiUser } from "react-icons/bi";
import { BsKey, BsEyeSlash, BsEye } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import authenticateApi from "~/apis/authenticateApi";
import useNotification from "~/hooks/useNotification";
import { useDispatch } from "react-redux";
import { login } from "~/actions/user.action";
import { Button } from "~/components/common/Button";
import { CardWrapper } from "~/components/common/CardWrapper";
const cx = classNames.bind(style);

function LoginPage() {
    const [show, setShow] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const {addSuccessNotification, addErrorNotification} = useNotification();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loginApi } = authenticateApi();

    const PasswordIcon = show ? BsEye : BsEyeSlash;
    const passwordType = show ? "text" : "password";

    const onSubmit = (data) => {
        // addSuccessNotification(data.username);
        loginApi(data)
            .then((response) => {
                dispatch(login(response.data));   
                addSuccessNotification(`Welcome back ${response.data.user.displayName}`);         
                window.location.href = "/#chat"
            })
            .catch((err) => {
                addErrorNotification(err.message);
            });
    };

    useEffect(() => {
        document.title = "Welcome to Mini Chat";
    }, []);

    return (
        <div className={cx("container")}>
            <div className={cx("wrapper")}>
               <CardWrapper className="px-5">
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
                                {errors.username && <small>Please enter username</small>}
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
                                 {errors.password && <small>Please enter password</small>}
                            </div>
                            <Button hover>Login</Button>
                        </form>
                    </div>
                    <div className={cx("card-text")}>
                        Do not have an account ? <Link to="/register">Register account here</Link>
                    </div>
               </CardWrapper>
            </div>
        </div>
    );
}

export default LoginPage;
