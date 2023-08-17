import axiosClient from "~/utils/axiosClient";
import { checker } from "~/utils/propertiesChecker";

export default function authenticateApi() {
    return {
        register: function (data) {
            checker(data, ["username", "displayName", "password", "confirmPassword"]);
            return axiosClient.post("/auth/register", data);
        },

        login: function (data) {
            checker(data, ["username", 'password']);
            return axiosClient.post("/auth/login", data);
        }
    };
}
