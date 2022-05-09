import { API_URL } from '../data/constants';
import { ApiUserInfo } from '../data/interfacesA';

const getUser = async (id: string) => {
  const token = localStorage.getItem('token') || '';
  const defUser: ApiUserInfo = {
    login: '',
    id: '',
    name: 'name',
  };
  const options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch(`${API_URL}/users/${id}`, options);
  if (res.ok) {
    const user: ApiUserInfo = await res.json();
    return user;
  }
  if (res.status >= 400) {
    // logout
  }
  return defUser;
};

export default getUser;
