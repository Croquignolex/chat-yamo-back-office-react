import {makeRequest} from "../../helpers/helpers";
import {BACK_OFFICE_USER_ID} from "../../configs/AppConfig";
import {USERS, MEDIA, TICKETS, AUTH, joinBaseUrlWithParams} from "../../utility/urls/backend";

export const getCaseMessages = async (userId) => {
    return makeRequest('get', joinBaseUrlWithParams(TICKETS.GET_ONE, [{param: 'userId', value: userId}]));
};

export const getUserProfile = async (userId) => {
    return makeRequest('get', joinBaseUrlWithParams(USERS.GET_ONE, [{param: 'userId', value: userId}]));
};

export const createMedia = async (userId, backOfficeUserId, data) => {
    const url = joinBaseUrlWithParams(MEDIA.CHATROOMS.CREATE, [{param: 'chatroomId', value: `${userId}:${backOfficeUserId}`}]);
    return makeRequest('put', url, data, {shouldParseFormData: true, fileData: ['picture']});
};

export const sendMessage = async (userId, data) => {
    const url = joinBaseUrlWithParams(
        TICKETS.MESSAGES.SEND,
        [
            {param: 'backOfficeUserId', value: BACK_OFFICE_USER_ID},
            {param: 'userId', value: userId},
        ]
    );
    return makeRequest('post', url, data);
};

export const getUserProfileImage = async (userId) => {
    const url = joinBaseUrlWithParams(MEDIA.USERS.GET_ONE, [{param: 'userId', value: userId}]);
    return makeRequest('get', url, null, {responseType: 'arraybuffer'});
};

export const getMessageImage = async (mediaId, caseId) => {
    const url = joinBaseUrlWithParams(MEDIA.CHATROOMS.GET_ONE, [{param: 'mediaId', value: mediaId}, {param: 'chatroomId', value: caseId}]);
    return makeRequest('get', url, null, {responseType: 'arraybuffer'});
};

export const changePassword = async (oldPassword, newPassword, backOfficeUserId) => {
    const url = joinBaseUrlWithParams(
        AUTH.PASSWORD,
        [{param: 'backOfficeUserId', value: backOfficeUserId}]
    );
    return makeRequest('post', url, {oldPassword, newPassword});
};

