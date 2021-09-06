import React from "react";
import { X } from "react-feather";
import "../../assets/scss/pages/users.scss";
import PerfectScrollbar from "react-perfect-scrollbar"

class ReceiverProfile extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.activeUser !== state.activeUser) {
      return {
        activeUser: props.activeUser
      }
    }
    // Return null if the state hasn't changed
    return null
  }
  state = {
    activeUser: null
  }

  render() {
    const { activeUser } = this.state;

    if (!activeUser)
      return null;

    return (
      <div
        className={`user-profile-sidebar ${
          this.props.receiverProfile ? "show" : null
        }`}
      >
        <header className="user-profile-header">
          <span
            className="close-icon"
            onClick={() => this.props.handleReceiverSidebar("close")}
          >
            <X size={24} />
          </span>
          <div className="header-profile-sidebar">
            <div className="avatar">
              <img src={activeUser.imageSrc} alt="..." height="66" width="66"/>
            </div>
            <h4 className="chat-user-name">
              {activeUser.isDeleted ? "Deleted user" : activeUser.name}
            </h4>
          </div>
        </header>
        <PerfectScrollbar
          className="user-profile-sidebar-area p-2"
          options={{
            wheelPropagation: false
          }}
        >
          <div className="users-page-view-table">
            <div className="d-flex user-info">
              <div className="user-info-title font-weight-bold">
                Premium
              </div>
              <div>{activeUser.isPremium ? 'Oui' : 'Non'}</div>
            </div>
            <div className="d-flex user-info">
              <div className="user-info-title font-weight-bold">
                Verifié
              </div>
              <div>{activeUser.verified ? 'Oui' : 'Non'}</div>
            </div>
            <div className="d-flex user-info">
              <div className="user-info-title font-weight-bold">
                Age
              </div>
              <div>{activeUser.age}</div>
            </div>
            <div className="d-flex user-info">
              <div className="user-info-title font-weight-bold">
                Genre
              </div>
              <div>{activeUser.gender}</div>
            </div>
            <div className="d-flex user-info">
              <div className="user-info-title font-weight-bold">
                Cité
              </div>
              <div>{activeUser.city}</div>
            </div>
            <div className="d-flex user-info">
              <div className="user-info-title font-weight-bold">
                Province
              </div>
              <div>{activeUser.province}</div>
            </div>
            <div className="d-flex user-info">
              <div className="user-info-title font-weight-bold">
                Pays
              </div>
              <div>{activeUser.country}</div>
            </div>
            <div className="d-flex user-info">
              <div className="user-info-title font-weight-bold">
                Pays d'origine
              </div>
              <div>{activeUser.homeCountry}</div>
            </div>
            <div className="d-flex user-info">
              <div className="user-info-title font-weight-bold">
                Text de salutation
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
