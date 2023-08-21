import style from "./ChatPage.module.scss";
import classNames from "classnames/bind";
import { ChatContainer } from "~/components/ChatContainer";
import { ConversationItem } from "~/components/common/ConversationItem";
import { CardWrapper } from "~/components/common/CardWrapper";
import { IoIosSearch } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { conversationApi } from "~/apis/conversationApi";
import { setConversations } from "~/actions/conversation.action";
const cx = classNames.bind(style);

function ChatPage() {
    // Logic
    const userLoggedIn = useSelector((state) => state.user.user);
    const conversations = useSelector((s) => s.conversations);
    const dispatch = useDispatch();
    const { getConversation } = conversationApi();

    useEffect(() => {
        getConversation()
            .then(({ data }) => {
                dispatch(setConversations(data));
            })
            .catch((err) => console.error(err));
    }, []);

    console.log(userLoggedIn);
    // UI elements

    const header = (
        <div className={cx("input-group")}>
            <IoIosSearch className={cx("icon")} />
            <input type="text" placeholder="Search" />
        </div>
    );

    const footer = userLoggedIn && (
        <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
                <img
                    className={cx("avatar")}
                    width={50}
                    height={50}
                    src={userLoggedIn.avatarUrl}
                    alt=""
                />
                <div className="ms-2">
                    <h6 className="mb-0">{userLoggedIn.displayName}</h6>
                    <span className={cx("username")}>{userLoggedIn.username}</span>
                </div>
            </div>
            <LuLogOut className="fs-4 justify-content-end cursor-pointer" />
        </div>
    );

    return (
        <div className={cx("container")}>
            <div className={cx("sidebar")}>
                <CardWrapper header={header} footer={footer} bodyOverYScroll className={cx("card")}>
                    {conversations &&
                        conversations.map((item, index) => (
                            <ConversationItem key={item.id} active={index == 0} {...item} />
                        ))}
                </CardWrapper>
            </div>

            <div className={cx("chat-display")}>
                <ChatContainer></ChatContainer>
            </div>
        </div>
    );
}

export default ChatPage;
