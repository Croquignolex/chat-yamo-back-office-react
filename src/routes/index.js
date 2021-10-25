import React from "react"
import { connect } from "react-redux";
import { Router } from "react-router-dom"
import {NotificationContainer} from "react-notifications";

import { history } from "../history";
import AuthRoutes from "./AuthRoutes";
import UnauthRoutes from "./UnauthRoutes";
import {getAuthToken} from "../helpers/tokens";
import {setAuthUser} from "../redux/actions/auth";
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
        const _isUserIntoStoreValid = getAuthToken().entityId;
        const { appLoading } = this.props;

        return (
            <>
                {appLoading ? <Spinner /> : (
                  <>
                      <NotificationContainer />
                      <RequestGlobalLoader />
                      <Router history={history}>
                          {_isUserIntoStoreValid ? <AuthRoutes /> : <UnauthRoutes />}
                      </Router>
                  </>
                )}
            </>
        )
    }
}

// map state to props
const mapStateToProps = ({ authUser, appLoading }) => {
    return { authUser, appLoading };
};

export default connect(mapStateToProps, {setAuthUser, disableAppLoading})(AppRouter);
