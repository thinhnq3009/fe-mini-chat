import style from "../LoginPage/LoginPage.module.scss";
import classNames from "classnames/bind";
import { BiUser } from "react-icons/bi";
import { BsKey, BsEyeSlash, BsEye } from "react-icons/bs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import authenticateApi from "~/apis/authenticateApi";
import { Link } from "react-router-dom";
import { Button } from "~/components/common/Button";
import { CardWrapper } from "~/components/common/CardWrapper";
const cx = classNames.bind(style);

function RegisterPage() {
    const [show, setShow] = useState(false);
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const {register: apiRegister} = authenticateApi();
    const PasswordIcon = show ? BsEye : BsEyeSlash;
    const passwordType = show ? "text" : "password";

    const onSubmit = data => {
       apiRegister(data)
       .then(response => {
            console.log(response);
       })
       .catch(err => {
            console.log(err);
       })
    };

    console.log(watch('username'))

    return (
        <div className={cx("container")}>
            <div className={cx("wrapper")}>
                <CardWrapper>
                    <div className={cx("header")}>Login Form</div>
                    <div className={cx("body")}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={cx("form-group")}>
                                <label>Username</label>
                                <BiUser className={cx("icon", "icon-left")} />
                                <input 
                                {...register("username", {required: true})}
                                type="text" 
                                placeholder="Enter your username"/>
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
                                {...register("password", {required: true})}
                                type={passwordType} 
                                placeholder="Enter your password"/>
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
                                {...register("confirmPassword", {required: true})}
                                type={passwordType} 
                                placeholder="Enter your password again"/>
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
                        Do you have an account ?  <Link to="/login">Login here</Link>
                    </div>
                </CardWrapper>
            </div>
        </div>
    );
}

export default RegisterPage;
