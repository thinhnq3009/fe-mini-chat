import axiosClient from "~/utils/axiosClient";
import { checker } from "~/utils/propertiesChecker";

export default function authenticateApi() {
    return {
        register: function (data) {
            checker(data, ["username", "displayName", "password", "confirmPassword"]);
            return axiosClient.post("/auth/register", data);
        },
        loginApi: function (data) {
            checker(data, ["username", "password"]);
            return axiosClient.post("/auth/login", data);
        },
        authenticateToken: function () {
            return axiosClient.get("/auth/authenticate");
        },
    };
}
