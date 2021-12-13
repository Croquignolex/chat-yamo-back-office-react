import React from 'react';
import {Spinner} from "reactstrap";
import {CheckCircle, Star} from "react-feather";

import Error500 from "../Error500";

const TicketUserItem = ({ user, activeChatId, onClickItem }) => {
    // Data

    if (Array.isArray(user)) return <li><Spinner color="primary" /></li>;

    if (Array.isArray(user)) return <li><Error500 refresh={false} /></li>;

    return (
        <li
            onClick={() => onClickItem(user)}
            className={`${(activeChatId === user.id) ? "active" : ""}`}>
            <div className="pr-1">
                  <span className="avatar avatar-md m-0">
                      <img src={user.originalUrl} alt="..." height="38" width="38" />
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
                        {user.city+', '+user.country}
                    </h6>
                </div>
            </div>
        </li>
    );
};

export default TicketUserItem;
