const { default: axiosClient } = require("~/utils/axiosClient");

function messageApi() {
    return {
        getMessage: function (conversationId, page) {
            return axiosClient.get(`/message/${conversationId}`, { params: { page: page || 0 } });
        },
        sendMessage: function (conversationId, message) {
            const data = { conversationId, message };
            return axiosClient.post(`/message/send`, { data });
        },
    };
}

export default messageApi;
