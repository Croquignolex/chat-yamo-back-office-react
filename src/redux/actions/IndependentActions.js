import {makeRequest} from "../../helpers/helpers";
import {REACT_APP_CHAT_BACKOFFICE_USER_ID} from "../../configs/AppConfig";
import {
    AUTH,
    USERS,
    MEDIA,
    FEEDBACKS,
    VALIDATIONS,
    BACKOFFICE_USERS,
    joinBaseUrlWithParams,
    joinBaseUrlWithRequestParams,
} from "../../utility/urls/backend";

// ===================================== START GET

export const getCases = async (date) => {
    const url = joinBaseUrlWithRequestParams(FEEDBACKS.GET_ALL, [{param: 'date', value: date}])
    return makeRequest('get', url);
};

export const getUserMetaData = async (userId) => {
    const url = joinBaseUrlWithParams(USERS.METADATA, [{param: 'userId', value: userId}]);
    return makeRequest('get', url);
};

export const getCaseMessages = async (userId) => {
    const url = joinBaseUrlWithParams(FEEDBACKS.GET_ONE, [{param: 'userId', value: userId}]);
    return makeRequest('get', url);
};

export const getUserProfile = async (userId) => {
    const url = joinBaseUrlWithParams(USERS.GET_ONE, [{param: 'userId', value: userId}]);
    return makeRequest('get', url);
};

export const getUserSouscriptions = async (userId) => {
    const url = joinBaseUrlWithParams(USERS.SOUSCRIPTIONS, [{param: 'userId', value: userId}]);
    return makeRequest('get', url);
};

export const getBackofficeUsers = async (backofficeUserId) => {
    const url = joinBaseUrlWithParams(BACKOFFICE_USERS.GET_ALL, [{param: 'backofficeUserId', value: backofficeUserId}])
    return makeRequest('get', url);
};

export const getUserImages = async (date) => {
    const config = {headers: {
            "CHAT-ET-YAMO-MEDIA-SERVICE-ALL-USER-IMAGES": "true",
            "CHAT-ET-YAMO-MEDIA-SERVICE-PRE-SIGNED-URL": "true"
        }
    };
    return makeRequest('get', joinBaseUrlWithRequestParams(VALIDATIONS.GET_ALL, [{param: 'date', value: date}]), null, config);
};

export const getOldUserImages = async (date) => {
    // return makeRequest('get', joinBaseUrlWithRequestParams(VALIDATIONS.OLD_GET_ALL, [{param: 'date', value: date}]));
    return makeRequest('get', VALIDATIONS.OLD_GET_ALL);
};

export const getUserBlockStatus = async (userId) => {
    return makeRequest('get', joinBaseUrlWithParams(USERS.BLOCK_STATUS, [{param: 'userId', value: userId}]));
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

// ===================================== END GET

// ===================================== START POST

export const searchUser = async (attribute) => {
    const url = joinBaseUrlWithParams(USERS.SEARCH);
    return makeRequest('post', url, {attribute});
};

export const reportUser = async (userId) => {
    const url = joinBaseUrlWithParams(FEEDBACKS.REPORT);
    const feedbackText = `Feedback from image check: ${userId} should be deleted`;
    return makeRequest('post', url, {feedbackText});
};

export const sendMessage = async (userId, feedbackText, backofficeUserName, userName = null, mediaId = null) => {
    // Build request data & ensure that mediaId not available into request data if null
    let data = {feedbackText, backofficeUserName};
    if(mediaId) {
        data.mediaId = mediaId;
    }
    if(userName) {
        data.userName = userName;
    }
    const url = joinBaseUrlWithParams(
        FEEDBACKS.MESSAGES.SEND,
        [
            {param: 'backOfficeUserId', value: REACT_APP_CHAT_BACKOFFICE_USER_ID},
            {param: 'userId', value: userId},
        ]
    );
    return makeRequest('post', url, data);
};

export const changePassword = async (oldPassword, newPassword, backOfficeUserId) => {
    const url = joinBaseUrlWithParams(
        AUTH.PASSWORD,
        [{param: 'backOfficeUserId', value: backOfficeUserId}]
    );
    return makeRequest('post', url, {oldPassword, newPassword});
};

export const addBackofficeUser = async (username, lastName, firstName, password, roles, backOfficeUserId) => {
    const url = joinBaseUrlWithParams(
        BACKOFFICE_USERS.ADD_ONE,
        [{param: 'backOfficeUserId', value: backOfficeUserId}]
    );
    return makeRequest('post', url, {username, lastName, firstName, password, roles});
};

// ===================================== END POST

// ===================================== START PUT

export const notateUserImage = async (userId, mediaId, score) => {
    const url = joinBaseUrlWithParams(
        VALIDATIONS.NOTATE_ONE,
        [
            {param: 'userId', value: userId},
            {param: 'mediaId', value: mediaId}, 
            {param: 'score', value: score},
        ]
    );
    return makeRequest('put', url);
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
            {param: 'verified', value: verified},
            {param: 'mediaPath', value: mediaPath}, 
        ]
    );
    return makeRequest('put', url, null, config);
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

// ===================================== END PUT

// ===================================== START DELETE

export const deleteBackofficeUser = async (backofficeUserId, userId) => {
    const url = joinBaseUrlWithParams(
        BACKOFFICE_USERS.DELETE_ONE,
        [
            {param: 'backofficeUserId', value: backofficeUserId},
            {param: 'userId', value: userId},
        ]
    );
    return makeRequest('delete', url);
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

export const blockUser = async (userId) => {
    const url = joinBaseUrlWithParams(USERS.BLOCK, [{param: 'userId', value: userId}]); 
    return makeRequest('delete', url);
};

// ===================================== END DELETE