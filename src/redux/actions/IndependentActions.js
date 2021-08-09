import {makeRequest} from "../../helpers/helpers";
import {
    USERS,
    MEDIA,
    TICKETS,
    joinBaseUrlWithParams,
    joinBaseUrlWithParamsId,
} from "../../utility/urls/backend";

export const getCaseMessages = async (caseId) => {
    return makeRequest('get', joinBaseUrlWithParamsId(TICKETS.MESSAGES.GET_ALL, caseId));
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
