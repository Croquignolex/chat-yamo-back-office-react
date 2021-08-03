import {
    ENABLE_APP_LOADING,
    DISABLE_APP_LOADING,
} from '../types';


export const enableAppLoading = () => (dispatch) => {
    dispatch({ type: ENABLE_APP_LOADING });
};

export const disableAppLoading = () => (dispatch) => {
    dispatch({ type: DISABLE_APP_LOADING });
};
