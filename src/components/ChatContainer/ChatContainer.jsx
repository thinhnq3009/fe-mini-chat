import style from "./ChatContainer.module.scss";
import classNames from "classnames/bind";
import { CardWrapper } from "../common/CardWrapper";
import { ConversationItem } from "../common/ConversationItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import messageApi from "~/apis/messageApi";

const cx = classNames.bind(style);

function ChatContainer({}) {
    const { conversation, messages } = useSelector((state) => state.chatbox);
    const dispatch = useDispatch();
    const { getMessage } = messageApi();

    useEffect(() => {
        if (!conversation.id) return;
        console.log(conversation);
        getMessage(conversation.id)
            .then(({data}) => {
                console.log(data);
            })    
        ;
    }, [conversation]);

    // UI
    const header = (conversation.id && <ConversationItem isHeader {...conversation}/>);

    return (
        <div className={cx("container")}>
            <CardWrapper header={header}>

            </CardWrapper>
        </div>
    );
}

export default ChatContainer;
