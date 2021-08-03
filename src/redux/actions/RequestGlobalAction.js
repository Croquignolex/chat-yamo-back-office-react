/**
 * Redux Action To Signout User From  Firebase
 */
import {SET_REQUEST_GLOBAL_LOADER} from "../types";

export const setRequestGlobalAction = (shouldLoad) => (dispatch) => {
    dispatch({ type: SET_REQUEST_GLOBAL_LOADER, payload: shouldLoad });
};
