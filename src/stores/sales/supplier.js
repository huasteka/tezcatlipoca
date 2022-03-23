import { defineStore } from 'pinia';
import {
  createSupplierService,
  extractRelationships,
  formatIncludedData,
  responseToMapReducer
} from '@/services/huitzilopochtli';
import { useAuthStore } from '@/stores/authentication';

const bearerToken = useAuthStore().bearerToken;
const supplierService = createSupplierService(bearerToken);

export const useSalesSupplierStore = defineStore({
  id: 'huitzilopochtli-supplier',

  state: () => ({
    supplierList: {},
    supplierIncludedData: {},
    selectedSupplier: null,
  }),

  getters: {
    suppliers: (state) => Object.values(state.supplierList),
    supplierWithRelationships: (state) => {
      if (state.selectedSupplier) {
        const contacts = state.selectedSupplier.contacts.map(
          contactId => state.supplierIncludedData['contacts'][contactId]
        );

        return { ...state.selectedSupplier, contacts }
      }

      return null;
    }
  },

  actions: {
    async fetchSupplierList(pagination = null) {
      const { data } = await supplierService.fetchSupplierList(pagination);
      this.$patch((state) => {
        state.supplierList = responseToMapReducer(data.data);
        state.supplierIncludedData = formatIncludedData(data.included);
      });
    },

    async fetchOneSupplier(supplier_id) {
      if (this.supplierList[supplier_id]) {
        this.$patch((state) => state.selectedSupplier = this.supplierList[supplier_id]);
        return;
      }

      const { data } = await supplierService.fetchSupplier(supplier_id);
      this.$patch((state) => {
        state.selectedSupplier = {
          id: data.data.id,
          ...data.data.attributes,
          ...extractRelationships(data.data.relationships)
        };
        state.supplierIncludedData = formatIncludedData(data.included);
      });
    },

    async createSupplier({ name, trade_name, legal_document_code }) {
      const { data } = await supplierService.createSupplier({ name, trade_name, legal_document_code });
      this.$patch((state) => state.supplierList[data.data.id] = data.data);
      return data.data.id;
    },

    async createSupplierContact(supplier_id, contact) {
      await supplierService.createSupplierContact(supplier_id, contact);
    },

    async updateSupplier({ id, name, trade_name, legal_document_code }) {
      const updatedSupplier = { id, name, trade_name, legal_document_code };
      await supplierService.updateSupplier(updatedSupplier);
      this.$patch((state) => state.supplierList[id] = updatedSupplier);
      return id;
    },

    async updateSupplierContact(supplier_id, { id, ...contact }) {
      await supplierService.createSupplierContact(supplier_id, { id, ...contact });
      this.$patch((state) => state.supplierIncludedData['contacts'][id] = contact);
    },

    async deleteSupplier(supplier_id) {
      await supplierService.deleteSupplier(supplier_id);
      this.$patch((state) => delete state.supplierList[supplier_id]);
    },

    async deleteSupplierContact(supplier_id, contact_id) {
      await supplierService.deleteSupplierContact(supplier_id, contact_id);
      this.$patch((state) => delete state.supplierIncludedData['contacts'][contact_id]);
    }
  },
});
