import React from 'react';
import {Spinner} from "reactstrap";
import {CheckCircle, Star} from "react-feather";

const TicketUserItem = ({ feedback, isActive, onClickItem }) => {

    const user = feedback.user;

    if (!user) {
        return (
            <Spinner color="primary" />
        );
    }

    return (
        <li
            onClick={() => onClickItem(user)}
            className={`${isActive ? "active" : ""}`}
        >
            <div className="pr-1">
                  <span className="avatar avatar-md m-0">
                      <img src={user.imageSrc} alt="..." height="38" width="38" />
                  </span>
            </div>
            <div className="user-chat-info">
                <div className="contact-info">
                    <h5 className={`text-bold-600 mb-0 ${user.isDeleted ? 'text-danger' : ''}`}>
                        <span style={{marginTop: "2px"}}>{user.isDeleted ? "Deleted user" : user.name}</span>
                        {user.verified && (
                            <span className="ml-1">
                                <CheckCircle size={17} className="text-success" />
                            </span>
                        )}
                        {user.isPremium && (
                            <span className="ml-1">
                                <Star size={17} className="text-warning" />
                            </span>
                        )}
                    </h5>
                    <h6 className={`text-bold-600 mb-0 ${user.isDeleted ? 'text-danger' : ''}`}>
                        {user.localisation}
                    </h6>
                </div>
            </div>
        </li>
    );
};

export default TicketUserItem;
