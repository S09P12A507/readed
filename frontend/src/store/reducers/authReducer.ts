import { SET_TOKENS } from '../actions/authActions';
import { ActionTypes, AuthState } from '../types';

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
};

const authReducer = (
  state: AuthState = initialState,
  action: ActionTypes,
): AuthState => {
  switch (action.type) {
    case SET_TOKENS:
      return {
        ...state,
        accessToken: action.payload.accessToken as string,
        refreshToken: action.payload.refreshToken as string,
      };
    default:
      return state;
  }
};

export default authReducer;
