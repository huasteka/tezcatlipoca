export default function createService(connector, headers) {
  return {
    createDeliveryAddress(delivery_address) {
      return connector.post('/delivery_addresses', delivery_address, headers);
    },

    updateDeliveryAddress({ id, ...delivery_address }) {
      return connector.put(`/delivery_addresses/${id}`, { ...delivery_address }, headers);
    },

    deleteDeliveryAddress(delivery_address_id) {
      return connector.delete(`/delivery_addresses/${delivery_address_id}`, headers);
    },

    fetchDeliveryAddress(delivery_address_id) {
      return connector.get(`/delivery_addresses/${delivery_address_id}`, headers);
    },

    fetchDeliveryAddressList(pagination = null) {
      let config = { ...headers };

      if (pagination !== null) {
        config = { ...config, params: { ...pagination } };
      }

      return connector.get('/delivery_addresses', config);
    },
  }
}
