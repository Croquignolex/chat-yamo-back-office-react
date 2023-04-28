import api from '../../../utility/api';
import {AUTH} from "../../../utility/urls/backend";
import {removeAuthToken, saveAuthToken, getAuthToken} from "../../../helpers/tokens";
import {SET_AUTH_USER, CLEAR_AUTH_USER, SET_AUTH_USER_SUCCESS, SET_AUTH_USER_FAILURE} from '../../types';

export const setAuthUser = () => (dispatch) => {
    dispatch({ type: SET_AUTH_USER });

    // Fake the api request since the profile route does not exists
    return new Promise((resolve, reject) => {
        const data = getAuthToken();

        if (data.accessToken && data.entityId) {
            const payload = {
                entityId: data.entityId,
                accessToken: data.accessToken,
                roles: data.userDetails?.roles,
                lastName: data.userDetails?.lastName,
                username: data.userDetails?.username,
                firstName: data.userDetails?.firstName,
                // allRoles: data.allRoles
            };
            dispatch({ type: SET_AUTH_USER_SUCCESS, payload });
            return resolve();
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
                // accessToken: APP_SERVICE_JWT,
                status:  response.data.status,
                entityId:  response.data.entityId,
                accessToken:  response.data.userToken,
                userDetails:  response.data.userDetails,
                // userAccessToken: response.data.userToken,
                // tokenType: response.data.tokenType,
                // expiresIn: response.data.expiresIn,
                // refreshToken: response.data.refreshToken,
            };

            // Persist data into localstorage
            saveAuthToken(
                data.accessToken || 'Fake access Token',
                data.tokenType || 'Bearer',
                data.expiresIn || 2000,
                data.refreshToken || 'Fake refresh Token',
                data.entityId || 0,
                data.userDetails || {},
                // roles || []
            );

            /*api.get(AUTH.ROLES)
                .then(response => {
                    // Build Roles
                    const roles = response.data?.roles?.map((role) => {
                        return {
                            label: role,
                            value: role,
                            color: "#" + Math.floor(Math.random()*16777215).toString(16),
                        }
                    });

                    return Promise.resolve();
                })
                .catch(() => {
                    return Promise.reject()
                });*/

            // Fetch user data
            dispatch(setAuthUser());

            return Promise.resolve();
        })
        .catch(() => {
            return Promise.reject()
        });
};

export const logoutWithJWT = () => dispatch => {
    removeAuthToken();
    dispatch({ type: CLEAR_AUTH_USER });
};
