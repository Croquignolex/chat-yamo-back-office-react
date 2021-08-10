// Route-based code splitting
import {lazy} from "react";

export const tickets = lazy(() =>
    import("./../views/tickets")
);
export const Welcome = lazy(() =>
    import("./../views/Welcome")
);

export const Alerts = lazy(() => import("./../components/reactstrap/alerts/Alerts"))
export const Buttons = lazy(() => import("./../components/reactstrap/buttons/Buttons"))
export const Breadcrumbs = lazy(() =>
    import("./../components/reactstrap/breadcrumbs/Breadcrumbs")
)
export const Carousel = lazy(() => import("./../components/reactstrap/carousel/Carousel"))
export const Collapse = lazy(() => import("./../components/reactstrap/collapse/Collapse"))
export const Dropdowns = lazy(() =>
    import("./../components/reactstrap/dropdowns/Dropdown")
)
export const ListGroup = lazy(() =>
    import("./../components/reactstrap/listGroup/ListGroup")
)
export const Modals = lazy(() => import("./../components/reactstrap/modal/Modal"))
export const Pagination = lazy(() =>
    import("./../components/reactstrap/pagination/Pagination")
)
export const NavComponent = lazy(() =>
    import("./../components/reactstrap/navComponent/NavComponent")
)
export const Navbar = lazy(() => import("./../components/reactstrap/navbar/Navbar"))
export const Tabs = lazy(() => import("./../components/reactstrap/tabs/Tabs"))
export const TabPills = lazy(() => import("./../components/reactstrap/tabPills/TabPills"))
export const Tooltips = lazy(() => import("./../components/reactstrap/tooltips/Tooltips"))
export const Popovers = lazy(() => import("./../components/reactstrap/popovers/Popovers"))
export const Badge = lazy(() => import("./../components/reactstrap/badge/Badge"))
export const BadgePill = lazy(() =>
    import("./../components/reactstrap/badgePills/BadgePill")
)
export const Progress = lazy(() => import("./../components/reactstrap/progress/Progress"))
export const Media = lazy(() => import("./../components/reactstrap/media/MediaObject"))
export const Spinners = lazy(() => import("./../components/reactstrap/spinners/Spinners"))
export const Toasts = lazy(() => import("./../components/reactstrap/toasts/Toasts"))
export const avatar = lazy(() => import("./../components/@vuexy/avatar/Avatar"))
export const AutoComplete = lazy(() =>
    import("./../components/@vuexy/autoComplete/AutoComplete")
)
export const chips = lazy(() => import("./../components/@vuexy/chips/Chips"))
export const divider = lazy(() => import("./../components/@vuexy/divider/Divider"))
export const vuexyWizard = lazy(() => import("./../components/@vuexy/wizard/Wizard"))

export const Login = lazy(() => import("./../views/pages/authentication/login/Login"))

