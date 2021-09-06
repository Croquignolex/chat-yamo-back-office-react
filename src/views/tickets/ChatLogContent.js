import React from 'react';
import styled from "styled-components";
import {Card, CardBody} from "reactstrap";
import DisplayImage from "./DisplayImage";
import {Clock, CheckCircle, XCircle} from "react-feather";

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

    const renderAvatar = (user) => {
        return (
            <div className="chat-avatar">
                <div className="avatar m-0">
                    <img src={user.imageSrc} alt="..." height="40" width="40" />
                </div>
            </div>
        )
    };

    return (
        <>
            {messages.map((message, index, arr) => {
                return (
                    <React.Fragment key={message.id}>
                        {renderSentTime(index, index > 0 ? arr[index - 1].createdAt : null, message.createdAt)}
                        <Wrapper
                            className={`chat ${
                                !message.isBackUser ? "chat-left" : "chat-right" // Check for the right author
                            }`}
                        >
                            {!message.isBackUser && renderAvatar(activeUser)}
                            <div className="chat-body">
                                <CardWrapper>
                                    <CardBody className={`p-0 ${message.media ? 'c-image-wrapper' : ''}`}>
                                        {message.media && (
                                            <DisplayImage className="" src={message.imageSrc} />
                                        )}
                                        <div className={`chat-content ${message.media ? 'got-image' : ''}`}>
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
