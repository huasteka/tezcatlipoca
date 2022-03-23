export default function createService(connector, headers) {
  return {
    createPurchase(purchase) {
      return connector.post('/purchases', purchase, headers);
    },

    updatePurchase({ id, ...purchase }) {
      return connector.put(`/purchases/${id}`, { ...purchase }, headers);
    },

    deletePurchase(purchase_id) {
      return connector.delete(`/purchases/${purchase_id}`, headers);
    },

    fetchPurchase(purchase_id) {
      return connector.get(`/purchases/${purchase_id}`, headers);
    },

    fetchPurchaseList(pagination = null) {
      let config = { ...headers };

      if (pagination !== null) {
        config = { ...config, params: { ...pagination } };
      }

      return connector.get('/purchases', config);
    },
  }
}
