import React from "react";
import {X} from "react-feather";
import {Button, Spinner} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import Error500 from "../Error500";
import "../../assets/scss/pages/users.scss";
import MetaData from "../../models/MetaData";
import FormModal from "../../components/FormModal";
import UserSouscriptions from "./UserSouscriptions";
import DisplayImage from "../../components/DisplayImage";
import {getUserMetaData} from "../../redux/actions/IndependentActions";

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
      // Souscription modal
      souscriptionModal: {show: false, title: ""},
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.activeUser !== state.activeUser) return {
      activeUser: props.activeUser,
      loading: false, error: null, metaData: null, show: false
    }
    return null
  }

  handleShowMetaData = () => {
     this.setState({loading: true, error: null, metaData: null, show: false});
     getUserMetaData(this.state.activeUser?.id)
         .then(data => {
           const metaData = new MetaData(data);
           this.setState({ metaData, show: true })
         })
         .catch(error => this.setState({ error }))
         .finally(() => this.setState({ loading: false }));
  }
 
  toggleSouscriptionModal = () => {
      const {souscriptionModal, activeUser} = this.state;
      if(souscriptionModal.show) this.setState({souscriptionModal: {...souscriptionModal, show: false}});
      else {
        const title = activeUser.isDeleted ? "Deleted user" : `${activeUser.name} souscriptions history`;
        this.setState({souscriptionModal: {show: true, title}});
      }
  };

  render() {
    const { activeUser, metaData, souscriptionModal } = this.state;
    const { receiverProfile, handleReceiverSidebar } = this.props;

    if (!activeUser) return null;

    return (
      <>
        <div className={`user-profile-sidebar ${receiverProfile ? "show" : null}`}>
          <header className="user-profile-header">
            <span className="close-icon" onClick={() => handleReceiverSidebar("close")}>
              <X size={24} />
            </span>
            <div className="header-profile-sidebar">
              <div className="avatar">
                <DisplayImage src={activeUser.imageSrc} height="70" width="70" />
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
                {(activeUser.isPremium)
                    ? <div className="font-weight-bold text-success">Yes</div>
                    : <div className="font-weight-bold text-danger">No</div>
                }
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                  Verified
                </div>
                {(activeUser.verified)
                    ? <div className="font-weight-bold text-success">Yes</div>
                    : <div className="font-weight-bold text-danger">No</div>
                }
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
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                  End subcription
                </div>
                {(activeUser.verified)
                    ? <div className="font-weight-bold text-success">{activeUser.subscriptionEndDate}</div>
                    : <div className="font-weight-bold text-danger">{activeUser.subscriptionEndDate}</div>
                }
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                  User ID
                </div>
                <div className="font-weight-bold text-primary">{activeUser.id}</div>
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
                    {/*<div className="d-flex user-info">
                      <div className="user-info-title font-weight-bold">
                        Created at
                      </div>
                      <div className="text-primary font-weight-bold">
                        {metaData.createdDate?.format('LL')}
                      </div>
                    </div>*/}
                  </div>
              )}
              <div className="text-center">
                {(this.state.loading) ? <Spinner color="primary" /> : (
                    (!this.state.show) && (
                        <Button color="danger" onClick={this.handleShowMetaData}>
                          Private data
                        </Button>
                    )
                )}
                <Button color="primary" className="ml-50" onClick={this.toggleSouscriptionModal}>
                    Souscriptions
                </Button>
              </div>
            </div>
          </PerfectScrollbar>
        </div> 
        <FormModal small modal={souscriptionModal} toggleModal={this.toggleSouscriptionModal}>
          <UserSouscriptions userId={activeUser.id} />
        </FormModal>
      </>
    )
  }
}
export default UserProfile
