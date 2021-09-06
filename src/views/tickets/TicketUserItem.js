import {Spinner} from "reactstrap";
import User from "../../models/User";
import Error500 from "../Error500";
import {CheckCircle, Star} from "react-feather";
import React, {useState, useEffect} from 'react';
import {getUserProfile, getUserProfileImage} from "../../redux/actions/IndependentActions";

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
        // eslint-disable-next-line
    }, []);

    const loadData = () => {
        getUserProfile(userId)
            .then(data => {
                const responseUserData = new User(data);
                setUserData({
                    data: responseUserData,
                    error: null,
                    loading: false,
                });
                !responseUserData.isDeleted && loadUserAvatar(responseUserData);
            })
            .catch(error => {
                setUserData({
                    error,
                    data: null,
                    loading: false,
                });
            });
    };

    const loadUserAvatar = (responseUserData) => {
        getUserProfileImage(userId)
            .then(data => {
                const base64ImageString = Buffer.from(data, 'binary').toString('base64');
                responseUserData.setAvatar = "data:image/jpg;base64," + base64ImageString;
                setUserData({
                    data: responseUserData,
                    error: null,
                    loading: false,
                });
            });
    }

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
