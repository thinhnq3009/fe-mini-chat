import style from "./AddFriendsPage.module.scss";
import classNames from "classnames/bind";
import { CardWrapper } from "~/components/common/CardWrapper";
import { IoIosArrowBack, IoIosSearch, IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { debounce, result } from "lodash";
import accountApi from "~/apis/accountApi";
import { ConversationItem } from "~/components/common/ConversationItem";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import useNotification from "~/hooks/useNotification";

const cx = classNames.bind(style);

function AddFriendsPage() {
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);
    const { findAccounts, sendAddFriendRequest } = accountApi();
    const { addNotification } = useNotification();

    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (!keyword) return;
            findAccounts(keyword)
                .then(({ data }) => {
                    setResults(data);
                })
                .catch((err) => console.error(err));
        }, 1000);

        return () => clearTimeout(timeOut);
    }, [keyword]);

    const searchHandler = (value) => {
        setKeyword(value);
        // sendRequest(value);
    };

    const handelAddFriend = (receiverId) => {
        sendAddFriendRequest(receiverId)
            .then(({ message }) => {
                addNotification(message);
                setResults((current) =>
                    current.map((item) => {
                        if (item.id === receiverId) {
                            item.requestSent = true;
                        }
                        return item;
                    })
                );
            })
            .catch(({ message }) => {
                addNotification(message);
            });
    };
    // UI elements
    const header = (
        <>
            <div className="position-relative">
                <h4 className="text-center mb-3">Find Friends</h4>
                <Tippy content="Back to chat page" delay={[500, 0]}>
                    <a
                        href="/chat"
                        className="bg-transparent px-1 d-flex align-item-center position-absolute top-0"
                    >
                        <h4>
                            <IoIosArrowBack />
                        </h4>
                    </a>
                </Tippy>
            </div>

            <div className={cx("header-wrapper")}>
                <div className={cx("input-group")}>
                    <IoIosSearch className={cx("icon")} />
                    <input
                        onChange={(e) => searchHandler(e.target.value)}
                        value={keyword}
                        className="flex-grow-1"
                        type="text"
                        placeholder="Type something to find other users..."
                    />
                    <IoMdClose
                        onClick={() => setKeyword("")}
                        className={cx("icon", "close-icon", { show: !!keyword })}
                    />
                </div>
            </div>
        </>
    );

    return (
        <div className={cx("container")}>
            <div className={cx("wrapper")}>
                <CardWrapper bodyOverYScroll className="h-100" header={header}>
                    <div className={cx("result-wrapper")}>
                        {(results && results.length) !== 0 ? (
                            results.map((item, index) => {
                                return (
                                    <div className={cx("item")} key={index}>
                                        <div className={cx("info")}>
                                            <ConversationItem
                                                hover={false}
                                                header={true}
                                                avatar={item.avatarUrl}
                                                name={item.displayName}
                                                username={item.username}
                                            />
                                        </div>
                                        {!item.requestSent ? (
                                            <Tippy content="Click to add friend" delay={[2500, 0]}>
                                                <button
                                                    onClick={() => handelAddFriend(item.id)}
                                                    className={cx("btn-add")}
                                                >
                                                    <AiOutlineUsergroupAdd />
                                                </button>
                                            </Tippy>
                                        ) : (
                                            <Tippy content="Sent" delay={[200, 0]}>
                                                <button className={cx("btn-add")}>
                                                    <MdOutlineBookmarkAdded />
                                                </button>
                                            </Tippy>
                                        )}
                                    </div>
                                );
                            })
                        ) : !keyword ? (
                            <div className="py-5 text-center">
                                Enter <b>username</b> or <b>display name</b> to connect to your
                                friend.
                            </div>
                        ) : (
                            <div className="py-5 text-center">
                                Don't have any account contains <b>{keyword}</b>
                            </div>
                        )}
                    </div>
                </CardWrapper>
            </div>
        </div>
    );
}

export default AddFriendsPage;
