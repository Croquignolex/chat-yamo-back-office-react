import { combineReducers } from "redux"
import calenderReducer from "./calendar/"
import emailReducer from "./email/"
import chatReducer from "./chat/"
import todoReducer from "./todo/"
import customizer from "./customizer/"
import auth from "./auth/indexOld"
import authUser from "./auth/";
import navbar from "./navbar/Index"
import dataList from "./data-list/"
import appLoading from './AppLoadingReducer';
import requestGlobalLoader from './RequestGlobalReducer';
import tickets from './TicketsReducer';

const rootReducer = combineReducers({
  calendar: calenderReducer,
  emailApp: emailReducer,
  todoApp: todoReducer,
  chatApp: chatReducer,
  customizer: customizer,
  auth: auth,
  authUser,
  navbar: navbar,
  dataList: dataList,
  appLoading,
  requestGlobalLoader,
  tickets,
});

export default rootReducer;
