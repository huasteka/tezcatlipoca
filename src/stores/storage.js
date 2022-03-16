import { defineStore } from 'pinia';
import { createStorageService, responseToMapReducer } from '@/services/tepoztecatl';
import { useAuthStore } from './authentication';

const bearerToken = useAuthStore().bearerToken;
const storageService = createStorageService(bearerToken);

export const useStorageStore = defineStore({
  id: 'tepoztecatl',

  state: () => ({
    operationHistory: {},
    storageList: {},
    measureUnitList: {},
    itemList: {},
    selectedStorage: null,
  }),

  getters: {
    history: (state) => Object.values(state.operationHistory),
    storages: (state) => Object.values(state.storageList),
  },

  actions: {
    async fetchOperationHistory(storageId, pagination = null) {
      const response = await storageService.fetchOperationHistory(storageId, pagination);
      this.$patch((state) => state.operationHistory = responseToMapReducer(response.data.data));
    },

    async fetchStorageList(pagination = null) {
      const response = await storageService.fetchStorageList(pagination);
      this.$patch((state) => state.storageList = responseToMapReducer(response.data.data));
    },

    async createStorage({ name, code }) {
      const { data } = await storageService.createStorage({ name, code });
      this.$patch((state) => state.storageList[data.data.id] = data.data);
    },

    async createNestedStorage({ parentId, name, code }) {
      const { data } = await storageService.createNestedStorage({ parentId, childStorage: { name, code } });
      this.$patch((state) => state.storageList[parentId]['children']?.push(data.data));
    },

    async updateStorage({ id, name, code }) {
      const updatedStorage = { id, name, code };
      await storageService.updateStorage(updatedStorage);
      this.$patch((state) => state.storageList[id] = updatedStorage);
    },

    async deleteStorage(storageId) {
      await storageService.deleteStorage(storageId);
      this.$patch((state) => delete state.storageList[storageId]);
    },

    async fetchOneStorage(storageId) {
      if (this.storageList[storageId]) {
        this.$patch((state) => state.selectedStorage = this.storageList[storageId]);
        return;
      }

      const { data } = await storageService.fetchStorage(storageId);
      this.$patch((state) => state.selectedStorage = { id: data.data.id, ...data.data.attributes });
    },
  },
});
