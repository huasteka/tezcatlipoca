import { defineStore } from 'pinia';
import {
  createStorageService,
  createMeasureUnitService,
  responseToMapReducer
} from '@/services/tepoztecatl';
import { useAuthStore } from './authentication';

const bearerToken = useAuthStore().bearerToken;
const storageService = createStorageService(bearerToken);
const measureUnitService = createMeasureUnitService(bearerToken);

export const useStorageStore = defineStore({
  id: 'tepoztecatl',

  state: () => ({
    operationHistory: {},
    storageList: {},
    measureUnitList: {},
    itemList: {},
    selectedStorage: null,
    selectedMeasureUnit: null,
  }),

  getters: {
    history: (state) => Object.values(state.operationHistory),
    storages: (state) => Object.values(state.storageList),
    measureUnits: (state) => Object.values(state.measureUnitList),
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

    async fetchOneStorage(storageId) {
      if (this.storageList[storageId]) {
        this.$patch((state) => state.selectedStorage = this.storageList[storageId]);
        return;
      }

      const { data } = await storageService.fetchStorage(storageId);
      this.$patch((state) => state.selectedStorage = { id: data.data.id, ...data.data.attributes });
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

    async fetchMeasureUnitList(pagination = null) {
      const response = await measureUnitService.fetchMeasureUnitList(pagination);
      this.$patch((state) => state.measureUnitList = responseToMapReducer(response.data.data));
    },

    async fetchOneMeasureUnit(measureUnitId) {
      if (this.measureUnitList[measureUnitId]) {
        this.$patch((state) => state.selectedMeasureUnit = this.measureUnitList[measureUnitId]);
        return;
      }

      const { data } = await measureUnitService.fetchMeasureUnit(measureUnitId);
      this.$patch((state) => state.selectedMeasureUnit = { id: data.data.id, ...data.data.attributes });
    },

    async createMeasureUnit({ name, acronym }) {
      const { data } = await measureUnitService.createMeasureUnit({ name, acronym });
      this.$patch((state) => state.measureUnitList[data.data.id] = data.data);
    },

    async updateMeasureUnit({ id, name, acronym }) {
      const updatedMeasureUnit = { id, name, acronym };
      await measureUnitService.updateMeasureUnit(updatedMeasureUnit);
      this.$patch((state) => state.measureUnitList[id] = updatedMeasureUnit);
    },

    async deleteMeasureUnit(measureUnitId) {
      await measureUnitService.deleteMeasureUnit(measureUnitId);
      this.$patch((state) => delete state.measureUnitList[measureUnitId]);
    },
  },
});
