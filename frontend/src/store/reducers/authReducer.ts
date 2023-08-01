import { ActionTypes, AuthState } from '../types';

const initialState: AuthState = {
  token: null,
};

const authReducer = (
  state: AuthState = initialState,
  action: ActionTypes,
): AuthState => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
