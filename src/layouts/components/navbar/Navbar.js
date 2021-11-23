import React from "react";
import { Navbar } from "reactstrap";
import { connect } from "react-redux";

import NavbarUser from "./NavbarUser";
import userImg from "../../../assets/img/user-default.png";
import { logoutWithJWT} from "../../../redux/actions/auth";

const ThemeNavbar = props => {
  return (
    <React.Fragment>
      <div className="content-overlay" />
      <div className="header-navbar-shadow" />
      <Navbar className="header-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow navbar-light floating-nav">
        <div className="navbar-wrapper">
          <div className="navbar-container content">
            <div className="navbar-collapse d-flex justify-content-between align-items-center" id="navbar-mobile">
              <div className="bookmark-wrapper" />
              <NavbarUser
                  userImg={userImg}
                  authUser={props.authUser}
                  logoutWithJWT={props.logoutWithJWT}
              />
            </div>
          </div>
        </div>
      </Navbar>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    authUser: state.authUser.data,
  }
};

export default connect(mapStateToProps, {logoutWithJWT})(ThemeNavbar)
