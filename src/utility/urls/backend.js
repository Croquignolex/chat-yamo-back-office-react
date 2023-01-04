import {backendConfig} from "../../configs/AppConfig";

export const AUTH = {
    LOGIN: '/feedbacks/backoffice/login',
    REGISTER: '/feedbacks/backoffice/register',
    PASSWORD: '/feedbacks/backoffice/{backOfficeUserId}/changepasswd',
};

export const BACKOFFICE_USERS = {
    ADD_ONE: '/feedbacks/backoffice/{backOfficeUserId}/register',
    GET_ALL: '/feedbacks/backoffice/{backOfficeUserId}/allusers',
    DELETE_ONE: '/feedbacks/backoffice/{backOfficeUserId}/{userId}/delete',
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
    GET_ALL: '/media/users/toBeVerifiedMedia',
    DELETE_ONE: '/media/users/{userId}/medias/{mediaId}',
    VALIDATE_ONE: '/media/users/{userId}/medias/{mediaId}/paths/{mediaPath}/verify/{verified}',

    // Old
    OLD_GET_ALL: '/media/users/allToBeNotedMedias',
};

export const NOTATIONS = {
    GET_IMAGES: '/media/users/toBeNotedMedia',
    PROFILE: '/media/users/{userId}/medias/note',
    NOTATE_ONE: '/media/users/{userId}/medias/{mediaId}/score/{score}',
    GET_NOTED_IMAGES_COUNT: '/media/users/{backOfficeUserId}/allnoted',
    GET_IMAGES_TO_NOTATE_COUNT: '/media/alltonote',
    UPDATE_NOTED_IMAGES: '/media/users/{backOfficeUserId}/noted',
};

export const USERS = {
    GET_ONE: '/profile/{userId}',
    SEARCH: '/profile/backoffice/checkuser',

    BLOCK: '/authentication/user/{userId}/block',
    METADATA: '/authentication/backoffice/user/{userId}/metadata',
    BLOCK_STATUS: '/authentication/user/{userId}/userblockedstate',
    CHECK_TOWN_EVENT: '/authentication/user/{userId}/checktownevent', 
    SOUSCRIPTIONS: '/authentication/user/{userId}/subscriptionhistory', 
    STATUS_HISTORY: '/authentication/backoffice/user/{userId}/statusreason',
};

export const MEDIA = {
    CHATROOMS: {
        CREATE: '/media/chatrooms/{chatroomId}/medias',
        GET_ONE: '/media/chatrooms/{chatroomId}/medias/{mediaId}/info'

        // GET_ONE: '/media/chatrooms/{chatroomId}/medias/{mediaId}?original=true',
    },
    USERS: {
        GET_ONE: '/media/users/{userId}/medias/main/info',
        IMAGES: '/media/users/{userId}/medias'

        // GET_ONE: '/media/users/{userId}/medias/main?original=true'
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
