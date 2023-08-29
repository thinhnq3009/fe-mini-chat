import axiosClient from "~/utils/axiosClient";

function accountApi() {
    return {
        findAccounts: (username, page, size) => {
            return axiosClient.get("/add-friend/find", { params: { query: username, page, size } });
        },
        sendAddFriendRequest: (receiverId) => {
            return axiosClient.post(`/add-friend/${receiverId}`);
        },
        getFriendRequests: (page, size) => {
            return axiosClient.get(`/add-friend`, { params: { page, size } });
        },
        deleteFriendRequest: (requestId) => {
            return axiosClient.delete(`/add-friend/${requestId}`);
        },
        acceptFriendRequest: (requestId) => {
            return axiosClient.post(`/add-friend/accept/${requestId}`);
        },
    };
}

export default accountApi;
