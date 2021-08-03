/**
 * Auth Actions
 * Auth Action With Google, Facebook, Twitter and Github
 */
import {
    SET_AUTH_USER,
    CLEAR_AUTH_USER,
    SET_AUTH_USER_SUCCESS,
    SET_AUTH_USER_FAILURE,
} from '../../types';
import api from '../../../utility/api';
import * as loginAction from "./loginActions";
import {AUTH} from "../../../utility/urls/backend";
import {removeAuthToken, saveAuthToken} from "../../../helpers/tokens";


/**
 * Redux Action get auth information
 */
export const setAuthUser = () => (dispatch) => {
    dispatch({ type: SET_AUTH_USER });

    return api
        .get(`${AUTH.PROFILE.INFORMATION}`, {skipError: true})
        .then((response) => {
            dispatch({ type: SET_AUTH_USER_SUCCESS, payload: response.data });
            return Promise.resolve();
        })
        .catch((error) => {
            dispatch({ type: SET_AUTH_USER_FAILURE });
            // NotificationManager.error(error.message);
            return Promise.reject();
        });
};

export const loginWithJWT = user => dispatch => {
    // dispatch({ type: LOGIN_USER });
    const data = {
        login: user.email,
        password: user.password
    };

    return api.post(AUTH.LOGIN, data)
        .then(response => {
            const data = {
                accessToken: response.data.token,
                tokenType: response.data.tokenType,
                expiresIn: response.data.expiresIn,
                refreshToken: response.data.refreshToken,
            };

            // Persist data into localstorage
            saveAuthToken(data.accessToken, data.tokenType || 'Bearer', data.expiresIn || 2000, data.refreshToken || 'Fake refresh Token');

            // Fetch user data
            dispatch(setAuthUser());

            // Persist data into store
            // dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
            // history.push('/');
            // NotificationManager.success('User Login Successfully!');
            return Promise.resolve();
        })
        .catch(err => {
            return Promise.reject();
        });
};

export const logoutWithJWT = () => dispatch => {
    removeAuthToken();
    dispatch({ type: CLEAR_AUTH_USER, payload: null });
};

export default loginAction;
