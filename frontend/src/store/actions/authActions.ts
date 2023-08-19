export const SET_TOKENS = 'SET_TOKENS';

export interface SetTokensAction {
  type: typeof SET_TOKENS;
  payload: {
    accessToken: string;
    refreshToken: string;
  };
}

export const setTokens = (
  accessToken: string,
  refreshToken: string,
): SetTokensAction => ({
  type: SET_TOKENS,
  payload: {
    accessToken,
    refreshToken,
  },
});
