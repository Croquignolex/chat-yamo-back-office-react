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

    const onClickItem = (caseId, user) => {
        // Update the chat log
        handleActiveChat(caseId, user);
        // Hide sidebar if opened
        mainSidebar(false);
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
    console.log('tickets => ', tickets);
    return (
        <Card className="sidebar-content h-100">
            {loading && (
                <Spinner color="primary" />
            )}
            {!loading && !data ? (
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
                        {/*<h3 className="primary p-1 mb-0">Tickets en cours</h3>*/}
                        <ul className="chat-users-list-wrapper media-list">
                            {data && data.map(item => (
                                <TicketUserItem
                                    key={item.caseId}
                                    userId={item.userId}
                                    isActive={activeChatId === item.caseId}
                                    onClickItem={user => onClickItem(item.caseId, user)}
                                />
                            ))}
                        </ul>
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
