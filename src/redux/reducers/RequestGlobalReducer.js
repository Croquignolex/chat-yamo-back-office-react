/**
 * Auth User Reducers
 */
import {SET_REQUEST_GLOBAL_LOADER} from '../types';

/**
 * initial value
 */
const INIT_STATE = false;

export default (state = INIT_STATE, action) => {
    if (action.type === SET_REQUEST_GLOBAL_LOADER) {
        return action.payload;
    } else {
        return state;
    }
}
