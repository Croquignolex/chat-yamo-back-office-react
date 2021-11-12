import React, { Suspense } from "react"
import { Route } from "react-router-dom"
import { ContextLayout } from "../utility/context/Layout"
import Spinner from "../components/@vuexy/spinner/Loading-spinner";

const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            return (
                <ContextLayout.Consumer>
                    {context => {
                        let LayoutTag =
                            fullLayout === true
                                ? context.fullLayout
                                : context.VerticalLayout
                        return (
                            <LayoutTag {...props} permission={props.user}>
                                <Suspense fallback={<Spinner />}>
                                    <Component {...props} />
                                </Suspense>
                            </LayoutTag>
                        )
                    }}
                </ContextLayout.Consumer>
            )
        }}
    />
);

export default RouteConfig;
