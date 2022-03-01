import axios from 'axios';

const connector = axios.create({
  baseURL: 'http://localhost:1337/api',
  headers: { 'Content-Type': 'application/json' },
});

export default {
  registerUser(user) {
    return connector.post('/auth/sign-up', user);
  },

  loginUser(credentials) {
    return connector.post('/auth/sign-in', credentials);
  },
};
