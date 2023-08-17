import style from "./ChatPage.module.scss";
import classNames from "classnames/bind";
import { ChatContainer } from "~/components/ChatContainer";
import ConversationItem from "~/components/ConversationItem/ConversationItem";

const cx = classNames.bind(style);


function ChatPage() {
    return ( <div  className={cx("container")}>
        <div className={cx("sidebar")}>
            <ConversationItem/>
        </div>

        <div className={cx("chat-display")}>
            <ChatContainer></ChatContainer>
        </div>

    </div> );
}

export default ChatPage;