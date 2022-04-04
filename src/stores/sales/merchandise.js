import { defineStore } from 'pinia';
import {
  createMerchandiseService,
  extractRelationships,
  formatIncludedData,
  responseToMapReducer,
  setLogoutInterceptor
} from '@/services/huitzilopochtli';
import { useAuthStore } from '@/stores/authentication';

const authStore = useAuthStore();
const bearerToken = authStore.bearerToken;
setLogoutInterceptor(() => authStore.logout());

const merchandiseService = createMerchandiseService(bearerToken);

export const useSalesMerchandiseStore = defineStore({
  id: 'huitzilopochtli-merchandise',

  state: () => ({
    merchandiseList: {},
    merchandiseIncludedData: {},
    selectedMerchandise: null,
  }),

  getters: {
    merchandises: (state) => Object.values(state.merchandiseList).map((merchandise) => {
      if (merchandise.product && merchandise.product.length > 0) {
        const productId = merchandise.product.slice().pop();
        return {
          ...merchandise,
          product: state.merchandiseIncludedData['products'][productId],
        };
      }

      return merchandise;
    }),

    merchandiseWithRelationships: (state) => {
      if (state.selectedMerchandise) {
        const products = state.selectedMerchandise.product.map(
          productId => state.merchandiseIncludedData['products'][productId]
        );

        // A merchandise have only one product
        return { ...state.selectedMerchandise, product: products.slice().pop() }
      }

      return null;
    },
  },

  actions: {
    async fetchMerchandiseList(pagination = null) {
      const { data } = await merchandiseService.fetchMerchandiseList(pagination);
      this.$patch((state) => {
        state.merchandiseList = responseToMapReducer(data.data);
        state.merchandiseIncludedData = formatIncludedData(data.included);
      });
    },

    async fetchOneMerchandise(merchandise_id) {
      if (this.merchandiseList[merchandise_id]) {
        this.$patch((state) => state.selectedMerchandise = this.merchandiseList[merchandise_id]);
        return;
      }

      const { data } = await merchandiseService.fetchMerchandise(merchandise_id);
      this.$patch((state) => {
        state.selectedMerchandise = {
          id: data.data.id,
          ...data.data.attributes,
          ...extractRelationships(data.data.relationships)
        };
        state.merchandiseIncludedData = formatIncludedData(data.included);
      });
    },

    async createMerchandise(merchandise) {
      const { data } = await merchandiseService.createMerchandise(merchandise);
      this.$patch((state) => state.merchandiseList[data.data.id] = data.data);
    },

    async updateMerchandise({ id, ...merchandise }) {
      const updatedMerchandise = { id, ...merchandise };
      await merchandiseService.updateMerchandise(updatedMerchandise);
      this.$patch((state) => state.merchandiseList[id] = updatedMerchandise);
    },

    async deleteMerchandise(merchandise_id) {
      await merchandiseService.deleteMerchandise(merchandise_id);
      this.$patch((state) => delete state.merchandiseList[merchandise_id]);
    },
  },
});
