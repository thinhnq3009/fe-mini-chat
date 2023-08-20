import style from "./ChatPage.module.scss";
import classNames from "classnames/bind";
import { ChatContainer } from "~/components/ChatContainer";
import { ConversationItem } from "~/components/common/ConversationItem";
import { CardWrapper } from "~/components/common/CardWrapper";
import { IoIosSearch } from "react-icons/io";
const cx = classNames.bind(style);

function ChatPage() {
    return (
        <div className={cx("container")}>
            <div className={cx("sidebar")}>
                <CardWrapper>
                    <div className={cx("input-group")}>
                        <IoIosSearch className={cx("icon")} />
                        <input type="text" placeholder="Search"/>
                    </div>
                </CardWrapper>
            </div>

            <div className={cx("chat-display")}>
                <ChatContainer></ChatContainer>
            </div>
        </div>
    );
}

export default ChatPage;
