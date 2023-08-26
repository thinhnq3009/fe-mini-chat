import style from "./ChatContainer.module.scss";
import classNames from "classnames/bind";
import { CardWrapper } from "../common/CardWrapper";
import { ConversationItem } from "../common/ConversationItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import messageApi from "~/apis/messageApi";
import { MessageItem } from "../common/MessageItem";
import { addMessages, setMessages } from "~/actions/chatbox.action";
import { BsSendFill } from "react-icons/bs";
import { InputMessage } from "../common/InputMessage";

const cx = classNames.bind(style);

function ChatContainer({}) {
    const { conversation, messages } = useSelector((state) => state.chatbox);
    const dispatch = useDispatch();
    const { getMessage } = messageApi();

    console.log(messages);

    useEffect(() => {
        if (!conversation.id) return;
        console.log(conversation);
        getMessage(conversation.id).then(({ data }) => {
            dispatch(setMessages(data));
        });
    }, [conversation]);

    // UI
    const header = conversation.id && <ConversationItem isHeader {...conversation} />;

    return (
        <div className={cx("container")}>
            <CardWrapper bodyOverYScroll className={cx("card")} header={header}>
                <div className="d-flex flex-column h-100">
                    <div className={cx("message-container")}>
                        {messages &&
                            messages.map((message, index) => (
                                <MessageItem key={index} {...message} />
                            ))}
                    </div>
                    <div className={cx("input-message-container")}>
                        <InputMessage/>
                    </div>
                </div>
            </CardWrapper>
        </div>
    );
}

export default ChatContainer;
