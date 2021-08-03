import {
    TICKETS,
    TICKETS_SUCCESS,
    TICKETS_FAILURE,
} from '../types';

/**
 * initial state
 */
const INIT_STATE = {
    data: null,
    error: null,
    loading: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case TICKETS:
            return { ...state, loading: true };

        case TICKETS_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case TICKETS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
