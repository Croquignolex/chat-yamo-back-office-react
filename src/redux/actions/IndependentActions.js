import {
    USERS,
    MEDIA,
    TICKETS,
    joinBaseUrlWithParams,
} from "../../utility/urls/backend";
import {makeRequest} from "../../helpers/helpers";

export const getCaseMessages = async (userId) => {
    return makeRequest('get', joinBaseUrlWithParams(TICKETS.GET_ONE, [{param: 'userId', value: userId}]));
};

export const getUserProfile = async (userId) => {
    return makeRequest('get', joinBaseUrlWithParams(USERS.GET_ONE, [{param: 'userId', value: userId}]));
};

export const createMedia = async (userId, backOfficeUserId, data) => {
    const url = joinBaseUrlWithParams(MEDIA.CHATROOMS.CREATE, [{param: 'chatroomId', value: "${userId}:${backOfficeUserId}"}]);

    return makeRequest('put', url, data, {shouldParseFormData: true, fileData: ['picture']});
};

export const sendMessage = async (backOfficeUserId, userId, data) => {
    const url = joinBaseUrlWithParams(
        TICKETS.MESSAGES.SEND,
        [
            {param: 'backOfficeUserId', value: backOfficeUserId},
            {param: 'userId', value: userId},
        ]
    );

    return makeRequest('post', url, data);
};

export const getUserProfileImage = async (userId) => {
    const url = joinBaseUrlWithParams(
        MEDIA.USERS.GET_ONE, [{param: 'userId', value: userId}],
        true
    );
    return makeRequest('get', url);
};
