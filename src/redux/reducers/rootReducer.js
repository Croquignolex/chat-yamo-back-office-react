import { combineReducers } from "redux";

import authUser from "./auth/";
import appLoading from './AppLoadingReducer';
import requestGlobalLoader from './RequestGlobalReducer';

const rootReducer = combineReducers({
  authUser,
  appLoading,
  requestGlobalLoader,
});

export default rootReducer;
