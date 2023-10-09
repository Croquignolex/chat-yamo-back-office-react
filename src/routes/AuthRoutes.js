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
            <RouteWrapper path={APP.EXPORTS} component={DynamicImports.Exports} />
            <RouteWrapper exact path={APP.HOME} component={DynamicImports.Welcome} />
            <RouteWrapper path={AUTH.PASSWORD} component={DynamicImports.Password} />
            <RouteWrapper path={APP.FEEDBACKS} component={DynamicImports.Feedbacks} />
            <RouteWrapper path={APP.TOWN_EVENTS} component={DynamicImports.TownEvents} />
            <RouteWrapper path={APP.USERS_IMAGES} component={DynamicImports.UserImages} />
            <RouteWrapper path={APP.BACKOFFICE_USERS} component={DynamicImports.BackofficeUsers} />
            <RouteWrapper path={APP.EXPORTS_BLACKLIST} component={DynamicImports.ExportsBlackList} />
            <RouteWrapper path={APP.PROFILE_NOTATIONS} component={DynamicImports.ProfileNotations} />
            <RouteWrapper path={APP.MANUAL_ACTIVATION} component={DynamicImports.ManualActivation} />
            <Redirect to={{ pathname: APP.HOME }} />
        </Switch>
    );
};

export default AuthRoutes
