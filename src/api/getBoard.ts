import { API_URL } from '../data/constants';
import { BoardResponse } from '../data/interfaces';
import { toastErrorDark, toastWarnDark } from '../utils/toast';
import validateUser from './_validateUser';

export default async function getBoard(
  id: string,
  logoutUser: () => void,
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>
) {
  const userData = await validateUser(logoutUser, setSpinner);

  if (userData) {
    setSpinner(true);

    const url = `${API_URL}/boards/${id}`;

    let res = {} as Response;

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      res = await fetch(url, options);
    } catch {
      toastErrorDark('No response from server');
      setSpinner(false);
      return false;
    }

    setSpinner(false);

    if (res.ok) {
      const board: BoardResponse = await res.json();
      return board;
    }

    if (res.status === 401) {
      toastErrorDark('Invalid token. Please, log in again');
      logoutUser();
    } else if (res.status >= 400 && res.status <= 499) {
      toastErrorDark('Board not found');
    } else if (res.status >= 500) {
      toastWarnDark('Server Error');
    }
  }

  return false;
}
