import React from 'react';
import {Badge} from "reactstrap";

/**
 * Display a ticket item
 * @param isActive
 * @param user
 * @param lastMessage
 * @param unreadMessages
 * @param onClickItem
 * @returns {*}
 * @constructor
 */
const TicketUserItem = ({ isActive, user, lastMessage, unreadMessages, onClickItem }) => {
    return (
        <li
            key={user.id}
            onClick={onClickItem}
            className={`${isActive ? "active" : ""}`}
        >
            <div className="pr-1">
                  <span className="avatar avatar-md m-0">
                    <img
                        src={user.imageUrl}
                        alt={user.name}
                        height="38"
                        width="38"
                    />
                  </span>
            </div>
            <div className="user-chat-info">
                <div className="contact-info">
                    <h5 className="text-bold-600 mb-0">{user.name}</h5>
                    <p className="truncate">
                        {lastMessage && lastMessage.content}
                    </p>
                </div>
                <div className="contact-meta d-flex- flex-column">
                    <span className="float-right mb-25">
                      Aug 21
                    </span>
                    {unreadMessages > 0 && (
                        <div className="unseen-msg">
                            <Badge
                                pill
                                color="primary"
                                className="badge-md float-right"
                            >
                                {unreadMessages}
                            </Badge>
                        </div>
                    )}
                </div>
            </div>
        </li>
    );
};

export default TicketUserItem;
