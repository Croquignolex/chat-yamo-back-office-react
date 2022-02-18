import React from 'react';
import {Spinner} from "reactstrap";
import {CheckCircle, Star} from "react-feather";

import Error500 from "../Error500";
import DisplayImage from "../../components/DisplayImage";

const ChatSidebarItem = ({ feedback, activeChatId, onClickItem }) => {
    // Data
    const user = feedback.user;

    if (!user) return <li><Spinner color="primary" /></li>;

    if (user.isNotFound) return <li><Error500 refresh={false} /></li>;

    return (
        <li
            onClick={() => onClickItem(feedback)}
            className={`${(activeChatId === feedback.id) ? "active" : ""}`}
        >
            <div className="pr-1">
                  <span className="avatar avatar-md m-0">
                      <DisplayImage src={user.imageSrc} withModal={false} />
                  </span>
            </div>
            <div className="user-chat-info">
                <div className="contact-info">
                    <h5 className={`text-bold-600 mb-0 ${user.isDeleted ? 'text-danger' : ''}`}>
                        <span style={{marginTop: "2px"}}>{user.isDeleted ? "Deleted user" : user.name}</span>
                        {user.verified && <span className="ml-1"><CheckCircle size={17} className="text-success" /></span>}
                        {user.isPremium && <span className="ml-1"><Star size={17} className="text-warning" /></span>}
                        <span className="text-secondary float-right">{user.lastMessageTime}</span>
                    </h5>
                    <h6 className={`text-bold-600 mb-0 ${user.isDeleted ? 'text-danger' : ''}`}>
                        {user.localisation}
                    </h6>
                </div>
            </div>
        </li>
    );
};

export default ChatSidebarItem;
