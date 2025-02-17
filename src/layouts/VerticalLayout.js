import classnames from "classnames";
import {connect} from "react-redux";
import React, { PureComponent } from "react";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/menu/vertical-menu/Sidebar";
class VerticalLayout extends PureComponent {
  state = {
    width: window.innerWidth,
    sidebarState: false,
    layout: "light",
    collapsedContent: false,
    sidebarHidden: false,
    currentLang: "en",
    appOverlay: false,
    customizer: false,
    currRoute: this.props.location.pathname
  };
  collapsedPaths = [];
  mounted = false;
  updateWidth = () => {
    if (this.mounted) {
      this.setState(() => ({
        width: window.innerWidth
      }));
    }
  };

  handleCustomizer = bool => {
    this.setState({
      customizer: bool
    });
  };

  componentDidMount() {
    this.mounted = true;
    let {location: { pathname }} = this.props;

    if (this.mounted) {
      if (window !== "undefined") {
        window.addEventListener("resize", this.updateWidth, false);
      }
      if (this.collapsedPaths.includes(pathname)) {
        this.props.collapseSidebar(true);
      }
      let layout = "light";
      document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
      return layout === "dark"
        ? document.body.classList.add("dark-layout")
        : layout === "semi-dark"
        ? document.body.classList.add("semi-dark-layout")
        : null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let layout = "light";
    if (this.mounted) {
      if (layout === "dark") {
        document.body.classList.remove("semi-dark-layout");
        document.body.classList.add("dark-layout");
      }
      if (layout === "semi-dark") {
        document.body.classList.remove("dark-layout");
        document.body.classList.add("semi-dark-layout");
      }
      if (layout !== "dark" && layout !== "semi-dark") {
        document.body.classList.remove("dark-layout", "semi-dark-layout");
      }
    }
  }

  handleCollapsedMenuPaths = item => {
    let collapsedPaths = this.collapsedPaths;
    if (!collapsedPaths.includes(item)) {
      collapsedPaths.push(item);
      this.collapsedPaths = collapsedPaths;
    }
  };

  toggleSidebarMenu = () => {
    this.setState({
      sidebarState: !this.state.sidebarState,
      collapsedContent: !this.state.collapsedContent
    });
  };

  sidebarMenuHover = val => {
    this.setState({
      sidebarState: val
    });
  };

  handleSidebarVisibility = () => {
    if (this.mounted) {
      if (window !== undefined) {
        window.addEventListener("resize", () => {
          if (this.state.sidebarHidden) {
            this.setState({
              sidebarHidden: !this.state.sidebarHidden
            });
          }
        });
      }
      this.setState({
        sidebarHidden: !this.state.sidebarHidden
      });
    }
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  handleCurrentLanguage = lang => {
    this.setState({
      currentLang: lang
    });
  };

  handleAppOverlay = value => {
    if (value.length > 0) {
      this.setState({
        appOverlay: true
      });
    } else if (value.length < 0 || value === "") {
      this.setState({
        appOverlay: false
      });
    }
  };

  handleAppOverlayClick = () => {
    this.setState({
      appOverlay: false
    });
  };

  render() {
    let sidebarProps = {
      toggleSidebarMenu: this.props.collapseSidebar,
      toggle: this.toggleSidebarMenu,
      sidebarState: this.state.sidebarState,
      sidebarHover: this.sidebarMenuHover,
      sidebarVisibility: this.handleSidebarVisibility,
      visibilityState: this.state.sidebarHidden,
      activePath: this.props.match.path,
      collapsedMenuPaths: this.handleCollapsedMenuPaths,
      currentLang: this.state.currentLang,
      activeTheme: "primary",
      collapsed: this.state.collapsedContent,
      permission: this.props.permission,
      deviceWidth: this.state.width,
      // Template restriction (current user is used for user role/permission)
      currentUser: this.props.userRoles
    };
    let navbarProps = {
      toggleSidebarMenu: this.toggleSidebarMenu,
      sidebarState: this.state.sidebarState,
      sidebarVisibility: this.handleSidebarVisibility,
      currentLang: this.state.currentLang,
      changeCurrentLang: this.handleCurrentLanguage,
      handleAppOverlay: this.handleAppOverlay,
      appOverlayState: this.state.appOverlay,
      navbarColor: "default",
      navbarType: "floating"
    };

    let footerProps = {
      footerType: "static",
      hideScrollToTop: false
    };

    return (
      <div
        className={classnames(
          `wrapper vertical-layout theme-primary`,
          {
            "menu-collapsed": this.state.collapsedContent === true && this.state.width >= 1200,
            "fixed-footer": false,
            "navbar-static": false,
            "navbar-sticky": false,
            "navbar-floating": true,
            "navbar-hidden": false,
          }
        )}
      >
        <Sidebar {...sidebarProps} />
        <div
          className={classnames("app-content content", {
            "show-overlay": this.state.appOverlay === true
          })}
          onClick={this.handleAppOverlayClick}
        >
          <Navbar {...navbarProps} />
          <div className="content-wrapper">{this.props.children}</div>
        </div>

        <Footer {...footerProps} />
        <div className="sidenav-overlay" onClick={this.handleSidebarVisibility} />
      </div>
    );
  }
}
 
// map state to props
const mapStateToProps = ({ authUser }) => {
  const roles = authUser.data?.roles || [];
  return { userRoles: roles };
};

export default connect(mapStateToProps)(VerticalLayout);
