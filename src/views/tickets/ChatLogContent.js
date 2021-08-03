import React from 'react';

const compareDay = (day1, day2) => {
    return true;
};

/**
 * Properly display the chat messages, avatar and media
 * @param activeUser
 * @param messages
 * @returns {*}
 * @constructor
 */
const ChatLogContent = ({ activeUser, messages }) => {
    const renderSentTime = (loopIndex, prevMsgDate, currMsgDate) => {
        if (loopIndex > 0 && compareDay(prevMsgDate, currMsgDate)) {
            return (
                <div className="divider">
                    <div className="divider-text">
                        {/*{currMsgDate}*/}
                        4 Aug
                    </div>
                </div>
            )
        }
    };

    const renderAvatar = (user) => {
        return (
            <div className="chat-avatar">
                <div className="avatar m-0">
                    <img
                        src={user.imageUrl}
                        alt="chat avatar"
                        height="40"
                        width="40"
                    />
                </div>
            </div>
        )
    };

    return (
        <>
            {messages.map((message, index, arr) => (
                <React.Fragment key={message.id}>
                    {renderSentTime(index, index > 0 ? arr[index - 1].createdAt : null, message.createdAt)}
                    <div
                        className={`chat ${
                            activeUser ? "chat-left" : "chat-right" // Check for the right author
                        }`}
                    >
                        {renderAvatar(activeUser)}
                        <div className="chat-body">
                            <div className="chat-content">{message.content}</div>
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </>
    );
};

export default ChatLogContent;
