import React from 'react';
import RouteWrapper from "./RouteWrapper";
import {AUTH} from "../utility/urls/frontend";
import { Switch, Redirect } from "react-router-dom";
import { Login } from "../views/lazy-imports";

const UnauthRoutes = () => {
    return (
        <Switch>
            <RouteWrapper path={AUTH.LOGIN} component={Login} fullLayout />

            <Redirect
                to={{
                    pathname: AUTH.LOGIN,
                    state: {
                        fromUrl: window.location.pathname
                    }
                }}
            />
        </Switch>
    );
};

export default UnauthRoutes;
