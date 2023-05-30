import React from 'react';
import styled from "styled-components";
import {Card, CardBody} from "reactstrap";
import {Clock, CheckCircle, XCircle} from "react-feather";

import DisplayImage from "../../components/DisplayImage";
import DisplayVideo from "../../components/DisplayVideo";

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

    const MediaDisplay = ({message}) => {
        if(message.media) {
            if(message.type === 'video') {
                return <DisplayVideo src={message.media} withWrapper />;
            } else {
                return <DisplayImage src={message.media} withWrapper />;
            }
        }

        return null;
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
                            <div className="chat-body">
                                <CardWrapper>
                                    <CardBody className={`p-0 ${message.media ? 'c-image-wrapper' : ''}`}>
                                        <MediaDisplay message={message} />
                                        <div className={`chat-content ${message.media ? 'got-image' : ''}`}>
                                            <div className="c-text-content mb-50">
                                                <p className="preformatted">{message.content}</p>
                                            </div> 
                                            <p className="text-muted text-right">
                                                <span className="timer text-italic mr-50">{message.createdTime}</span>
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
                                            <p className="text-right text-primary font-weight-bold">
                                                {(message.isBackUser) && <span title={message.backofficeUserName}>{message.backofficeUser}</span>}
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
