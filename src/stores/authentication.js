import { defineStore } from 'pinia';

import AuthService from '../services/authentication';

export const useAuthStore = defineStore({
  id: 'authentication',

  state: () => ({
    token: null,
    profile: null,
  }),

  getters: {
    isAuthenticated: (state) => state.token !== null,

    userProfile: (state) => state.profile,
  },

  actions: {
    async register(user) {
      const response = await AuthService.registerUser(user);
      this.$patch((state) => state.token = response.token);
    },

    async login(credentials) {
      const response = await AuthService.loginUser(credentials);
      this.$patch((state) => state.token = response.token);
    },
  },
});
