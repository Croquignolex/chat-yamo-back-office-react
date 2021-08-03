// Route-based code splitting
import {lazy} from "react";

export const tickets = lazy(() =>
    import("./../views/tickets")
);


export const analyticsDashboard = lazy(() =>
    import("./../views/dashboard/analytics/AnalyticsDashboard")
)
export const ecommerceDashboard = lazy(() =>
    import("./../views/dashboard/ecommerce/EcommerceDashboard")
)
export const email = lazy(() => import("./../views/apps/email/Email"))
export const chat = lazy(() => import("./../views/apps/chat/Chat"))
export const todo = lazy(() => import("./../views/apps/todo/Todo"))
export const calendar = lazy(() => import("./../views/apps/calendar/Calendar"))
export const shop = lazy(() => import("./../views/apps/ecommerce/shop/Shop"))
export const wishlist = lazy(() => import("./../views/apps/ecommerce/wishlist/Wishlist"))
export const checkout = lazy(() => import("./../views/apps/ecommerce/cart/Cart"))
export const productDetail = lazy(() => import("./../views/apps/ecommerce/detail/Detail"))
export const grid = lazy(() => import("./../views/ui-elements/grid/Grid"))
export const typography = lazy(() =>
    import("./../views/ui-elements/typography/Typography")
)
export const textutilities = lazy(() =>
    import("./../views/ui-elements/text-utilities/TextUtilities")
)
export const syntaxhighlighter = lazy(() =>
    import("./../views/ui-elements/syntax-highlighter/SyntaxHighlighter")
)
export const colors = lazy(() => import("./../views/ui-elements/colors/Colors"))
export const reactfeather = lazy(() =>
    import("./../views/ui-elements/icons/FeatherIcons")
)
export const basicCards = lazy(() => import("./../views/ui-elements/cards/basic/Cards"))
export const statisticsCards = lazy(() =>
    import("./../views/ui-elements/cards/statistics/StatisticsCards")
)
export const analyticsCards = lazy(() =>
    import("./../views/ui-elements/cards/analytics/Analytics")
)
export const actionCards = lazy(() =>
    import("./../views/ui-elements/cards/actions/CardActions")
)
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
export const listView = lazy(() => import("./../views/ui-elements/data-list/ListView"))
export const thumbView = lazy(() => import("./../views/ui-elements/data-list/ThumbView"))
export const select = lazy(() => import("./../views/forms/form-elements/select/Select"))
export const switchComponent = lazy(() =>
    import("./../views/forms/form-elements/switch/Switch")
)
export const checkbox = lazy(() =>
    import("./../views/forms/form-elements/checkboxes/Checkboxes")
)
export const radio = lazy(() => import("./../views/forms/form-elements/radio/Radio"))
export const input = lazy(() => import("./../views/forms/form-elements/input/Input"))
export const group = lazy(() =>
    import("./../views/forms/form-elements/input-groups/InputGoups")
)
export const numberInput = lazy(() =>
    import("./../views/forms/form-elements/number-input/NumberInput")
)
export const textarea = lazy(() =>
    import("./../views/forms/form-elements/textarea/Textarea")
)
export const pickers = lazy(() =>
    import("./../views/forms/form-elements/datepicker/Pickers")
)
export const inputMask = lazy(() =>
    import("./../views/forms/form-elements/input-mask/InputMask")
)
export const layout = lazy(() => import("./../views/forms/form-layouts/FormLayouts"))
export const formik = lazy(() => import("./../views/forms/formik/Formik"))
export const tables = lazy(() => import("./../views/tables/reactstrap/Tables"))
export const ReactTables = lazy(() =>
    import("./../views/tables/react-tables/ReactTables")
)
export const Aggrid = lazy(() => import("./../views/tables/aggrid/Aggrid"))
export const DataTable = lazy(() => import("./../views/tables/data-tables/DataTables"))
export const profile = lazy(() => import("./../views/pages/profile/Profile"))
export const faq = lazy(() => import("./../views/pages/faq/FAQ"))
export const knowledgeBase = lazy(() =>
    import("./../views/pages/knowledge-base/KnowledgeBase")
)
export const search = lazy(() => import("./../views/pages/search/Search"))
export const accountSettings = lazy(() =>
    import("./../views/pages/account-settings/AccountSettings")
)
export const invoice = lazy(() => import("./../views/pages/invoice/Invoice"))
export const comingSoon = lazy(() => import("./../views/pages/misc/ComingSoon"))
export const error404 = lazy(() => import("./../views/pages/misc/error/404"))
export const error500 = lazy(() => import("./../views/pages/misc/error/500"))
export const authorized = lazy(() => import("./../views/pages/misc/NotAuthorized"))
export const maintenance = lazy(() => import("./../views/pages/misc/Maintenance"))
export const apex = lazy(() => import("./../views/charts/apex/ApexCharts"))
export const chartjs = lazy(() => import("./../views/charts/chart-js/ChartJS"))
export const extreme = lazy(() => import("./../views/charts/recharts/Recharts"))
export const leafletMaps = lazy(() => import("./../views/maps/Maps"))
export const toastr = lazy(() => import("./../extensions/toastify/Toastify"))
export const sweetAlert = lazy(() => import("./../extensions/sweet-alert/SweetAlert"))
export const rcSlider = lazy(() => import("./../extensions/rc-slider/Slider"))
export const uploader = lazy(() => import("./../extensions/dropzone/Dropzone"))
export const editor = lazy(() => import("./../extensions/editor/Editor"))
export const drop = lazy(() => import("./../extensions/drag-and-drop/DragAndDrop"))
export const tour = lazy(() => import("./../extensions/tour/Tour"))
export const clipboard = lazy(() =>
    import("./../extensions/copy-to-clipboard/CopyToClipboard")
)
export const menu = lazy(() => import("./../extensions/contexify/Contexify"))
export const swiper = lazy(() => import("./../extensions/swiper/Swiper"))
export const i18n = lazy(() => import("./../extensions/i18n/I18n"))
export const reactPaginate = lazy(() => import("./../extensions/pagination/Pagination"))
export const tree = lazy(() => import("./../extensions/treeview/TreeView"))
export const Import = lazy(() => import("./../extensions/import-export/Import"))
export const Export = lazy(() => import("./../extensions/import-export/Export"))
export const ExportSelected = lazy(() =>
    import("./../extensions/import-export/ExportSelected")
)
export const userList = lazy(() => import("./../views/apps/user/list/List"))
export const userEdit = lazy(() => import("./../views/apps/user/edit/Edit"))
export const userView = lazy(() => import("./../views/apps/user/view/View"))
export const Login = lazy(() => import("./../views/pages/authentication/login/Login"))
export const forgotPassword = lazy(() =>
    import("./../views/pages/authentication/ForgotPassword")
)
export const lockScreen = lazy(() => import("./../views/pages/authentication/LockScreen"))
export const resetPassword = lazy(() =>
    import("./../views/pages/authentication/ResetPassword")
)
export const register = lazy(() =>
    import("./../views/pages/authentication/register/Register")
)
export const accessControl = lazy(() =>
    import("./../extensions/access-control/AccessControl")
)
