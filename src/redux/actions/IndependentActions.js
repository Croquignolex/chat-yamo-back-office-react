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

export const createMedia = async (caseId) => {
    return makeRequest('post', joinBaseUrlWithParams(MEDIA.CHATROOMS.CREATE, [{param: 'chatroomId', value: caseId}]));
};

export const sendMessage = async (backOfficeUserId, userId) => {
    const url = joinBaseUrlWithParams(
        TICKETS.MESSAGES.SEND,
        [
            {param: 'backOfficeUserId', value: backOfficeUserId},
            {param: 'userId', value: userId},
        ]
    );

    return makeRequest('post', url);
};
