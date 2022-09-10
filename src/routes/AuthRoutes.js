import React from "react";
import { Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";

import RouteWrapper from "./RouteWrapper";
import {APP, AUTH} from "../utility/urls/frontend";
import * as DynamicImports from "../views/lazy-imports";

const AuthRoutes = () => {
    return (
        <Switch>
            <RouteWrapper path={APP.USERS} component={DynamicImports.Users} />
            <RouteWrapper exact path={APP.HOME} component={DynamicImports.Welcome} />
            <RouteWrapper path={AUTH.PASSWORD} component={DynamicImports.Password} />
            <RouteWrapper path={APP.FEEDBACKS} component={DynamicImports.Feedbacks} />
            <RouteWrapper path={APP.NOTATIONS} component={DynamicImports.Notations} /> 
            <RouteWrapper path={APP.VERIFICATIONS} component={DynamicImports.Verifications} /> 
            <RouteWrapper path={APP.BACKOFFICE_USERS} component={DynamicImports.BackofficeUsers} />
            <RouteWrapper path={APP.OLD_VERIFICATIONS} component={DynamicImports.OldVerifications} />
            <Redirect to={{ pathname: APP.HOME }} />
        </Switch>
    );
};

export default AuthRoutes
