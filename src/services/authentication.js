import axios from 'axios';
import config from '@/config';

const connector = axios.create({
  baseURL: `${config.zacatzontli}/api`,
  headers: { 'Content-Type': 'application/json' },
});

function headers(bearerToken) {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`,
    },
  };
}

export default {
  registerUser(user) {
    return connector.post('/auth/sign-up', user);
  },

  loginUser(credentials) {
    return connector.post('/auth/sign-in', credentials);
  },

  fetchUserProfile(token) {
    return connector.get('/users/profile', headers(token));
  },

  changeUserName(token, { userId, name }) {
    return connector.put(`/users/${userId}`, { name }, headers(token));
  },

  changePassword(token, { userId, password, passwordConfirmation }) {
    return connector.post(`/users/${userId}/change-password`, { password, passwordConfirmation }, headers(token));
  },
};
