import {backendConfig} from "../../configs/AppConfig";

/**
 * This file expose backend's routes
 *
 */


export const AUTH = {
    LOGIN: '/feedbacks/backoffice/login',
    REGISTER: '/feedbacks/backoffice/register',
    PASSWORD: '/feedbacks/backoffice/{backofficeUserId}/changepasswd',
};

export const TICKETS = {
    GET_ONE: '/feedbacks/{userId}/case',
    GET_ALL: '/feedbacks/cases/messages',
    MESSAGES: {
        GET_ALL: '/feedbacks/cases/messages',
        SEND: '/feedbacks/{userId}/{backOfficeUserId}/newmessage',
    }
};

export const USERS = {
    GET_ONE: '/profile/{userId}',
};

export const MEDIA = {
    CHATROOMS: {
        GET_ONE: '/media/chatrooms/{chatroomId}/medias/{mediaId}?original=true',
        CREATE: '/media/chatrooms/{chatroomId}/medias'
    },
    USERS: {
        GET_ONE: '/media/users/{userId}/medias/main?original=true'
    }
};

const BASE = '';

export const joinBaseUrlWithParams = (to, params, trueBase) => {
    let url = (trueBase ? backendConfig.baseUrlWithService : '') + to;

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
