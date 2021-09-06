import {
    SET_AUTH_USER,
    CLEAR_AUTH_USER,
    SET_AUTH_USER_SUCCESS,
    SET_AUTH_USER_FAILURE,
} from '../../types';
import api from '../../../utility/api';
import * as loginAction from "./loginActions";
import {AUTH} from "../../../utility/urls/backend";
import {APP_SERVICE_JWT, BACK_OFFICE_USER_ID} from "../../../configs/AppConfig";
import {removeAuthToken, saveAuthToken, getAuthToken} from "../../../helpers/tokens";

/**
 * Redux Action get auth information
 */
export const setAuthUser = () => (dispatch) => {
    dispatch({ type: SET_AUTH_USER });

    // Fake the api request since the profile route does not exists
    return new Promise((resolve, reject) => {
        const tokens = getAuthToken();
        if (tokens.accessToken) {
            dispatch({ type: SET_AUTH_USER_SUCCESS, payload: {id: BACK_OFFICE_USER_ID, name: "Back office"} });
            resolve();
        } else {
            dispatch({ type: SET_AUTH_USER_FAILURE });
            return reject();
        }
    });
};

export const loginWithJWT = user => dispatch => {
    const data = {
        login: user.email,
        password: user.password
    };

    return api.post(AUTH.LOGIN, data)
        .then(response => {
            const data = {
                accessToken: APP_SERVICE_JWT, // the global token used for accessing all endpoint!!!
                userAccessToken: response.data.userToken, // the user specific token, this should be saved also!!!
                tokenType: response.data.tokenType,
                expiresIn: response.data.expiresIn,
                refreshToken: response.data.refreshToken,
            };

            // Persist data into localstorage
            saveAuthToken(
                data.accessToken,
                data.userAccessToken,
                data.tokenType || 'Bearer',
                data.expiresIn || 2000,
                data.refreshToken || 'Fake refresh Token'
            );

            // Fetch user data
            dispatch(setAuthUser());

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
