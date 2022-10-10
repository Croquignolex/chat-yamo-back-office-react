import {backendConfig} from "../../configs/AppConfig";

export const AUTH = {
    LOGIN: '/feedbacks/backoffice/login',
    REGISTER: '/feedbacks/backoffice/register',
    PASSWORD: '/feedbacks/backoffice/{backOfficeUserId}/changepasswd',
};

export const BACKOFFICE_USERS = {
    ADD_ONE: '/feedbacks/backoffice/{backofficeUserId}/register',
    GET_ALL: '/feedbacks/backoffice/{backofficeUserId}/allusers',
    DELETE_ONE: '/feedbacks/backoffice/{backofficeUserId}/{userId}/delete',
};

export const FEEDBACKS = {
    REPORT: '/feedbacks/submit', 
    GET_ONE: '/feedbacks/{userId}/case',
    GET_ALL: '/feedbacks/cases/messages/from',
    MESSAGES: {
        GET_ALL: '/feedbacks/cases/messages',
        SEND: '/feedbacks/{userId}/{backOfficeUserId}/newmessage',
    }
};

export const VALIDATIONS = {
    VALIDATE_ONE: '/media/users/{userId}/medias/{mediaId}/paths/{mediaPath}/verify/{verified}',
    DELETE_ONE: '/media/users/{userId}/medias/{mediaId}',
    GET_ALL: '/media/users/toBeVerifiedMedia',

    // Old
    OLD_GET_ALL: '/media/users/allToBeNotedMedias',
};

export const NOTATIONS = {
    NOTATE_ONE: '/media/users/{userId}/medias/{mediaId}/score/{score}',
    GET_ALL: '/media/users/toBeNotedMedia',
};

export const USERS = {
    GET_ONE: '/profile/{userId}',
    SEARCH: '/profile/backoffice/checkuser',

    BLOCK: '/authentication/user/{userId}/block',
    METADATA: '/authentication/backoffice/user/{userId}/metadata',
    BLOCK_STATUS: '/authentication/user/{userId}/userblockedstate',
    CHECK_TOWN_EVENT: '/authentication/user/{userId}/checktownevent', 
    SOUSCRIPTIONS: '/authentication/user/{userId}/subscriptionhistory', 
};

export const MEDIA = {
    CHATROOMS: {
        // GET_ONE: '/media/chatrooms/{chatroomId}/medias/{mediaId}?original=true',
        GET_ONE: '/media/chatrooms/{chatroomId}/medias/{mediaId}/info',
        CREATE: '/media/chatrooms/{chatroomId}/medias'
    },
    USERS: {
        // GET_ONE: '/media/users/{userId}/medias/main?original=true'
        GET_ONE: '/media/users/{userId}/medias/main/info'
    }
};

const BASE = '';

export const joinBaseUrlWithParams = (to, params = [], trueBase = false) => {
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
