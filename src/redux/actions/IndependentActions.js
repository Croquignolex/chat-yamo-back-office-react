import {makeRequest} from "../../helpers/helpers";
import {
    TICKETS,
    joinBaseUrlWithParamsId,
} from "../../utility/urls/backend";

export const getCaseMessages = async (caseId) => {
    return makeRequest('get', joinBaseUrlWithParamsId(TICKETS.MESSAGES.GET_ALL, caseId));
};
