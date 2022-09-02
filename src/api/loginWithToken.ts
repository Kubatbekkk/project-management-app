import { LS_TOKEN_KEY } from 'data/constants';

export default function loginWithToken(
  token: string,
  dispatchIsAuth: React.Dispatch<React.SetStateAction<boolean>>
): void {
  localStorage.setItem(LS_TOKEN_KEY, token);
  dispatchIsAuth(true);
}
