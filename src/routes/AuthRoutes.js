import React from "react";
import { Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";

import RouteWrapper from "./RouteWrapper";
import {TICKETS, AUTH} from "../utility/urls/frontend";
import * as DynamicImports from "../views/lazy-imports";

class AuthRoutes extends React.Component {
    render() {
        return (
            <Switch>
                <RouteWrapper exact path="/" component={DynamicImports.Welcome} />
                <RouteWrapper path={TICKETS.LIST} component={DynamicImports.Feedbacks} />
                <RouteWrapper path={AUTH.PASSWORD} component={DynamicImports.Password} />

                <Redirect to={{ pathname: '/' }} />
            </Switch>
        )
    }
}

export default AuthRoutes
