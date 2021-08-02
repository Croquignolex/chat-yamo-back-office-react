import { history } from "./../history";
import { connect } from "react-redux";
import React, { Suspense, lazy } from "react"
import { Router, Switch, Route } from "react-router-dom"
import {NotificationContainer} from "react-notifications";
import {isUserIntoStoreValid} from "../helpers/helpers";
import Spinner from "../components/@vuexy/spinner/Loading-spinner";
import {setAuthUser} from "../redux/actions/auth";
import {disableAppLoading} from "../redux/actions/AppLoadingAction";
import AuthRoutes from "./AuthRoutes";
import UnauthRoutes from "./UnauthRoutes";
import RequestGlobalLoader from "../components/RequestGlobalLoader";

class AppRouter extends React.Component {
    componentDidMount() {
        this.isNewUser();
    }

    /**
     * Check whether the current user is a new or not
     */
    isNewUser = () => {
        this.props
            .setAuthUser()
            .finally(() => this.props.disableAppLoading());
    };

    render() {
        const _isUserIntoStoreValid = isUserIntoStoreValid(this.props.authUser.data);
        const { location, match, authUser, appLoading } = this.props;
        console.log("_isUserIntoStoreValid => ", _isUserIntoStoreValid);

        return (
            <>
                {appLoading ? (
                    <Spinner />
                ) : (
                  <>
                      <NotificationContainer />
                      <RequestGlobalLoader />
                      <Router history={history}>
                          {_isUserIntoStoreValid ? (
                              <AuthRoutes />
                          ) : (
                              <UnauthRoutes />
                          )}
                      </Router>
                  </>
                )}
            </>
        )
    }
}

// map state to props
const mapStateToProps = ({ authUser, tokens, appLoading }) => {
    return { tokens, authUser, appLoading };
};

export default connect(mapStateToProps, {setAuthUser, disableAppLoading})(AppRouter);
