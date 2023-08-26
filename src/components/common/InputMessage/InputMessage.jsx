import { useEffect, useState } from "react";
import { BsSendFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "~/actions/chatbox.action";
import { login } from "~/actions/user.action";
import messageApi from "~/apis/messageApi";
import useWebSocket from "~/hooks/useWebSocket";

function InputMessage() {
    const [message, setMessage] = useState("");
    const token = useSelector((state) => state.user.token);
    const conversation = useSelector((s) => s.chatbox.conversation);
    // const {sendMessage} = messageApi()
    const dispatch = useDispatch();
    const {
        connect,
        sendMessage: sendSocket,
        disconnect,
        setReceiveMessageHandler,
    } = useWebSocket();

    setReceiveMessageHandler((data) => {
        data && dispatch(addMessage(data.message));
        setMessage("");
    });

    useEffect(() => {
        console.log("Thử connect");
        if (!token || !conversation.id) {
            console.log("Không connect vì không có token");
            return;
        }

        connect(conversation.id);

        return disconnect;
    }, [token, conversation]);

    const handlerSendMessage = () => {
        console.log(conversation, message);

        sendSocket(message, conversation.id);

        // if (!conversation) return
        // if (!message) return

        // sendMessage(conversation.id, message)
        // .then(({data}) => {
        //     dispatch(addMessage(data))
        //     setMessage("")
        // })
        // .catch(err => {
        //     console.log(err);
        // })
    };

    return (
        <>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyUp={(e) => e.code === "Enter" && handlerSendMessage()}
                type="text"
                placeholder="Enter your message to send"
            />
            <button onClick={handlerSendMessage}>
                <BsSendFill />
            </button>
        </>
    );
}

export default InputMessage;
