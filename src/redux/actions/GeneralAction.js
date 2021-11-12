import {ENABLE_APP_LOADING, DISABLE_APP_LOADING, SET_REQUEST_GLOBAL_LOADER} from '../types';

export const enableAppLoading = () => (dispatch) => {
    dispatch({ type: ENABLE_APP_LOADING });
};

export const disableAppLoading = () => (dispatch) => {
    dispatch({ type: DISABLE_APP_LOADING });
};

export const setRequestGlobalAction = (shouldLoad) => (dispatch) => {
    dispatch({ type: SET_REQUEST_GLOBAL_LOADER, payload: shouldLoad });
};
