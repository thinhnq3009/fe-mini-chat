import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://back-end-mini-chat-c1c5323f3036.herokuapp.com/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("token") || "";

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        if (error.response && error.response.data) {
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error.response);
    }
);

export default axiosClient;
