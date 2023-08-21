import axiosClient from "~/utils/axiosClient"

export const conversationApi = () => {
    return {
        getConversation: () => {
            return axiosClient.get("/conversation");
        }
    }
}