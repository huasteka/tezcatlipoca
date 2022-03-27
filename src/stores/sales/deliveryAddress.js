import { defineStore } from 'pinia';
import { createDeliveryAddressService, responseToMapReducer } from '@/services/huitzilopochtli';
import { useAuthStore } from '@/stores/authentication';

const bearerToken = useAuthStore().bearerToken;
const deliveryAddressService = createDeliveryAddressService(bearerToken);

export const useSalesDeliveryAddressStore = defineStore({
  id: 'huitzilopochtli-delivery-address',

  state: () => ({
    deliveryAddressList: {},
    selectedDeliveryAddress: null,
  }),

  getters: {
    deliveryAddresses: (state) => Object.values(state.deliveryAddressList),
  },

  actions: {
    async fetchDeliveryAddressList(pagination = null) {
      const { data } = await deliveryAddressService.fetchDeliveryAddressList(pagination);
      this.$patch((state) => state.deliveryAddressList = responseToMapReducer(data.data));
    },

    async fetchOneDeliveryAddress(delivery_address_id) {
      if (this.deliveryAddressList[delivery_address_id]) {
        this.$patch((state) => state.selectedDeliveryAddress = this.deliveryAddressList[delivery_address_id]);
        return;
      }

      const { data } = await deliveryAddressService.fetchDeliveryAddress(delivery_address_id);
      this.$patch((state) => state.selectedDeliveryAddress = { id: data.data.id, ...data.data.attributes });
    },

    async createDeliveryAddress(deliveryAddress) {
      const { data } = await deliveryAddressService.createDeliveryAddress(deliveryAddress);
      this.$patch((state) => state.deliveryAddressList[data.data.id] = { id: data.data.id, ...data.data });
    },

    async updateDeliveryAddress({ id, ...deliveryAddress }) {
      const updatedDeliveryAddress = { id, ...deliveryAddress };
      await deliveryAddressService.updateDeliveryAddress(updatedDeliveryAddress);
      this.$patch((state) => state.deliveryAddressList[id] = updatedDeliveryAddress);
    },

    async deleteDeliveryAddress(delivery_address_id) {
      await deliveryAddressService.deleteDeliveryAddress(delivery_address_id);
      this.$patch((state) => delete state.deliveryAddressList[delivery_address_id]);
    },
  },
});
