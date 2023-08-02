export interface AuthState {
  token: string | null;
}

export interface SetTokenAction {
  type: 'SET_TOKEN';
  payload: string | null;
}

export type ActionTypes = SetTokenAction;
