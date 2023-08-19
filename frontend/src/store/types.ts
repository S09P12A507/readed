export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface SetTokensAction {
  type: 'SET_TOKENS';
  payload: {
    accessToken: string | null;
    refreshToken: string | null;
  };
}

export type ActionTypes = SetTokensAction;
