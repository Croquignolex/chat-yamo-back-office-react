import {makeRequest} from "../../helpers/helpers";
import {REACT_APP_CHAT_BACKOFFICE_USER_ID} from "../../configs/AppConfig";
import {
    USERS,
    MEDIA,
    TICKETS,
    AUTH,
    joinBaseUrlWithParams,
    joinBaseUrlWithRequestParams
} from "../../utility/urls/backend";

export const getCases = async (date) => {
    return makeRequest('get', joinBaseUrlWithRequestParams(TICKETS.GET_ALL, [{param: 'date', value: date}]));
};

export const getCaseMessages = async (userId) => {
    return makeRequest('get', joinBaseUrlWithParams(TICKETS.GET_ONE, [{param: 'userId', value: userId}]));
};

export const getUserProfile = async (userId) => {
    return makeRequest('get', joinBaseUrlWithParams(USERS.GET_ONE, [{param: 'userId', value: userId}]));
};

export const createMedia = async (userId, file) => {
    const url = joinBaseUrlWithParams(
        MEDIA.CHATROOMS.CREATE,
        [
            {param: 'chatroomId', value: `${userId}:${REACT_APP_CHAT_BACKOFFICE_USER_ID}`}
        ]
    );
    return makeRequest('put', url, {picture: file}, {shouldParseFormData: true, fileData: ['picture']});
};

export const sendMessage = async (userId, feedbackText, mediaId = null) => {
    const url = joinBaseUrlWithParams(
        TICKETS.MESSAGES.SEND,
        [
            {param: 'backOfficeUserId', value: REACT_APP_CHAT_BACKOFFICE_USER_ID},
            {param: 'userId', value: userId},
        ]
    );
    return makeRequest('post', url, {feedbackText, mediaId});
};

export const getUserProfileImage = async (userId) => {
    const url = joinBaseUrlWithParams(MEDIA.USERS.GET_ONE, [{param: 'userId', value: userId}]);
    return makeRequest('get', url, null, {responseType: 'arraybuffer'});
};

export const getMessageImage = async (userId, mediaId) => {
    const url = joinBaseUrlWithParams(
        MEDIA.CHATROOMS.GET_ONE,
        [
            {param: 'mediaId', value: mediaId},
            {param: 'chatroomId', value: `${userId}:${REACT_APP_CHAT_BACKOFFICE_USER_ID}`}
        ]
    );
    return makeRequest('get', url, null, {responseType: 'arraybuffer'});
};

export const changePassword = async (oldPassword, newPassword, backOfficeUserId) => {
    const url = joinBaseUrlWithParams(
        AUTH.PASSWORD,
        [{param: 'backOfficeUserId', value: backOfficeUserId}]
    );
    return makeRequest('post', url, {oldPassword, newPassword});
};

