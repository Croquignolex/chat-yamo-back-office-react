import {Spinner} from "reactstrap";
import User from "../../models/User";
import Error500 from "../pages/misc/error/500";
import {CheckCircle, Star} from "react-feather";
import React, {useState, useEffect} from 'react';
import {getUserProfile} from "../../redux/actions/IndependentActions";

/**
 * Display a ticket item
 * @param isActive
 * @param user
 * @param onClickItem
 * @returns {*}
 * @constructor
 */
const TicketUserItem = ({ userId, isActive, onClickItem }) => {
    const [userData, setUserData] = useState({
        loading: true,
        data: null,
        error: null
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        getUserProfile(userId)
            .then(data => {
                setUserData({
                    data: new User(data),
                    error: null,
                    loading: false,
                });
            })
            .catch(error => {
                setUserData({
                    error,
                    data: null,
                    loading: false,
                });
            });
    };

    if (userData.loading) {
        return (
            <Spinner color="primary" />
        );
    }

    if (userData.error) {
        return (
            <li>
                <Error500 onLinkClick={loadData} />
            </li>
        )
    }

    const user = userData.data;

    return (
        <li
            onClick={() => onClickItem(user)}
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
                    <h5 className={`text-bold-600 mb-0 ${user.isDeleted ? 'text-danger' : ''}`}>
                        <span style={{marginTop: "2px"}}>{user.name}</span>
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
                    <h6 className="text-bold-600 mb-0">{user.localisation}</h6>
                </div>
            </div>
        </li>
    );
};

export default TicketUserItem;
