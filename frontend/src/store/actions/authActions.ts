export const SET_TOKEN = 'SET_TOKEN';

export interface AuthAction {
  type: typeof SET_TOKEN;
  payload: string;
}

export const setToken = (token: string): AuthAction => ({
  type: SET_TOKEN,
  payload: token,
});
