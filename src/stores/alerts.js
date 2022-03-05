import { defineStore } from 'pinia';
import MessageService from '../services/message';

export const useAlertStore = defineStore({
  id: 'alerts',

  state: () => ({
    alerts: [],
  }),

  getters: {
    currentAlerts: (state) => state.alerts,
  },

  actions: {
    success(message) {
      this.$patch((state) => state.alerts.push(
        MessageService.createSuccess(message)
      ));
    },

    warning(message) {
      this.$patch((state) => state.alerts.push(
        MessageService.createWarning(message)
      ));
    },

    error(message) {
      this.$patch((state) => state.alerts.push(
        MessageService.createError(message)
      ));
    },

    remove(alertId) {
      this.$patch((state) => ({
        alerts: state.alerts.filter((alert) => alert.id !== alertId)
      }));
    }
  }
});
