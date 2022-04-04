import { defineStore } from 'pinia';
import {
  createPurchaseService,
  extractRelationships,
  formatIncludedData,
  responseToMapReducer,
  setLogoutInterceptor
} from '@/services/huitzilopochtli';
import { useAuthStore } from '@/stores/authentication';

const authStore = useAuthStore();
const bearerToken = authStore.bearerToken;
setLogoutInterceptor(() => authStore.logout());

const purchaseService = createPurchaseService(bearerToken);

export const useSalesPurchaseStore = defineStore({
  id: 'huitzilopochtli-purchases',

  state: () => ({
    purchaseList: {},
    purchaseIncludedData: {},
    selectedPurchase: null,
  }),

  getters: {
    purchases: (state) => Object.values(state.purchaseList),

    purchaseWithRelationships: (state) => {
      if (state.selectedPurchase) {
        const merchandises_purchased = state.selectedPurchase.merchandisesPurchased.map(merchandisePurchasedId => {
          const purchasedMerchandise = state.purchaseIncludedData['merchandises_purchased'][merchandisePurchasedId];
          const supplierId = purchasedMerchandise.relationships.supplier.data.slice().pop()?.id;
          const merchandiseId = purchasedMerchandise.relationships.merchandise.data.slice().pop()?.id;

          const merchandise = state.purchaseIncludedData['merchandises'][merchandiseId];
          const productId = merchandise.relationships.product.data.slice().pop()?.id;

          return {
            ...purchasedMerchandise,
            supplier: { ...state.purchaseIncludedData['suppliers'][supplierId] },
            merchandise: { ...merchandise },
            product: { ...state.purchaseIncludedData['products'][productId] }
          };
        });

        return { ...state.selectedPurchase, merchandises_purchased }
      }

      return null;
    },
  },

  actions: {
    async fetchPurchaseList(pagination = null) {
      const { data } = await purchaseService.fetchPurchaseList(pagination);
      this.$patch((state) => {
        state.purchaseList = responseToMapReducer(data.data);
        state.purchaseIncludedData = formatIncludedData(data.included);
      });
    },

    async fetchOnePurchase(purchase_id) {
      if (this.purchaseList[purchase_id]) {
        this.$patch((state) => state.selectedPurchase = this.purchaseList[purchase_id]);
        return;
      }

      const { data } = await purchaseService.fetchPurchase(purchase_id);
      this.$patch((state) => {
        state.selectedPurchase = {
          id: data.data.id,
          ...data.data.attributes,
          ...extractRelationships(data.data.relationships)
        };
        state.purchaseIncludedData = formatIncludedData(data.included);
      });
    },

    async createPurchase(purchasePayload) {
      const { data } = await purchaseService.createPurchase(purchasePayload);
      this.$patch((state) => state.purchaseList[data.data.id] = data.data);
    },

    async updatePurchase({ id, ...purchasePayload }) {
      const updatedPurchase = { id, ...purchasePayload };
      await purchaseService.updatePurchase(updatedPurchase);
      this.$patch((state) => state.purchaseList[id] = updatedPurchase);
    },

    async deletePurchase(purchase_id) {
      await purchaseService.deletePurchase(purchase_id);
      this.$patch((state) => delete state.purchaseList[purchase_id]);
    },
  },
});
