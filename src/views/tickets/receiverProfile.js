import React from "react";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar"

import "../../assets/scss/pages/users.scss";

class ReceiverProfile extends React.Component {
  // props { receiverProfile, activeUser, handleReceiverSidebar }
  constructor(props) {
    super(props);
    this.state = {
      activeUser: null
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.activeUser !== state.activeUser) return {activeUser: props.activeUser}
    return null
  }

  render() {
    const { activeUser } = this.state;
    const { receiverProfile, handleReceiverSidebar } = this.props;

    if (!activeUser) return null;

    return (
      <div className={`user-profile-sidebar ${receiverProfile ? "show" : null}`}>
        <header className="user-profile-header">
          <span className="close-icon" onClick={() => handleReceiverSidebar("close")}>
            <X size={24} />
          </span>
          <div className="header-profile-sidebar">
            <div className="avatar">
              <img src={activeUser.imageSrc} alt="..." height="66" width="66" />
            </div>
            <h4 className="chat-user-name">{activeUser.isDeleted ? "Deleted user" : activeUser.name}</h4>
          </div>
        </header>
        <PerfectScrollbar className="user-profile-sidebar-area p-2" options={{wheelPropagation: false}}>
          <div className="users-page-view-table">
            <div className="d-flex user-info">
              <div className="user-info-title font-weight-bold">
                Premium
              </div>
              <div>{activeUser.isPremium ? 'Yes' : 'No'}</div>
            </div>
            <div className="d-flex user-info">
              <div className="user-info-title font-weight-bold">
                Verified
              </div>
              <div>{activeUser.verified ? 'Yes' : 'No'}</div>
            </div>
            <div className="d-flex user-info">
              <div className="user-info-title font-weight-bold">
                Age
              </div>
              <div>{activeUser.age}</div>
            </div>
            <div className="d-flex user-info">
              <div className="user-info-title font-weight-bold">
                gender
              </div>
              <div>{activeUser.gender}</div>
            </div>
            <div className="d-flex user-info">
              <div className="user-info-title font-weight-bold">
                City
              </div>
              <div>{activeUser.city}</div>
            </div>
            <div className="d-flex user-info">
              <div className="user-info-title font-weight-bold">
                Town
              </div>
              <div>{activeUser.province}</div>
            </div>
            <div className="d-flex user-info">
              <div className="user-info-title font-weight-bold">
                Country
              </div>
              <div>{activeUser.country}</div>
            </div>
            <div className="d-flex user-info">
              <div className="user-info-title font-weight-bold">
                Native country
              </div>
              <div>{activeUser.homeCountry}</div>
            </div>
            <div className="d-flex user-info">
              <div className="user-info-title font-weight-bold">
                Greeting text
              </div>
              <div>{activeUser.greetingText}</div>
            </div>
          </div>
        </PerfectScrollbar>
      </div>
    )
  }
}
export default ReceiverProfile
