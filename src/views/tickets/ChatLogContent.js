import React from 'react';
import styled from "styled-components";
import {Card, CardBody} from "reactstrap";
import {Clock, CheckCircle, XCircle} from "react-feather";

import DisplayImage from "../../components/DisplayImage";

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

const ChatLogContent = ({ activeUser, messages }) => {

    const renderSentTime = (prevMsgDate, currMsgDate) => {
        if(prevMsgDate) {
            if (!areSameDay(prevMsgDate, currMsgDate)) {
                return (
                    <div className="divider">
                        <div className="divider-text text-white bg-black rounded">
                            {currMsgDate.format('LL')}
                        </div>
                    </div>
                )
            }
        } else  {
            return (
                <div className="divider">
                    <div className="divider-text text-white bg-black rounded">
                        {currMsgDate.format('LL')}
                    </div>
                </div>
            )
        }
    };

    return (
        <>
            {messages.map((message, index, arr) => {
                return (
                    <React.Fragment key={message.id}>
                        {renderSentTime((index > 0) && arr[index - 1].createdDate, message.createdDate)}
                        <Wrapper
                            className={`chat ${!message.isBackUser ? "chat-left" : "chat-right"}`}
                        >
                            {!message.isBackUser && (
                                <div className="chat-avatar">
                                    <div className="avatar m-0">
                                        <img src={activeUser.imageSrc} alt="..." height="40" width="40" />
                                    </div>
                                </div>
                            )}
                            <div className="chat-body">
                                <CardWrapper>
                                    <CardBody className={`p-0 ${message.media ? 'c-image-wrapper' : ''}`}>
                                        {message.media && (
                                            <DisplayImage src={message.imageSrc} withWrapper />
                                        )}
                                        <div className={`chat-content ${message.media ? 'got-image' : ''}`}>
                                            <div className="c-text-content">
                                                <p className="preformatted">{message.content}</p>
                                            </div>
                                            <p className="c-hour text-muted float-right">
                                                <span className="timer text-italic">{message.createdTime}</span>
                                                <span className="request">
                                                    {(message.isBackUser) && (
                                                        (message.request) ? (
                                                            (message.request.loading) ? <Clock size={17} className="text-dark" /> :
                                                            (message.request.error) ? <XCircle size={17} className="text-danger" /> :
                                                                <CheckCircle size={17} className="text-success" />
                                                        ) : <CheckCircle size={17} className="text-success" />
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
