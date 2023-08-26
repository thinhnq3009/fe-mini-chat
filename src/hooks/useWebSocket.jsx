import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { over } from "stompjs";

const useWebSocket = () => {
    const userInfo = useSelector((state) => state.user);

    const { token, user } = userInfo ? userInfo : {};

    const stompClient = useRef();

    const onReceiveMessage = useRef(() => {});

    return {

        // init: () => {

        // },

        connect: (conversationId) => {
            var socket = new SockJS("http://localhost:8080/socket");
            stompClient.current = over(socket);

            console.log("Token trong hàm connect: ", token);

            stompClient.current.connect(
                { Authorization: `Bearer ${token}` },
                () => {
                    stompClient.current.subscribe(`/user/${conversationId}/messages`, (frame) => {
                        let responseData;
                        try {
                            responseData = JSON.parse(frame.body);
                            onReceiveMessage.current(responseData)
                        } catch (e) {
                            console.error(frame);
                            throw new Error("Bad response form server");
                        }
                    });
                },
                () => console.log("Error connecting")
            );
        },

        disconnect: () => {
            if (!stompClient.current) return;
            stompClient.current.disconnect();
        },

        setReceiveMessageHandler: (callback) => {
            if (typeof callback !== "function")
                throw new Error("ReceiveMessageCallback much be a function");
            onReceiveMessage.current = callback;
        },
        sendMessage: (message, conversationId) => {
            if (stompClient.current && message && conversationId) {
                stompClient.current.send(
                    "/app/send-message",
                    { Authorization: `Bearer ${token}` },
                    JSON.stringify({ content: message, conversationId })
                );
            }
        },
    };
};

export default useWebSocket;
