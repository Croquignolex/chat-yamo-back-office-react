/**
 * This file expose backend's routes
 *
 */


export const AUTH = {
    LOGIN: '/auth/login',
    REGISTER: '/register',
    PROFILE: {
        INFORMATION: 'auth/profile'
    },
    RESET_PASSWORD: {
        MAIN: 'auth/reset-password',
        LINK: 'auth/send-reset-password-link',
    },
};

export const TICKETS = {
    GET_ALL: '/feedbacks/cases/messages',
    MESSAGES: {
        // GET_ALL: '/feedbacks/{userId}/messages',
        SEND: '/{backOfficeUserId}/{userId}/newmessage',

    }
};

export const USERS = {
    GET_ONE: '/service/profile/{userId}',
};

export const MEDIA = {
    CHATROOMS: {
        CREATE: '/service/media/chatrooms/{chatroomId}/medias'
    },
    USERS: {
        GET_ONE: '/service/media/chatrooms/$chatroomId/medias'
    }
};

const BASE = '';

export const joinBaseUrlWithParams = (to, params) => {
    let url = BASE + to;

    params.forEach(param => {
        url = url.replace(`{${param.param}}`, `${encodeURIComponent(param.value)}`);
    });

    return url;
};

export const joinBaseUrlWithRequestParams = (to, params) => {
    let url = BASE + to;
    let i = 0;
    params.forEach(param => {
        if(i === 0)
            url = url + '?' + param.param + '=' + param.value
        else
            url = url + '&' + param.param + '=' + param.value
    });

    return url;
};

export const joinBaseUrlWithParamsId = (to, id) => {
    return joinBaseUrlWithParams(to, [{param: 'id', value: id}]);
};
