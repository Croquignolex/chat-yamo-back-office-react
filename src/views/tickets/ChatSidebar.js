import { X } from "react-feather";
import { connect } from "react-redux";
import {Card, Spinner} from "reactstrap";
import TicketSearch from "./TicketSearch";
import TicketUserItem from "./TicketUserItem";
import Error500 from "../pages/misc/error/500";
import React, {useCallback, useEffect} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {getTickets} from "../../redux/actions/GeneralActions";
import userImg from "../../assets/img/portrait/small/avatar-s-11.jpg";

const status = "dnd";

const ChatSidebar = ({ activeChatId, tickets, getTickets, mainSidebar, handleUserSidebar, handleActiveChat }) => {
    const loadData = () => {
        getTickets();
    };

    useEffect(() => {
        loadData();
    }, []);

    // TODO: Mark messages as seen
    const markSeenAllMessages = (caseId) => {

    };

    const onClickItem = (feedbackCase) => {
        // Update the chat log
        handleActiveChat(feedbackCase.caseId, feedbackCase.user);
        // Hide sidebar if opened
        mainSidebar(false);
        // Mark messages as seen
        markSeenAllMessages(feedbackCase.caseId);
    };

    const getStatusConfig = useCallback(() => {
        return {
            className: status === "dnd"
                ? "avatar-status-busy"
                : status === "away"
                    ? "avatar-status-away"
                    : status === "offline"
                        ? "avatar-status-offline"
                        : "avatar-status-online"
        };
    }, [status]);

    const { data, loading } = tickets;

    return (
        <Card className="sidebar-content h-100">
            {loading && (
                <Spinner color="primary" />
            )}
            {!data ? (
                <Error500 onLinkClick={loadData} />
            ) : (
                <>
                    <span
                        className="sidebar-close-icon"
                        onClick={() => mainSidebar(false)}
                    >
                      <X size={15} />
                    </span>
                    <div className="chat-fixed-search">
                        <div className="d-flex align-items-center">
                            <div className="sidebar-profile-toggle position-relative d-inline-flex">
                                <div
                                    className="avatar"
                                    onClick={() => handleUserSidebar("open")}
                                >
                                    <img src={userImg} alt="User Profile" height="40" width="40" />
                                    <span
                                        className={getStatusConfig.className}
                                    />
                                </div>
                            </div>
                            <TicketSearch />
                        </div>
                    </div>
                    <PerfectScrollbar
                        className="chat-user-list list-group"
                        options={{
                            wheelPropagation: false
                        }}
                    >
                        <h3 className="primary p-1 mb-0">Tickets en cours</h3>
                        <ul className="chat-users-list-wrapper media-list">
                            {data.map(item => (
                                <TicketUserItem
                                    key={item.caseId}
                                    user={item.user}
                                    onClickItem={onClickItem}
                                    lastMessage={item.lastMessage}
                                    unreadMessages={item.unreadMessages}
                                    isActive={activeChatId === item.caseId}
                                />
                            ))}
                        </ul>
                        {/*<h3 className="text-danger p-1 mb-0">Tickets fermés</h3>
                        <ul className="chat-users-list-wrapper media-list">
                            {renderContacts}
                        </ul>*/}
                    </PerfectScrollbar>
                </>
            )}
        </Card>
    );
};

const mapStateToProps = ({ tickets }) => ({
    tickets
});

export default connect(mapStateToProps, {
    getTickets,
})(ChatSidebar)
