import React from "react"
import { history } from "./../history";
import { connect } from "react-redux";
import AuthRoutes from "./AuthRoutes";
import { Router } from "react-router-dom"
import UnauthRoutes from "./UnauthRoutes";
import {setAuthUser} from "../redux/actions/auth";
import {isUserIntoStoreValid} from "../helpers/helpers";
import {NotificationContainer} from "react-notifications";
import Spinner from "../components/@vuexy/spinner/Loading-spinner";
import {disableAppLoading} from "../redux/actions/AppLoadingAction";
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
        const { appLoading } = this.props;

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
