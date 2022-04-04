import { defineStore } from 'pinia';
import {
  createItemService,
  createMeasureUnitService,
  createStorageService,
  createOperationService,
  responseToMapReducer,
  setLogoutInterceptor
} from '@/services/tepoztecatl';
import { useAuthStore } from './authentication';

const authStore = useAuthStore();
const bearerToken = authStore.bearerToken;
setLogoutInterceptor(() => authStore.logout());

const storageService = createStorageService(bearerToken);
const measureUnitService = createMeasureUnitService(bearerToken);
const itemService = createItemService(bearerToken);
const operationService = createOperationService(bearerToken);

export const useStorageStore = defineStore({
  id: 'tepoztecatl',

  state: () => ({
    operationHistory: [],
    storageList: {},
    measureUnitList: {},
    itemList: {},
    selectedStorage: null,
    selectedMeasureUnit: null,
    selectedItem: null,
  }),

  getters: {
    storages: (state) => Object.values(state.storageList),
    measureUnits: (state) => Object.values(state.measureUnitList),
    items: (state) => Object.values(state.itemList),
    history: (state) => state.operationHistory,
  },

  actions: {
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

    async fetchItemList(pagination = null) {
      const response = await itemService.fetchItemList(pagination);
      this.$patch((state) => state.itemList = responseToMapReducer(response.data.data));
    },

    async fetchOneItem(itemId) {
      const { data } = await itemService.fetchItem(itemId);
      this.$patch((state) => state.selectedItem = { id: data.data.id, ...data.data.attributes });
    },

    async createItem({
      name,
      code,
      input_measure_unit_id,
      input_quantity,
      output_measure_unit_id,
      output_quantity
    }) {
      const createdItem = {
        name,
        code,
        input_measure_unit_id,
        input_quantity,
        output_measure_unit_id,
        output_quantity
      };
      const { data } = await itemService.createItem(createdItem);
      this.$patch((state) => state.itemList[data.data.id] = data.data);
    },

    async updateItem({
      id,
      name,
      code,
      input_measure_unit_id,
      input_quantity,
      output_measure_unit_id,
      output_quantity
    }) {
      const updatedItem = {
        id,
        name,
        code,
        input_measure_unit_id,
        input_quantity,
        output_measure_unit_id,
        output_quantity
      };
      await itemService.updateItem(updatedItem);
      this.$patch((state) => state.itemList[id] = updatedItem);
    },

    async deleteItem(itemId) {
      await itemService.deleteItem(itemId);
      this.$patch((state) => delete state.itemList[itemId]);
    },

    async fetchOperationHistory(storageId = null, pagination = null) {
      const response = await operationService.fetchOperationHistory(storageId, pagination);
      const operationMapper = ({ id, attributes }) => ({ id, ...attributes });
      this.$patch((state) => state.operationHistory = (response.data.data || []).map(operationMapper));
    },

    async createDepositOperation({ storage_id, item_id, quantity }) {
      await operationService.createStockDeposit({ storage_id, item_id, quantity });
    },

    async createWithdrawOperation({ storage_id, item_id, quantity }) {
      await operationService.createStockWithdraw({ storage_id, item_id, quantity });
    },

    async createTransferOperation({ from_storage_id, to_storage_id, item_id, quantity }) {
      await operationService.createStockTransfer({ from_storage_id, to_storage_id, item_id, quantity });
    },
  },
});
