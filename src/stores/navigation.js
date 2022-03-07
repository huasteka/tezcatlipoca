import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useNavigationStore = defineStore({
  id: 'navigation',

  state: () => ({
    lastVisitedDashboard: useLocalStorage('navigationDashboard', 'dashboard'),
    lastVisitedSettings: useLocalStorage('navigationSettings', 'dashboard/settings/profile'),
  }),

  getters: {
    currentDashboardPath: (state) => state.lastVisitedDashboard,

    currentSettingsPath: (state) => state.lastVisitedSettings,
  },

  actions: {
    setDashboardPath(currentPath) {
      this.$patch((state) => state.lastVisitedDashboard = currentPath);
    },

    setSettingsPath(currentPath) {
      this.$patch((state) => state.lastVisitedSettings = currentPath);
    },

    logout() {
      this.$patch({ lastVisitedDashboard: 'dashboard', lastVisitedSettings: 'dashboard/settings/profile' });
    },
  }
});
