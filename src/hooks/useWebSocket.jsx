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

        connect: (channel) => {
            var socket = new SockJS("http://localhost:8080/socket");
            stompClient.current = over(socket);

            stompClient.current.connect(
                { Authorization: `Bearer ${token}` },
                () => {
                    stompClient.current.subscribe(channel, (frame) => {
                        let responseData;
                        try {
                            responseData = JSON.parse(frame.body);
                            onReceiveMessage.current(responseData);
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
            try {
                stompClient.current.disconnect();
            } catch (error) {}
        },

        setReceiveMessageHandler: (callback) => {
            if (typeof callback !== "function")
                throw new Error("ReceiveMessageCallback much be a function");
            onReceiveMessage.current = callback;
        },
        sendMessage: (receiver, message, conversationId) => {
            if (stompClient.current && message && conversationId) {
                stompClient.current.send(
                    receiver,
                    { Authorization: `Bearer ${token}` },
                    JSON.stringify({ content: message, conversationId })
                );
            }
        },
    };
};

export default useWebSocket;
