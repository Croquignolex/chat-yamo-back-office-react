import React from 'react';
import { Switch, Redirect } from "react-router-dom";

import RouteWrapper from "./RouteWrapper";
import {Login} from "../views/lazy-imports";
import {AUTH} from "../utility/urls/frontend";

const UnauthRoutes = () => {
    return (
        <Switch>
            <RouteWrapper path={AUTH.LOGIN} component={Login} fullLayout />
            <Redirect to={{ pathname: AUTH.LOGIN }} />
        </Switch>
    );
};

export default UnauthRoutes;
