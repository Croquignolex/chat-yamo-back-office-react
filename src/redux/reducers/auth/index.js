/**
 * Auth User Reducers
 */
import {
  SET_AUTH_USER,
  CLEAR_AUTH_USER,
  SET_AUTH_USER_SUCCESS,
  SET_AUTH_USER_FAILURE,
} from '../../types';

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

    case SET_AUTH_USER:
      return { ...state, loading: true };

    case SET_AUTH_USER_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: INIT_STATE.error };

    case SET_AUTH_USER_FAILURE:
      return { ...state, loading: false, error: action.payload, data: INIT_STATE.data };

    case CLEAR_AUTH_USER:
      return { ...INIT_STATE };

    default: return { ...state };
  }
}
