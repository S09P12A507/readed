// src/types.ts

export interface AuthState {
  token: string | null;
}

// 액션 타입 정의
export interface SetTokenAction {
  type: 'SET_TOKEN';
  payload: string | null;
}

export type ActionTypes = SetTokenAction;
