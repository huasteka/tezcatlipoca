export default function createService(connector, headers) {
  return {
    createSale(sale) {
      return connector.post('/sales', sale, headers);
    },

    updateSale({ id, ...sale }) {
      return connector.put(`/sales/${id}`, { ...sale }, headers);
    },

    deleteSale(sale_id) {
      return connector.delete(`/sales/${sale_id}`, headers);
    },

    fetchSale(sale_id) {
      return connector.get(`/sales/${sale_id}`, headers);
    },

    fetchSaleList(pagination = null) {
      let config = { ...headers };

      if (pagination !== null) {
        config = { ...config, params: { ...pagination } };
      }

      return connector.get('/sales', config);
    },
  }
}
