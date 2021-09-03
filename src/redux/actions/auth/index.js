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
import {getUniqueId} from "../../../helpers/helpers";
import {removeAuthToken, saveAuthToken, getAuthToken} from "../../../helpers/tokens";
import {APP_SERVICE_JWT} from "../../../configs/AppConfig";


/**
 * Redux Action get auth information
 */
export const setAuthUser = () => (dispatch) => {
    dispatch({ type: SET_AUTH_USER });

    // Fake the api request since the profile route does not exists
    return new Promise((resolve, reject) => {
        const tokens = getAuthToken();
        if (tokens.accessToken) {
            dispatch({ type: SET_AUTH_USER_SUCCESS, payload: {id: getUniqueId(), name: "Back office"} });
            resolve();
        } else {
            dispatch({ type: SET_AUTH_USER_FAILURE });
            // NotificationManager.error(error.message);
            return reject();
        }
    });
    /*return api
        .get(`${AUTH.PROFILE.INFORMATION}`, {skipError: true})
        .then((response) => {
            dispatch({ type: SET_AUTH_USER_SUCCESS, payload: response.data });
            return Promise.resolve();
        })
        .catch((error) => {
            dispatch({ type: SET_AUTH_USER_FAILURE });
            // NotificationManager.error(error.message);
            return Promise.reject();
        });*/
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
                accessToken: APP_SERVICE_JWT, // the global token used for accessing all endpoint!!!
                //accessToken: response.data.token, // the global token used for accessing all endpoint!!!
                userAccessToken: response.data.userToken, // the user specific token, this should be saved also!!!
                tokenType: response.data.tokenType,
                expiresIn: response.data.expiresIn,
                refreshToken: response.data.refreshToken,
            };

            // Persist data into localstorage
            saveAuthToken(data.accessToken, data.userAccessToken, data.tokenType || 'Bearer', data.expiresIn || 2000, data.refreshToken || 'Fake refresh Token');

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
