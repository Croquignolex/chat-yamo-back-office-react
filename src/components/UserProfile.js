import React from "react";
import {X} from "react-feather";
import * as Icon from "react-feather";
import {Button, Spinner} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import FormModal from "./FormModal";
import Error500 from "../views/Error500";
import MetaData from "../models/MetaData";
import DisplayImage from "./DisplayImage";
import UserAppData from "../views/users/UserAppData";
import UserTownEvents from "../views/users/UserTownEvents";
import UserStatusHistory from "../views/users/UserStatusHistory";
import UserSouscriptions from "../views/users/UserSouscriptions";
import {getFreeConversation, getUserMetaData, getUserSouscriptions} from "../redux/actions/IndependentActions";

import "../assets/scss/pages/users.scss";
import Souscriptions from "../models/Souscriptions";
import dayjs from "dayjs";

class UserProfile extends React.Component {
  // props { receiverProfile, activeUser, handleReceiverSidebar }
  constructor(props) {
    super(props);
    this.state = {
      activeUser: null,
      // Metadata state
      show: false,
      error: null,
      loading: false,
      metaData: null,
      freeConversation: 0,
      subscription: "",
      // Modals
      townEventModal: {show: false, title: ""},
      souscriptionModal: {show: false, title: ""},
      statusHistoryModal: {show: false, title: ""},
      appDataModal: {show: false, title: ""}
    }
  }

  componentDidMount() {
    this.showMetaData();
    this.handleFreeConversation();
    this.handleSubscription();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.activeUser !== this.props.activeUser) {
      this.showMetaData();
      this.handleFreeConversation();
      this.handleSubscription()
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.activeUser !== state.activeUser) {
      return {
        activeUser: props.activeUser,
        loading: false, error: null, metaData: null, show: false
      }
    }
    return null
  }

  handleFreeConversation = () => {
    const id = this.state.activeUser?.id || this.state.activeUser?.userId;

    if(id) {
      getFreeConversation(id)
          .then(data => {
            this.setState({ freeConversation: data?.count })
          })
          .catch(() => this.setState({ freeConversation: 'ERROR' }));
    }
  }

  handleSubscription = () => {
    const id = this.state.activeUser?.id || this.state.activeUser?.userId;

    if(id) {
      getUserSouscriptions(id)
          .then(data => {
            const sub = new Souscriptions(data[0]);
            console.log({data}, data[0], sub, dayjs().isBefore(sub.endDate))
            if(dayjs().isBefore(sub.endDate)) {
              const subscription = `${sub.pack} (${sub.type})`;
              this.setState({ subscription });
            }
          })
          .catch(() => this.setState({ subscription: 'ERROR' }));
    }
  }

  showMetaData = () => {
    const id = this.state.activeUser?.id || this.state.activeUser?.userId;

    if(id) {
      getUserMetaData(id)
          .then(data => {
            const metaData = new MetaData(data);
            this.setState({ metaData })
          })
          .catch(error => this.setState({ error }));
    }
  }
 
  toggleSouscriptionModal = () => {
      const {souscriptionModal, activeUser} = this.state;
      if(souscriptionModal.show) this.setState({souscriptionModal: {...souscriptionModal, show: false}});
      else {
        const title = activeUser?.isDeleted ? "Deleted user" : `${activeUser?.name} souscriptions history`;
        this.setState({souscriptionModal: {show: true, title}});
      }
  };

  toggleTownEventModal = () => {
      const {townEventModal, activeUser} = this.state;
      if(townEventModal.show) this.setState({townEventModal: {...townEventModal, show: false}});
      else {
        const title = activeUser?.isDeleted ? "Deleted user" : `${activeUser?.name} town event check`;
        this.setState({townEventModal: {show: true, title}});
      }
  };

  toggleStatusHistoryModal = () => {
    const {statusHistoryModal, activeUser} = this.state;
    if(statusHistoryModal.show) this.setState({statusHistoryModal: {...statusHistoryModal, show: false}});
    else {
      const title = activeUser?.isDeleted ? "Deleted user" : `${activeUser?.name} status history`;
      this.setState({statusHistoryModal: {show: true, title}});
    }
  };

  toggleAppDataModal = () => {
    const {appDataModal, activeUser} = this.state;
    if(appDataModal.show) this.setState({appDataModal: {...appDataModal, show: false}});
    else {
      const title = activeUser?.isDeleted ? "Deleted user" : `${activeUser?.name} app data`;
      this.setState({appDataModal: {show: true, title}});
    }
  };

  render() {
    const { activeUser, metaData, freeConversation, subscription, souscriptionModal, townEventModal, statusHistoryModal, appDataModal } = this.state;
    const { receiverProfile, handleReceiverSidebar } = this.props;

    if (!activeUser) return null;
// console.log({metaData})
    return (
      <>
        <div className={`user-profile-sidebar ${receiverProfile ? "show" : null}`}>
          <header className="user-profile-header">
            <span className="close-icon" onClick={() => handleReceiverSidebar("close")}>
              <X size={24} />
            </span>
            <div className="header-profile-sidebar">
              <div className="avatar">
                <DisplayImage src={activeUser?.imageSrc} height="70" width="70" />
              </div>
              <h4 className="chat-user-name"> 
                {activeUser?.isDeleted ? "Deleted user" : activeUser?.name}
                <br/>
                {!activeUser?.isBlocked
                    ? <Icon.Unlock size={20} className="text-success" />
                    : <Icon.Lock size={20} className="text-danger" />
                } 
              </h4>
            </div>
          </header>
          <PerfectScrollbar className="user-profile-sidebar-area p-2" options={{wheelPropagation: false}}>
            <div className="users-page-view-table">
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                  Premium
                </div>
                {(activeUser?.isPremium)
                    ? <div className="font-weight-bold text-success">Yes</div>
                    : <div className="font-weight-bold text-danger">No</div>
                }
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                  Subscription
                </div>
                <div className="font-weight-bold text-primary">
                  {subscription}
                </div>
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                  Certified
                </div>
                {(activeUser?.isCertified)
                    ? <div className="font-weight-bold text-success">Yes</div>
                    : <div className="font-weight-bold text-danger">No</div>
                }
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                  Verified
                </div>
                {(activeUser?.verified)
                    ? <div className="font-weight-bold text-success">Yes</div>
                    : <div className="font-weight-bold text-danger">No</div>
                }
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                  Blocked
                </div>
                {(activeUser?.isBlocked)
                    ? <div className="font-weight-bold text-danger">Yes</div>
                    : <div className="font-weight-bold text-success">No</div>
                }
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                  Deleted
                </div>
                {(activeUser?.isDeleted)
                    ? <div className="font-weight-bold text-danger">Yes</div>
                    : <div className="font-weight-bold text-success">No</div>
                }
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                  Blacklisted
                </div>
                {(activeUser?.isBlacklisted)
                    ? <div className="font-weight-bold text-danger">Yes</div>
                    : <div className="font-weight-bold text-success">No</div>
                }
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                  Age
                </div>
                <div>{activeUser?.age}</div>
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                  gender
                </div>
                <div>{activeUser?.gender ? activeUser?.gender : 'none'}</div>
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                  City
                </div>
                <div>{activeUser?.city}</div>
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                  Town
                </div>
                <div>{activeUser?.province}</div>
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                  Country
                </div>
                <div>{activeUser?.country}</div>
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                  Native country
                </div>
                <div>{activeUser?.homeCountry}</div>
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                  Greeting text
                </div>
                <div>{activeUser?.greetingText}</div>
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                  Account creation
                </div>
                <div className="font-weight-bold text-primary">{metaData?.creation}</div>
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                  Free conversation
                </div>
                <div className="font-weight-bold text-primary">{freeConversation}</div>
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                  End subcription
                </div>
                {(activeUser?.verified)
                    ? <div className="font-weight-bold text-success">{activeUser?.subscriptionEndDate}</div>
                    : <div className="font-weight-bold text-danger">{activeUser?.subscriptionEndDate}</div>
                }
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                  App version
                </div>
                <div className="font-weight-bold text-primary">{activeUser?.appData?.appVersion}</div>
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                  User ID
                </div>
                <div className="font-weight-bold text-primary">{activeUser?.id}</div>
              </div>
              <hr />
              {(this.state.error) && <Error500 refresh={false} />}
              {(this.state.show) && (
                  <div className="mb-50 border border-danger p-50">
                    <div className="d-flex user-info">
                      <div className="user-info-title font-weight-bold">
                        Identifier
                      </div>
                      <div className="text-primary font-weight-bold">
                        {metaData?.id}
                      </div>
                    </div>
                    <div className="d-flex user-info">
                      <div className="user-info-title font-weight-bold">
                        Old Phone
                      </div>
                      <div className="text-primary font-weight-bold">
                        {metaData?.oldPhone}
                      </div>
                    </div>
                  </div>
              )}
              <div className="text-center">
                {(this.state.loading) ? <Spinner color="primary" /> : (
                    (!this.state.show) && (
                        <Button color="danger" onClick={() => this.setState({show: true})}>
                          Private data
                        </Button>
                    )
                )}
                {(!this.state.loading) && (
                    <Button color="primary" className="ml-50" onClick={this.toggleSouscriptionModal}>
                      Souscriptions
                    </Button>
                )} 
              </div>
              <hr />
              <div className="text-center">
                <Button color="primary" onClick={this.toggleStatusHistoryModal}>
                  Status history
                </Button>
                <Button color="primary" onClick={this.toggleTownEventModal} className="ml-50">
                    Town event
                </Button>
                <Button color="info" onClick={this.toggleAppDataModal} className="mt-50">
                  App Data
                </Button>
              </div>
            </div>
          </PerfectScrollbar>
        </div> 
        <FormModal small modal={souscriptionModal} toggleModal={this.toggleSouscriptionModal}>
          <UserSouscriptions userId={activeUser?.id} />
        </FormModal>
        <FormModal small modal={townEventModal} toggleModal={this.toggleTownEventModal}>
          <UserTownEvents userId={activeUser?.id} />
        </FormModal>
        <FormModal small modal={statusHistoryModal} toggleModal={this.toggleStatusHistoryModal}>
          <UserStatusHistory userId={activeUser?.id} />
        </FormModal>
        <FormModal small modal={appDataModal} toggleModal={this.toggleAppDataModal}>
          <UserAppData appData={activeUser?.appData} />
        </FormModal>
      </>
    )
  }
}
export default UserProfile
