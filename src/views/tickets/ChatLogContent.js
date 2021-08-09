import React from 'react';
import {Card, CardBody} from "reactstrap";
import DisplayImage from "./DisplayImage";
import styled from "styled-components";
import img1 from "../../assets/img/pages/content-img-1.jpg";
import {BACK_OFFICE_USER_ID} from "../../configs/AppConfig";

const CardWrapper = styled(Card)`
    background: none !important;
    box-shadow: none !important;
    
    
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
        if (loopIndex > 0 && areSameDay(prevMsgDate, currMsgDate)) {
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
                        alt="chat avatar"
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
                        <div
                            className={`chat ${
                                !isBackUser ? "chat-left" : "chat-right" // Check for the right author
                            }`}
                        >
                            {renderAvatar(activeUser, isBackUser)}
                            <div className="chat-body">
                                <CardWrapper>
                                    <CardBody className="p-0">
                                        {gotImage && (
                                            <DisplayImage
                                                src={message.getImageUrl()}
                                            />
                                        )}
                                        <div className="chat-content">
                                            <p>{message.content}</p>
                                            <p>
                                                14:02
                                            </p>
                                        </div>
                                    </CardBody>
                                </CardWrapper>
                            </div>
                        </div>
                    </React.Fragment>
                )
            })}
        </>
    );
};

export default ChatLogContent;
