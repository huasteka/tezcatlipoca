import { defineStore } from 'pinia';
import {
  createProductService,
  responseToMapReducer,
  setLogoutInterceptor
} from '@/services/huitzilopochtli';
import { useAuthStore } from '@/stores/authentication';

const authStore = useAuthStore();
const bearerToken = authStore.bearerToken;
setLogoutInterceptor(() => authStore.logout());

const productService = createProductService(bearerToken);

export const useSalesProductStore = defineStore({
  id: 'huitzilopochtli-product',

  state: () => ({
    productList: {},
    selectedProduct: null,
  }),

  getters: {
    products: (state) => Object.values(state.productList),
  },

  actions: {
    async fetchProductList(pagination = null) {
      const { data } = await productService.fetchProductList(pagination);
      this.$patch((state) => state.productList = responseToMapReducer(data.data));
    },

    async fetchOneProduct(product_id) {
      if (this.productList[product_id]) {
        this.$patch((state) => state.selectedProduct = this.productList[product_id]);
        return;
      }

      const { data } = await productService.fetchProduct(product_id);
      this.$patch((state) => state.selectedProduct = { id: data.data.id, ...data.data.attributes });
    },

    async createProduct({ name, code }) {
      const { data } = await productService.createProduct({ name, code });
      this.$patch((state) => state.productList[data.data.id] = { id: data.data.id, ...data.data });
    },

    async updateProduct({ id, name, code }) {
      const updatedProduct = { id, name, code };
      await productService.updateProduct(updatedProduct);
      this.$patch((state) => state.productList[id] = updatedProduct);
    },

    async deleteProduct(product_id) {
      await productService.deleteProduct(product_id);
      this.$patch((state) => delete state.productList[product_id]);
    },
  },
});
