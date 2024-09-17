import {backendConfig} from "../../configs/AppConfig";

export const AUTH = {
    LOGIN: '/feedbacks/backoffice/login',
    ROLES: '/feedbacks/backoffice/allroles',
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
    DOUBLE_CHECK: '/feedbacks/backoffice/profilesToDoubleCheck',
    RE_VERIFIED_PROFILE: '/feedbacks/backoffice/profiles/{userId}/localDates/{date}/categories/{category}',
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
    GET_IMAGES_TO_NOTATE_COUNT: '/media/alltonote',
    GET_PROFILE_IMAGES: '/media/users/toBeNotedProfilesByWeek',
    UPDATE_NOTED_IMAGES: '/media/users/{backOfficeUserId}/noted',
    NOTATE_ONE: '/media/users/{userId}/medias/{mediaId}/score/{score}',
    GET_NOTED_IMAGES_COUNT: '/media/users/{backOfficeUserId}/allnoted',
};

export const USERS = {
    GET_ONE: '/profile/{userId}',
    GET_ONE_V2: '/profile/v2/{userId}',
    SEARCH: '/profile/backoffice/checkuser',
    LIFE_STYLE: '/profile/backoffice/{userId}/metadata',
    CUSTOMER_JOURNEY: '/profile/backoffice/{userId}/customerjourneyv2',

    BLOCK: '/authentication/user/{userId}/block',
    STATUS: '/authentication/backoffice/user/{userId}/status',
    METADATA: '/authentication/backoffice/user/{userId}/metadata',
    CHECK_TOWN_EVENT: '/authentication/user/{userId}/checktownevent',
    SOUSCRIPTIONS: '/authentication/user/{userId}/subscriptionhistory', 
    AUTOMATIC_PAYMENTS: '/authentication/user/{userId}/subscriptions',
    STATUS_HISTORY: '/authentication/backoffice/user/{userId}/statusreason',
    ACTIVATE_SUBSCRIPTION: '/authentication/backoffice/user/{userId}/activatesubscription',

    EXPORT_SUBSCRIPTION: '/authentication/users/subscriptions',
    EXPORT_DELETED_USERS: '/authentication/users/deleted',
    EXPORT_NEW_USERS: '/authentication/users/new',
    EXPORT_BLACKLIST: '/authentication/backoffice/user/blacklistExportUser',
    EXPORT_SUBSCRIPTION_EMAILS: '/authentication/users/subscriptionEmails',
    EXPORT_DELETED_USER_EMAILS: '/authentication/users/deletedUserEmails',
    EXPORT_NEW_USER_EMAILS: '/authentication/users/newUserEmails',
};

export const MEDIA = {
    CHATROOMS: {
        CREATE: '/media/chatrooms/{chatroomId}/medias',
        CREATE_VIDEO: '/media/chatrooms/{chatroomId}/audios',
        GET_ONE: '/media/chatrooms/{chatroomId}/medias/{mediaId}/info'
    },
    USERS: {
        GET_ONE: '/media/users/{userId}/medias/main/info',
        SCORE: '/media/users/{userId}/mediasscore',
        IMAGES: '/media/users/{userId}/medias',
        IDENTITY: '/media/users/{userId}/identityVerification',
        STATE: '/media/backoffice/users/{userId}/suspiciousstate'
    }
};

export const NOTIFICATION = {
    CONTEXT: '/notification/{userId}/notificationContext',
};

export const CHATROOM = {
    FREE_CHAT: '/chatrooms/{userId}/messages/freeChatroomState',
    ACTIVE_CHATS: '/chatrooms/backoffice/users/{userId}/activeChatRooms',
};

export const PROPOSAL = {
    MATCHES_COUNT: '/proposal/backoffice/users/{userId}/adMatchesCount',
    SEARCH_FILTER: '/proposal/backoffice/profile/{userId}/searchFilter',
    PENDING_REL_COUNT: '/proposal/backoffice/profile/{userId}/pendingReceivedRelationshipsCount',
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
