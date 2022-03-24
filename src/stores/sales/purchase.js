import { defineStore } from 'pinia';
import { createPurchaseService, responseToMapReducer } from '@/services/huitzilopochtli';
import { useAuthStore } from '@/stores/authentication';

const bearerToken = useAuthStore().bearerToken;
const purchaseService = createPurchaseService(bearerToken);

export const useSalesPurchaseStore = defineStore({
  id: 'huitzilopochtli-purchase',

  state: () => ({
    purchaseList: {},
    purchaseIncludedData: {},
    selectedPurchase: null,
  }),

  getters: {
    purchases: (state) => Object.values(state.purchaseList),
    purchaseWithRelationships: (state) => {
      if (state.selectedPurchase) {
        const contacts = state.selectedPurchase.contacts.map(
          contactId => state.purchaseIncludedData['contacts'][contactId]
        );

        return { ...state.selectedPurchase, contacts }
      }

      return null;
    }
  },

  actions: {
    async fetchPurchaseList(pagination = null) {
      const { data } = await purchaseService.fetchPurchaseList(pagination);
      this.$patch((state) => {
        state.purchaseList = responseToMapReducer(data.data);

        (data.included || []).forEach(
          ({ id, type, attributes }) => state.purchaseIncludedData[type][id] = { id, ...attributes }
        );
      });
    },

    async fetchOnePurchase(purchase_id) {
      if (this.purchaseList[purchase_id]) {
        this.$patch((state) => state.selectedPurchase = this.purchaseList[purchase_id]);
        return;
      }

      const { data } = await purchaseService.fetchPurchase(purchase_id);
      this.$patch((state) => {
        state.selectedPurchase = { id: data.data.id, ...data.data.attributes };
        data.included.forEach(
          ({ id, type, attributes }) => state.purchaseIncludedData[type][id] = { id, ...attributes }
        );
      });
    },

    async createPurchase({ name, legal_document_code }) {
      const { data } = await purchaseService.createPurchase({ name, legal_document_code });
      this.$patch((state) => state.purchaseList[data.data.id] = data.data);
    },

    async updatePurchase({ id, name, legal_document_code }) {
      const updatedPurchase = { id, name, legal_document_code };
      await purchaseService.updatePurchase(updatedPurchase);
      this.$patch((state) => state.purchaseList[id] = updatedPurchase);
    },

    async deletePurchase(purchase_id) {
      await purchaseService.deletePurchase(purchase_id);
      this.$patch((state) => delete state.purchaseList[purchase_id]);
    },
  },
});
