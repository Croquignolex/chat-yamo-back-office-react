import {makeRequest} from "../../helpers/helpers";
import {REACT_APP_CHAT_BACKOFFICE_USER_ID} from "../../configs/AppConfig";
import {
    AUTH,
    USERS,
    MEDIA,
    NOTATIONS,
    FEEDBACKS,
    VALIDATIONS,
    BACKOFFICE_USERS,
    joinBaseUrlWithParams,
    joinBaseUrlWithRequestParams, NOTIFICATION,
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
    const url = joinBaseUrlWithParams(USERS.GET_ONE_V2, [{param: 'userId', value: userId}]);
    return makeRequest('get', url);
};

export const getUserProfileV2 = async (userId) => {
    const url = joinBaseUrlWithParams(USERS.GET_ONE_V2, [{param: 'userId', value: userId}]);
    return makeRequest('get', url);
};

export const getUserSouscriptions = async (userId) => {
    const url = joinBaseUrlWithParams(USERS.SOUSCRIPTIONS, [{param: 'userId', value: userId}]);
    return makeRequest('get', url);
};

export const getUserStatus = async (userId) => {
    return makeRequest('get', joinBaseUrlWithParams(USERS.STATUS, [{param: 'userId', value: userId}]));
};

export const getUserIdentity = async (userId) => {
    return makeRequest('get', joinBaseUrlWithParams(MEDIA.USERS.IDENTITY, [{param: 'userId', value: userId}]));
};

export const getUserSuspiciousState = async (userId) => {
    return makeRequest('get', joinBaseUrlWithParams(MEDIA.USERS.STATE, [{param: 'userId', value: userId}]));
};

export const getUserAppData = async (userId) => {
    return makeRequest('get', joinBaseUrlWithParams(NOTIFICATION.CONTEXT, [{param: 'userId', value: userId}]));
};

export const getUserStatusHistory = async (userId) => {
    const url = joinBaseUrlWithParams(USERS.STATUS_HISTORY, [{param: 'userId', value: userId}]);
    return makeRequest('get', url);
};

export const getBackofficeUsers = async (backOfficeUserId) => {
    const url = joinBaseUrlWithParams(BACKOFFICE_USERS.GET_ALL, [{param: 'backOfficeUserId', value: backOfficeUserId}])
    return makeRequest('get', url);
};

export const getAllRoles = async () => {
    return makeRequest('get', AUTH.ROLES);
};

export const getUserImages = async (date) => {
    const config = {headers: {
            "CHAT-ET-YAMO-MEDIA-SERVICE-ALL-USER-IMAGES": "true",
            "CHAT-ET-YAMO-MEDIA-SERVICE-PRE-SIGNED-URL": "true"
        }
    };
    return makeRequest('get', joinBaseUrlWithRequestParams(VALIDATIONS.GET_ALL, [{param: 'date', value: date}]), null, config);
};

export const getUserImagesForNotation = async (date) => {
    return makeRequest('get', NOTATIONS.GET_IMAGES + '?date=' + date);
};

export const getUserProfileImagesForNotation = async (week) => {
    // return makeRequest('get', NOTATIONS.GET_PROFILE_IMAGES + '?numberOfWeek =' + week);
    return makeRequest('get', NOTATIONS.GET_PROFILE_IMAGES);
};

export const getOldUserImages = async () => {
    return makeRequest('get', VALIDATIONS.OLD_GET_ALL);
};

export const getImagesForNotedCount = async (backOfficeUserId, date) => {
    const url = joinBaseUrlWithParams(
        NOTATIONS.GET_NOTED_IMAGES_COUNT,
        [{param: 'backOfficeUserId', value: backOfficeUserId}]
    );
    return makeRequest('get', url + '?date=' + date) ;
};

export const getImagesForNotationCount = async (date) => {
    return makeRequest('get', NOTATIONS.GET_IMAGES_TO_NOTATE_COUNT + '?date=' + date) ;
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

export const searchUserImages = async (userId) => {
    const config = {headers: {
            "CHAT-ET-YAMO-MEDIA-SERVICE-ALL-USER-IMAGES": "true"
        }
    };
    const url = joinBaseUrlWithParams(MEDIA.USERS.IMAGES, [{param: 'userId', value: userId}]);
    return makeRequest('get', url, null, config);
};

export const exportSubscriptions = async (start, end, excludeBlacklist) => {
    const url = joinBaseUrlWithParams(USERS.EXPORT_SUBSCRIPTION);
    return makeRequest(
        'get',
        `${url}?start=${start}&end=${end}&excludeBlacklist=${excludeBlacklist}`,
        null,
        {responseType: "blob"}
    ) ;
};

export const exportDeletedUsers = async (start, excludeBlacklist) => {
    const url = joinBaseUrlWithParams(USERS.EXPORT_DELETED_USERS,[{param: 'date', value: start}]);
    return makeRequest('get', `${url}?excludeBlacklist=${excludeBlacklist}`, null, {responseType: "blob"}) ;
};

export const exportNewUsers = async (start, end, excludeBlacklist) => {
    const url = joinBaseUrlWithParams(USERS.EXPORT_NEW_USERS);
    return makeRequest(
        'get',
        `${url}?start=${start}&end=${end}&excludeBlacklist=${excludeBlacklist}`,
        null,
        {responseType: "blob"}
    ) ;
};

// ===================================== END GET

// ===================================== START POST

export const checkTownEvent = async (userId, date) => {
    const url = joinBaseUrlWithParams(USERS.CHECK_TOWN_EVENT,[{param: 'userId', value: userId}]);
    return makeRequest('post', url + '?startFrom=' + date) ;
};

export const searchUser = async (attribute) => {
    const url = joinBaseUrlWithParams(USERS.SEARCH);
    return makeRequest('post', url, {attribute});
};

export const reportUser = async (userId, firstName, lastName) => {
    const url = joinBaseUrlWithParams(FEEDBACKS.REPORT);
    const feedbackText = `Feedback from image check: ${userId} should be deleted`;
    const backofficeUserName = `${firstName} ${lastName}`;
    return makeRequest('post', url, {feedbackText, backofficeUserName});
};

export const sendMessage = async (userId, feedbackText, backofficeUserName, userName = null, mediaId = null, videoId = null) => {
    // Build request data & ensure that mediaId not available into request data if null
    let data = {feedbackText, backofficeUserName};
    if(mediaId) {
        data.mediaId = mediaId;
    }
    if(videoId) {
        data.videoId = videoId;
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

export const sendNotedImages = async (backOfficeUserId, date, totalImagesToProcess) => {
    const url = joinBaseUrlWithParams(
        NOTATIONS.UPDATE_NOTED_IMAGES,
        [{param: 'backOfficeUserId', value: backOfficeUserId}]
    );
    return makeRequest('post', url, {date, totalImagesToProcess});
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

export const notateUserProfile = async (userId, score) => {
    const url = joinBaseUrlWithParams(
        NOTATIONS.PROFILE,
        [{param: 'userId', value: userId}]
    );
    return makeRequest('post', url + '?score=' + score);
};

export const blockUser = async (userId) => {
    const url = joinBaseUrlWithParams(USERS.BLOCK, [{param: 'userId', value: userId}]);
    return makeRequest('delete', url + '?reason=scam');
};

export const updateUserProfile = async (userId, gender, profile) => {
    const url = joinBaseUrlWithParams(
        USERS.GET_ONE,
        [{param: 'userId', value: userId}]
    );
    const data = {
        gender,
        age: profile?.age,
        city: profile?.city,
        name: profile?.name,
        country: profile?.country,
        province: profile?.province,
        continent: profile?.continent,
        greetingText: profile?.greetingText
    };
    return makeRequest('post', url, data);
};

export const activateSubscription = async (userId, image, subscriptionPack) => {
    const url = joinBaseUrlWithParams(
        USERS.ACTIVATE_SUBSCRIPTION,
        [{param: 'userId', value: userId}]
    );
    return makeRequest('post', url, {image, subscriptionPack});
};

// ===================================== END POST

// ===================================== START PUT

export const notateUserImage = async (userId, mediaId, score) => {
    const url = joinBaseUrlWithParams(
        NOTATIONS.NOTATE_ONE,
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

export const createVideoMedia = async (userId, file) => {
    const url = joinBaseUrlWithParams(
        MEDIA.CHATROOMS.CREATE_VIDEO,
        [
            {param: 'chatroomId', value: `${userId}:${REACT_APP_CHAT_BACKOFFICE_USER_ID}`}
        ]
    );
    return makeRequest('put', url, {picture: file}, {shouldParseFormData: true, fileData: ['picture']});
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

export const deleteBackofficeUser = async (backOfficeUserId, userId) => {
    const url = joinBaseUrlWithParams(
        BACKOFFICE_USERS.DELETE_ONE,
        [
            {param: 'backOfficeUserId', value: backOfficeUserId},
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
    return makeRequest('delete', url + '?isBackoffice=true', null, config);
};

// ===================================== END DELETE