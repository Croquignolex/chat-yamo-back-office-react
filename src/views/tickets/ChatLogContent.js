import React from 'react';
import {Card, CardBody} from "reactstrap";
import DisplayImage from "./DisplayImage";
import styled from "styled-components";
import img1 from "../../assets/img/pages/content-img-1.jpg";
import {BACK_OFFICE_USER_ID} from "../../configs/AppConfig";
import {Clock, CheckCircle, XCircle} from "react-feather";
import {getUserProfileImage} from "../../redux/actions/IndependentActions";

const Wrapper = styled.div`
    .c-image-wrapper {
        width: 200px;
        // height: 200px;
        
        .chat-content {
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
        }
    }
    
    &.chat-left {
        .c-image-wrapper {
            .c-image {
                margin-left: 20px;
            }
        }
    }
    
    &.chat-right {
        .card {
            float: right;
        }
        .c-hour {
            text-align: right;
        }
    }
    
    .got-image {
        width: 100%;
    }
    .c-hour {
        display: flex;
        align-items: center;
        
        margin: 0 !important;
        margin-top: 5px !important;
        
        .timer {
            margin-top: 1px;
        }
        
        .request {
            margin-left: 5px;
        }
    }
`;

const CardWrapper = styled(Card)`
    background: none !important;
    box-shadow: none !important;
    margin-bottom: 0 !important;
`;

const areSameDay = (day1, day2) => {
    return day1.year() === day2.year()
        && day1.month() === day2.month()
        && day1.day() === day2.day();
};

/**
 * Properly display the chat messages-inputs, avatar and media
 * @param activeUser
 * @param messages
 * @returns {*}
 * @constructor
 */
const ChatLogContent = ({ activeUser, messages }) => {
    const renderSentTime = (loopIndex, prevMsgDate, currMsgDate) => {
        if (loopIndex > 0 && !areSameDay(prevMsgDate, currMsgDate)) {
            return (
                <div className="divider">
                    <div className="divider-text">
                        {currMsgDate.format('LL')}
                    </div>
                </div>
            )
        }
    };

    const renderAvatar = (user, isBackUser) => {
        if (isBackUser)
            return null;

        return (
            <div className="chat-avatar">
                <div className="avatar m-0">
                    <img
                        width="40"
                        height="40"
                        //alt="chat avatar"
                        // imageUrl does not work. The image binary is behind the service and accessible with the JWT.
                        src={isBackUser ? '' : user.imageUrl}
                    />
                </div>
            </div>
        )
    };

    return (
        <>
            {messages.map((message, index, arr) => {
                const isBackUser = message.authorId === BACK_OFFICE_USER_ID;
                const gotImage = !!(message.request
                    ? message.request.file
                    : message.mediaId);
                return (
                    <React.Fragment key={message.id}>
                        {renderSentTime(index, index > 0 ? arr[index - 1].createdAt : null, message.createdAt)}
                        <Wrapper
                            className={`chat ${
                                !isBackUser ? "chat-left" : "chat-right" // Check for the right author
                            }`}
                        >
                            {renderAvatar(activeUser, isBackUser)}
                            <div className="chat-body">
                                <CardWrapper>
                                    <CardBody className={`p-0 ${gotImage ? 'c-image-wrapper' : ''}`}>
                                        {gotImage && (
                                            <DisplayImage
                                                className=""
                                                src={message.imageSrc()}
                                            />
                                        )}
                                        <div className={`chat-content ${gotImage ? 'got-image' : ''}`}>
                                            <p className="c-text-content">{message.content}</p>
                                            <p className="c-hour text-muted">
                                                <span className="timer">{message.createdAt.format('HH:mm')}</span>
                                                <span className="request">
                                                    {message.request && (
                                                        <>
                                                            {message.request.loading ? (
                                                                <Clock size={17} className="text-dark" />
                                                            ) : message.request.data ? (
                                                                <CheckCircle size={17} className="text-success" />
                                                            ) : (
                                                                <XCircle size={17} className="text-danger" />
                                                            )}
                                                        </>
                                                    )}
                                                </span>
                                            </p>
                                        </div>
                                    </CardBody>
                                </CardWrapper>
                            </div>
                        </Wrapper>
                    </React.Fragment>
                )
            })}
        </>
    );
};

export default ChatLogContent;
