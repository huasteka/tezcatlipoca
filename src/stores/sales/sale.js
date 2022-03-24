import { defineStore } from 'pinia';
import { createSaleService, responseToMapReducer } from '@/services/huitzilopochtli';
import { useAuthStore } from '@/stores/authentication';

const bearerToken = useAuthStore().bearerToken;
const saleService = createSaleService(bearerToken);

export const useSalesSaleStore = defineStore({
  id: 'huitzilopochtli-sale',

  state: () => ({
    saleList: {},
    saleIncludedData: {},
    selectedSale: null,
  }),

  getters: {
    sales: (state) => Object.values(state.saleList),
    saleWithRelationships: (state) => {
      if (state.selectedSale) {
        const contacts = state.selectedSale.contacts.map(
          contactId => state.saleIncludedData['contacts'][contactId]
        );

        return { ...state.selectedSale, contacts }
      }

      return null;
    }
  },

  actions: {
    async fetchSaleList(pagination = null) {
      const { data } = await saleService.fetchSaleList(pagination);
      this.$patch((state) => {
        state.saleList = responseToMapReducer(data.data);

        (data.included || []).forEach(
          ({ id, type, attributes }) => state.saleIncludedData[type][id] = { id, ...attributes }
        );
      });
    },

    async fetchOneSale(sale_id) {
      if (this.saleList[sale_id]) {
        this.$patch((state) => state.selectedSale = this.saleList[sale_id]);
        return;
      }

      const { data } = await saleService.fetchSale(sale_id);
      this.$patch((state) => {
        state.selectedSale = { id: data.data.id, ...data.data.attributes };
        data.included.forEach(
          ({ id, type, attributes }) => state.saleIncludedData[type][id] = { id, ...attributes }
        );
      });
    },

    async createSale({ name, legal_document_code }) {
      const { data } = await saleService.createSale({ name, legal_document_code });
      this.$patch((state) => state.saleList[data.data.id] = data.data);
    },

    async updateSale({ id, name, legal_document_code }) {
      const updatedSale = { id, name, legal_document_code };
      await saleService.updateSale(updatedSale);
      this.$patch((state) => state.saleList[id] = updatedSale);
    },

    async deleteSale(sale_id) {
      await saleService.deleteSale(sale_id);
      this.$patch((state) => delete state.saleList[sale_id]);
    },
  },
});
