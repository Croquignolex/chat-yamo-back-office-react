import {makeRequest} from "../../helpers/helpers";
import {REACT_APP_CHAT_BACKOFFICE_USER_ID} from "../../configs/AppConfig";
import {USERS, MEDIA, FEEDBACKS, AUTH, joinBaseUrlWithParams, joinBaseUrlWithRequestParams, VALIDATIONS} from "../../utility/urls/backend";

export const getCases = async (date) => {
    return makeRequest('get', joinBaseUrlWithRequestParams(FEEDBACKS.GET_ALL, [{param: 'date', value: date}]));
};

export const getCaseMessages = async (userId) => {
    return makeRequest('get', joinBaseUrlWithParams(FEEDBACKS.GET_ONE, [{param: 'userId', value: userId}]));
};

export const getUserImages = async (date) => {
    const config = {headers: {
            "CHAT-ET-YAMO-MEDIA-SERVICE-ALL-USER-IMAGES": "true",
            "CHAT-ET-YAMO-MEDIA-SERVICE-PRE-SIGNED-URL": "true"
        }
    };
    return makeRequest('get', joinBaseUrlWithRequestParams(VALIDATIONS.GET_ALL, [{param: 'date', value: date}]), null, config);
};

export const deleteUserImage = async (userId, mediaId) => {
    const config = {headers: {
            "CHAT-ET-YAMO-MEDIA-SERVICE-ALL-USER-IMAGES": "true",
            "CHAT-ET-YAMO-MEDIA-SERVICE-PRE-SIGNED-URL": "true"
        }
    };
    const url = joinBaseUrlWithParams(
        VALIDATIONS.DELETE_ONE,
        [
            {param: 'userId', value: userId},
            {param: 'mediaId', value: mediaId},
        ]
    );
    return makeRequest('delete', url, null, config);
};

export const verifyUserImage = async (userId, mediaId, mediaPath, verified) => {
    const config = {headers: {
            "CHAT-ET-YAMO-MEDIA-SERVICE-ALL-USER-IMAGES": "true",
            "CHAT-ET-YAMO-MEDIA-SERVICE-PRE-SIGNED-URL": "true"
        }
    };
    const url = joinBaseUrlWithParams(
        VALIDATIONS.VALIDATE_ONE,
        [
            {param: 'userId', value: userId},
            {param: 'mediaId', value: mediaId},
            {param: 'mediaPath', value: mediaPath},
            {param: 'verified', value: verified},
        ]
    );
    return makeRequest('put', url, null, config);
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
        FEEDBACKS.MESSAGES.SEND,
        [
            {param: 'backOfficeUserId', value: REACT_APP_CHAT_BACKOFFICE_USER_ID},
            {param: 'userId', value: userId},
        ]
    );
    return makeRequest('post', url, {feedbackText, mediaId});
};

export const getUserProfileImage = async (userId) => {
    const config = {headers: {
            "CHAT-ET-YAMO-MEDIA-SERVICE-ALL-USER-IMAGES": "true"
        }
    };
    const url = joinBaseUrlWithParams(MEDIA.USERS.GET_ONE, [{param: 'userId', value: userId}]);
    return makeRequest('get', url, null, config);
};

export const getMessageImage = async (userId, mediaId) => {
    const config = {headers: {
            "CHAT-ET-YAMO-MEDIA-SERVICE-ALL-USER-IMAGES": "true"
        }
    };
    const url = joinBaseUrlWithParams(
        MEDIA.CHATROOMS.GET_ONE,
        [
            {param: 'mediaId', value: mediaId},
            {param: 'chatroomId', value: `${userId}:${REACT_APP_CHAT_BACKOFFICE_USER_ID}`}
        ]
    );
    return makeRequest('get', url, null, config);
};

export const changePassword = async (oldPassword, newPassword, backOfficeUserId) => {
    const url = joinBaseUrlWithParams(
        AUTH.PASSWORD,
        [{param: 'backOfficeUserId', value: backOfficeUserId}]
    );
    return makeRequest('post', url, {oldPassword, newPassword});
};

export const searchUser = async (attribute) => {
    const url = joinBaseUrlWithParams(USERS.SEARCH);
    return makeRequest('post', url, {attribute});
};


