import React from "react";
import RouteWrapper from "./RouteWrapper";
import { Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import {TICKETS} from "../utility/urls/frontend";
import * as DynamicImports from "../views/lazy-imports";
import knowledgeBaseCategory from "../views/pages/knowledge-base/Category";
import knowledgeBaseQuestion from "../views/pages/knowledge-base/Questions";

class AuthRoutes extends React.Component {
    render() {
        return (
            <Switch>
                <RouteWrapper exact path="/" component={DynamicImports.analyticsDashboard} />
                <RouteWrapper path={TICKETS.LIST} component={DynamicImports.tickets} />
                <RouteWrapper
                    path="/ecommerce-dashboard"
                    component={DynamicImports.ecommerceDashboard}
                />
                <RouteWrapper
                    path="/email"
                    exact
                    component={() => <Redirect to="/email/inbox" />}
                />
                <RouteWrapper path="/email/:filter" component={DynamicImports.email} />
                <RouteWrapper path="/chat" component={DynamicImports.chat} />
                <RouteWrapper
                    path="/todo"
                    exact
                    component={() => <Redirect to="/todo/all" />}
                />
                <RouteWrapper path="/todo/:filter" component={DynamicImports.todo} />
                <RouteWrapper path="/calendar" component={DynamicImports.calendar} />
                <RouteWrapper path="/ecommerce/shop" component={DynamicImports.shop} />
                <RouteWrapper path="/ecommerce/wishlist" component={DynamicImports.wishlist} />
                <RouteWrapper
                    path="/ecommerce/product-detail"
                    component={DynamicImports.productDetail}
                />
                <RouteWrapper
                    path="/ecommerce/checkout"
                    component={DynamicImports.checkout}
                    permission="admin"
                />
                <RouteWrapper path="/data-list/list-view" component={DynamicImports.listView} />
                <RouteWrapper path="/data-list/thumb-view" component={DynamicImports.thumbView} />
                <RouteWrapper path="/ui-element/grid" component={DynamicImports.grid} />
                <RouteWrapper path="/ui-element/typography" component={DynamicImports.typography} />
                <RouteWrapper
                    path="/ui-element/textutilities"
                    component={DynamicImports.textutilities}
                />
                <RouteWrapper
                    path="/ui-element/syntaxhighlighter"
                    component={DynamicImports.syntaxhighlighter}
                />
                <RouteWrapper path="/colors/colors" component={DynamicImports.colors} />
                <RouteWrapper path="/icons/reactfeather" component={DynamicImports.reactfeather} />
                <RouteWrapper path="/cards/basic" component={DynamicImports.basicCards} />
                <RouteWrapper path="/cards/statistics" component={DynamicImports.statisticsCards} />
                <RouteWrapper path="/cards/analytics" component={DynamicImports.analyticsCards} />
                <RouteWrapper path="/cards/action" component={DynamicImports.actionCards} />
                <RouteWrapper path="/components/alerts" component={DynamicImports.Alerts} />
                <RouteWrapper path="/components/buttons" component={DynamicImports.Buttons} />
                <RouteWrapper path="/components/breadcrumbs" component={DynamicImports.Breadcrumbs} />
                <RouteWrapper path="/components/carousel" component={DynamicImports.Carousel} />
                <RouteWrapper path="/components/collapse" component={DynamicImports.Collapse} />
                <RouteWrapper path="/components/dropdowns" component={DynamicImports.Dropdowns} />
                <RouteWrapper path="/components/list-group" component={DynamicImports.ListGroup} />
                <RouteWrapper path="/components/modals" component={DynamicImports.Modals} />
                <RouteWrapper path="/components/pagination" component={DynamicImports.Pagination} />
                <RouteWrapper path="/components/nav-component" component={DynamicImports.NavComponent} />
                <RouteWrapper path="/components/navbar" component={DynamicImports.Navbar} />
                <RouteWrapper path="/components/tabs-component" component={DynamicImports.Tabs} />
                <RouteWrapper path="/components/pills-component" component={DynamicImports.TabPills} />
                <RouteWrapper path="/components/tooltips" component={DynamicImports.Tooltips} />
                <RouteWrapper path="/components/popovers" component={DynamicImports.Popovers} />
                <RouteWrapper path="/components/badges" component={DynamicImports.Badge} />
                <RouteWrapper path="/components/pill-badges" component={DynamicImports.BadgePill} />
                <RouteWrapper path="/components/progress" component={DynamicImports.Progress} />
                <RouteWrapper path="/components/media-objects" component={DynamicImports.Media} />
                <RouteWrapper path="/components/spinners" component={DynamicImports.Spinners} />
                <RouteWrapper path="/components/toasts" component={DynamicImports.Toasts} />
                <RouteWrapper
                    path="/extra-components/auto-complete"
                    component={DynamicImports.AutoComplete}
                />
                <RouteWrapper path="/extra-components/avatar" component={DynamicImports.avatar} />
                <RouteWrapper path="/extra-components/chips" component={DynamicImports.chips} />
                <RouteWrapper path="/extra-components/divider" component={DynamicImports.divider} />
                <RouteWrapper path="/forms/wizard" component={DynamicImports.vuexyWizard} />
                <RouteWrapper path="/forms/elements/select" component={DynamicImports.select} />
                <RouteWrapper path="/forms/elements/switch" component={DynamicImports.switchComponent} />
                <RouteWrapper path="/forms/elements/checkbox" component={DynamicImports.checkbox} />
                <RouteWrapper path="/forms/elements/radio" component={DynamicImports.radio} />
                <RouteWrapper path="/forms/elements/input" component={DynamicImports.input} />
                <RouteWrapper path="/forms/elements/input-group" component={DynamicImports.group} />
                <RouteWrapper
                    path="/forms/elements/number-input"
                    component={DynamicImports.numberInput}
                />
                <RouteWrapper path="/forms/elements/textarea" component={DynamicImports.textarea} />
                <RouteWrapper path="/forms/elements/pickers" component={DynamicImports.pickers} />
                <RouteWrapper path="/forms/elements/input-mask" component={DynamicImports.inputMask} />
                <RouteWrapper path="/forms/layout/form-layout" component={DynamicImports.layout} />
                <RouteWrapper path="/forms/formik" component={DynamicImports.formik} />{" "}
                <RouteWrapper path="/tables/reactstrap" component={DynamicImports.tables} />
                <RouteWrapper path="/tables/react-tables" component={DynamicImports.ReactTables} />
                <RouteWrapper path="/tables/agGrid" component={DynamicImports.Aggrid} />
                <RouteWrapper path="/tables/data-tables" component={DynamicImports.DataTable} />
                <RouteWrapper path="/pages/profile" component={DynamicImports.profile} />
                <RouteWrapper path="/pages/faq" component={DynamicImports.faq} />
                <RouteWrapper
                    path="/pages/knowledge-base"
                    component={DynamicImports.knowledgeBase}
                    exact
                />
                <RouteWrapper
                    path="/pages/knowledge-base/category"
                    component={knowledgeBaseCategory}
                    exact
                />
                <RouteWrapper
                    path="/pages/knowledge-base/category/questions"
                    component={knowledgeBaseQuestion}
                />
                <RouteWrapper path="/pages/search" component={DynamicImports.search} />
                <RouteWrapper
                    path="/pages/account-settings"
                    component={DynamicImports.accountSettings}
                />
                <RouteWrapper path="/pages/invoice" component={DynamicImports.invoice} />
                <RouteWrapper
                    path="/misc/coming-soon"
                    component={DynamicImports.comingSoon}
                    fullLayout
                />
                <RouteWrapper path="/misc/error/404" component={DynamicImports.error404} fullLayout />

                <RouteWrapper
                    path="/pages/lock-screen"
                    component={DynamicImports.lockScreen}
                    fullLayout
                />
                <RouteWrapper
                    path="/pages/reset-password"
                    component={DynamicImports.resetPassword}
                    fullLayout
                />
                <RouteWrapper path="/misc/error/500" component={DynamicImports.error500} fullLayout />
                <RouteWrapper
                    path="/misc/not-authorized"
                    component={DynamicImports.authorized}
                    fullLayout
                />
                <RouteWrapper
                    path="/misc/maintenance"
                    component={DynamicImports.maintenance}
                    fullLayout
                />
                <RouteWrapper path="/app/user/list" component={DynamicImports.userList} />
                <RouteWrapper path="/app/user/edit" component={DynamicImports.userEdit} />
                <RouteWrapper path="/app/user/view" component={DynamicImports.userView} />
                <RouteWrapper path="/charts/apex" component={DynamicImports.apex} />
                <RouteWrapper path="/charts/chartjs" component={DynamicImports.chartjs} />
                <RouteWrapper path="/charts/recharts" component={DynamicImports.extreme} />
                <RouteWrapper path="/maps/leaflet" component={DynamicImports.leafletMaps} />
                <RouteWrapper path="/extensions/sweet-alert" component={DynamicImports.sweetAlert} />
                <RouteWrapper path="/extensions/toastr" component={DynamicImports.toastr} />
                <RouteWrapper path="/extensions/slider" component={DynamicImports.rcSlider} />
                <RouteWrapper path="/extensions/file-uploader" component={DynamicImports.uploader} />
                <RouteWrapper path="/extensions/wysiwyg-editor" component={DynamicImports.editor} />
                <RouteWrapper path="/extensions/drag-and-drop" component={DynamicImports.drop} />
                <RouteWrapper path="/extensions/tour" component={DynamicImports.tour} />
                <RouteWrapper path="/extensions/clipboard" component={DynamicImports.clipboard} />
                <RouteWrapper path="/extensions/context-menu" component={DynamicImports.menu} />
                <RouteWrapper path="/extensions/swiper" component={DynamicImports.swiper} />
                <RouteWrapper
                    path="/extensions/access-control"
                    component={DynamicImports.accessControl}
                />
                <RouteWrapper path="/extensions/i18n" component={DynamicImports.i18n} />
                <RouteWrapper path="/extensions/tree" component={DynamicImports.tree} />
                <RouteWrapper path="/extensions/import" component={DynamicImports.Import} />
                <RouteWrapper path="/extensions/export" component={DynamicImports.Export} />
                <RouteWrapper
                    path="/extensions/export-selected"
                    component={DynamicImports.ExportSelected}
                />
                <RouteWrapper path="/extensions/pagination" component={DynamicImports.reactPaginate} />
                {/*<RouteWrapper component={DynamicImports.error404} fullLayout />*/}

                <Redirect to={{ pathname: '/' }} />
            </Switch>
        )
    }
}

export default AuthRoutes
