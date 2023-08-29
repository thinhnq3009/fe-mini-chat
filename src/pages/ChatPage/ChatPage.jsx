import style from "./ChatPage.module.scss";
import classNames from "classnames/bind";
import { ChatContainer } from "~/components/ChatContainer";
import { ConversationItem } from "~/components/common/ConversationItem";
import { CardWrapper } from "~/components/common/CardWrapper";
import { IoIosNotificationsOutline, IoIosSearch, IoMdClose } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { conversationApi } from "~/apis/conversationApi";
import { setConversations } from "~/actions/conversation.action";
import { setConversation } from "~/actions/chatbox.action";
import { logout } from "~/actions/user.action";
import { Link, useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import { debounce } from "lodash";
import ModalWrapper from "~/components/common/ModalWrapper/ModalWrapper";
import useWebSocket from "~/hooks/useWebSocket";
import { RequestContainer } from "~/components/common/RequestContainer";
import accountApi from "~/apis/accountApi";
const cx = classNames.bind(style);

function ChatPage() {
    // Logic
    const [friendRequest, setFriendRequest] = useState([]);
    const [showTippy, setShow] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLoggedIn = useSelector((state) => state.user.user);
    const conversations = useSelector((s) => s.conversations);
    const { id: chattingId } = useSelector((state) => state.chatbox.conversation) || { id: null };
    const { connect, disconnect } = useWebSocket();
    const { getConversation } = conversationApi();
    const { getFriendRequests } = accountApi();

    const [keyword, setKeyword] = useState("");

    // Handle find conversation
    const handlerSearch = (value) => {
        setKeyword(value);
    };

    useEffect(() => {
        if (!userLoggedIn) return;

        connect(`/user/${userLoggedIn.username}/notification`);

        return disconnect;
    }, []);

    // getConversations
    useEffect(() => {
        getConversation()
            .then(({ data }) => {
                dispatch(setConversations(data));
                if (data[0]) {
                    changeConversationHandler(data[0]);
                }
            })
            .catch((err) => console.error(err));
    }, []);

    // Get Friend Requests
    useEffect(function () {
        getFriendRequests().then(({ data }) => {
            setFriendRequest(data);
            console.log(data);
        });
    }, []);

    const changeConversationHandler = (conversation) => {
        dispatch(setConversation(conversation));
    };

    const logoutHandler = () => {
        dispatch(logout());
        navigate("/login");
    };

    // UI elements

    const header = (
        <>
            <div className={cx("header-wrapper")}>
                <div className={cx("input-group")}>
                    <IoIosSearch className={cx("icon")} />
                    <input
                        onChange={(e) => handlerSearch(e.target.value)}
                        className="flex-grow-1"
                        type="text"
                        value={keyword}
                        placeholder="Search conversation"
                    />
                    <IoMdClose
                        onClick={() => handlerSearch("")}
                        className={cx("icon", "close-icon", { show: !!keyword })}
                    />
                </div>
                <Tippy content="Add more friends" delay={[500, 0]}>
                    <Link to="/add-friends" className={cx("button")}>
                        <AiOutlineUsergroupAdd />
                    </Link>
                </Tippy>
            </div>
        </>
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
            <div>
                <Tippy
                    interactive
                    visible={showTippy}
                    render={(attrs) => (
                        <div tabIndex="-1" {...attrs}>
                            <RequestContainer
                                friendRequest={friendRequest}
                                setFriendRequest={setFriendRequest}
                            />
                        </div>
                    )}
                >
                    <div></div>
                </Tippy>
                <button
                        onClick={() => {
                            setShow(!showTippy);
                            console.log(showTippy);
                        }}
                        data-badge={friendRequest.length}
                        className={cx("button", { badge: friendRequest.length > 0 })}
                    >
                        <IoIosNotificationsOutline />
                    </button>
                <Tippy content="Logout" delay={[500, 0]}>
                    <button onClick={logoutHandler} className={cx("button")}>
                        <LuLogOut />
                    </button>
                </Tippy>{" "}
            </div>
        </div>
    );

    return (
        <div className={cx("container")}>
            <div className={cx("sidebar")}>
                <CardWrapper header={header} footer={footer} bodyOverYScroll className={cx("card")}>
                    {conversations &&
                        conversations
                            .filter((conversation) =>
                                conversation.name.toLowerCase().includes(keyword.toLowerCase())
                            )
                            .map((item) => (
                                <ConversationItem
                                    onClick={() => changeConversationHandler(item)}
                                    key={item.id}
                                    active={item.id === chattingId}
                                    {...item}
                                />
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
