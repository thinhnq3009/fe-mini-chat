import style from "./RequestContainer.module.scss";
import classNames from "classnames/bind";
import { CardWrapper } from "../CardWrapper";
import accountApi from "~/apis/accountApi";
import { useEffect, useState } from "react";
import useTime from "~/hooks/useTime";
import { parseJSON, formatDistanceToNowStrict } from "date-fns";
import useNotification from "~/hooks/useNotification";
import { useDispatch } from "react-redux";
import { addConversation, setConversations } from "~/actions/conversation.action";
import { conversationApi } from "~/apis/conversationApi";

const cx = classNames.bind(style);

function RequestContainer({ friendRequest, setFriendRequest, ...passProps }) {
    const { deleteFriendRequest, acceptFriendRequest } = accountApi();
    const { getConversation } = conversationApi();
    const { addNotification } = useNotification();
    const dispatch = useDispatch();
    function timeFormatter(time) {
        if (!time) return;

        const date = parseJSON(time);

        return formatDistanceToNowStrict(date, { addSuffix: true });
    }

    function acceptHandler(id) {
        if (!id) return;

        acceptFriendRequest(id).then(({ message, data }) => {
            addNotification(message, "success");
            setFriendRequest((current) => current.filter((item) => item.id !== id));
            getConversation() // Phần này tối ưu ở backend để dụng dispatch thêm conversation vào
                .then(({ data }) => {
                    dispatch(setConversations(data));
                })
                .catch((err) => console.error(err));
        });
    }
    function cancelHandler(id) {
        if (!id) return;

        deleteFriendRequest(id).then(({ message }) => {
            addNotification(message, "success");
            setFriendRequest((current) => current.filter((item) => item.id !== id));
        });
    }

    return (
        <div className={cx("container")}>
            <CardWrapper
                bodyOverYScroll
                header={<h5 className="text-center mb-3">Request Friends</h5>}
            >
                <div className={cx("wrapper")}>
                    {friendRequest.length > 0 ? (
                        friendRequest.map((item, index) => {
                            return (
                                <div className={cx("item")} key={index}>
                                    <img
                                        className={cx("poster")}
                                        src={item.posterUrl}
                                        alt={item.content}
                                    />
                                    <div className={cx("info")}>
                                        <h6 className={cx("content")}>{item.content}</h6>
                                        <p className={cx("time")}>
                                            {timeFormatter(item.createdAt)}
                                        </p>
                                        {item.type === "REQUEST_ADD_FRIEND" && (
                                            <div className={cx("action")}>
                                                <button
                                                    onClick={() => acceptHandler(item.id)}
                                                    className={cx("btn")}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => cancelHandler(item.id)}
                                                    className={cx("btn")}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <h5 className="text-center">Nhạt quá không ai kết bạn à</h5>
                    )}
                </div>
            </CardWrapper>
        </div>
    );
}

export default RequestContainer;
