import { defineStore } from 'pinia';
import {
  createSaleService,
  extractRelationships,
  formatIncludedData,
  responseToMapReducer
} from '@/services/huitzilopochtli';
import { useAuthStore } from '@/stores/authentication';

const bearerToken = useAuthStore().bearerToken;
const saleService = createSaleService(bearerToken);

export const useSalesSaleStore = defineStore({
  id: 'huitzilopochtli-sales',

  state: () => ({
    saleList: {},
    saleIncludedData: {},
    selectedSale: null,
  }),

  getters: {
    sales: (state) => Object.values(state.saleList),

    saleWithRelationships: (state) => {
      if (state.selectedSale) {
        const merchandises_sold = state.selectedSale.merchandisesSold.map(merchandiseSoldId => {
          const soldMerchandise = state.saleIncludedData['merchandises_sold'][merchandiseSoldId];
          const clientId = soldMerchandise.relationships.client.data.slice().pop()?.id;
          const merchandiseId = soldMerchandise.relationships.merchandise.data.slice().pop()?.id;

          const merchandise = state.saleIncludedData['merchandises'][merchandiseId];
          const productId = merchandise.relationships.product.data.slice().pop()?.id;

          return {
            ...soldMerchandise,
            client: { ...state.saleIncludedData['clients'][clientId] },
            merchandise: { ...merchandise },
            product: { ...state.saleIncludedData['products'][productId] }
          };
        });

        return { ...state.selectedSale, merchandises_sold }
      }

      return null;
    },
  },

  actions: {
    async fetchSaleList(pagination = null) {
      const { data } = await saleService.fetchSaleList(pagination);
      this.$patch((state) => {
        state.saleList = responseToMapReducer(data.data);
        state.saleIncludedData = formatIncludedData(data.included);
      });
    },

    async fetchOneSale(sale_id) {
      if (this.saleList[sale_id]) {
        this.$patch((state) => state.selectedSale = this.saleList[sale_id]);
        return;
      }

      const { data } = await saleService.fetchSale(sale_id);
      this.$patch((state) => {
        state.selectedSale = {
          id: data.data.id,
          ...data.data.attributes,
          ...extractRelationships(data.data.relationships)
        };
        state.saleIncludedData = formatIncludedData(data.included);
      });
    },

    async createSale(salePayload) {
      const { data } = await saleService.createSale(salePayload);
      this.$patch((state) => state.saleList[data.data.id] = data.data);
    },

    async updateSale({ id, ...salePayload }) {
      const updatedSale = { id, ...salePayload };
      await saleService.updateSale(updatedSale);
      this.$patch((state) => state.saleList[id] = updatedSale);
    },

    async deleteSale(sale_id) {
      await saleService.deleteSale(sale_id);
      this.$patch((state) => delete state.saleList[sale_id]);
    },
  },
});
