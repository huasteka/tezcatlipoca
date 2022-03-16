import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import AuthService from '../services/authentication';
import SerializationService from '../services/serializer';

export const useAuthStore = defineStore({
  id: 'authentication',

  state: () => ({
    token: useLocalStorage('authenticationToken', null),
    profile: useLocalStorage('authenticationProfile', null, { serializer: SerializationService }),
  }),

  getters: {
    bearerToken: (state) => state.token,

    isAuthenticated: (state) => state.token !== null,

    userProfile: (state) => state.profile || {},
  },

  actions: {
    async register({ name, email, password }) {
      const response = await AuthService.registerUser({ name, email, password });
      this.$patch((state) => state.token = response.data.token);
    },

    async login({ email, password }) {
      const response = await AuthService.loginUser({ email, password });
      this.$patch((state) => state.token = response.data.token);
    },

    async fetchUserProfile() {
      if (this.profile !== null) {
        return;
      }

      const response = await AuthService.fetchUserProfile(this.token);
      this.$patch((state) => state.profile = response.data);
    },

    async changeUserName({ userId, name }) {
      const response = await AuthService.changeUserName(this.token, { userId, name });
      this.$patch((state) => state.profile = response.data);
    },

    async changePassword({ userId, password, passwordConfirmation }) {
      const response = await AuthService.changePassword(this.token, { userId, password, passwordConfirmation });
      this.$patch((state) => state.profile = response.data);
    },

    logout() {
      this.$patch({ token: null, profile: null })
    },
  },
});
