import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export function useRefreshToken(): string | null {
  const token: string | null = useSelector(
    (state: RootState) => state.auth.refreshToken,
  );
  return token;
}
