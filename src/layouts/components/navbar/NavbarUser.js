import React from "react"
import * as Icon from "react-feather"
import { history } from "../../../history"
import {
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap"

import {AUTH} from "../../../utility/urls/frontend";

const handleNavigation = (e, path) => {
  e.preventDefault()
  history.push(path)
}

const handleLogout = (e, logout) => {
    e.preventDefault();
    logout();
    history.push(AUTH.LOGIN);
}

const UserDropdown = props => {
  return (
    <DropdownMenu right>
      <DropdownItem tag="a" href="#" onClick={e => handleNavigation(e, AUTH.PASSWORD)}>
        <Icon.Key size={14} className="mr-50" />
        <span className="align-middle">Password</span>
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem tag="a" href="#" onClick={e => handleLogout(e, props.logoutWithJWT)}>
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle">Log Out</span>
      </DropdownItem>
    </DropdownMenu>
  )
}

class NavbarUser extends React.PureComponent {
  render() {
    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name text-bold-600">
                {this.props.authUser?.firstName}
              </span>
              <span className="user-status">{this.props.authUser?.username}</span>
            </div>
            <span data-tour="user">
              <img src={this.props.userImg} className="round" height="40" width="40" alt="..." />
            </span>
          </DropdownToggle>
          <UserDropdown {...this.props} />
        </UncontrolledDropdown>
      </ul>
    )
  }
}

export default NavbarUser
