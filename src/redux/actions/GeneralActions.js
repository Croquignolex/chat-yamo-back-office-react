import {makeActionRequest} from "../../helpers/helpers";
import {
    TICKETS
} from "../types";
import {
    TICKETS as TICKETS_API
} from "../../utility/urls/backend";

export const getTickets = () => (dispatch) => {
    const url = `${TICKETS_API.GET_ALL}`;
    return makeActionRequest('get', url, TICKETS, dispatch);
};
