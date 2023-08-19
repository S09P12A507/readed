import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export function useAccessToken(): string | null {
  const token: string | null = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  return token;
}
