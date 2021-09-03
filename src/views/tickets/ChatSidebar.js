import { X } from "react-feather";
import Error500 from "../Error500";
import { connect } from "react-redux";
import React, {useEffect} from "react";
import TicketUserItem from "./TicketUserItem";
import {Button, Card, Spinner} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import {getTickets} from "../../redux/actions/GeneralActions";

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

    const { data, loading } = tickets;

    return (
        <Card className="sidebar-content h-100">
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
                            <Button
                                onClick={loadData}
                                color="primary">
                                Actualiser
                            </Button>
                        </div>
                    </div>
                    <PerfectScrollbar
                        className="chat-user-list list-group"
                        options={{
                            wheelPropagation: false
                        }}
                    >
                        {loading && (
                            <div className="w-100 d-flex align-items-center justify-content-center my-2">
                                <Spinner color="primary" />
                            </div>
                        )}
                        {/*<h3 className="primary p-1 mb-0">Tickets en cours</h3>*/}
                        <ul className="chat-users-list-wrapper media-list">
                            {data && data.messages && data.messages.map(item => (
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
