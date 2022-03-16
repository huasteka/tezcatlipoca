export default function createService(connector, headers) {
  return {
    createItem(item) {
      return connector.post('/items', item, headers);
    },

    updateItem({ id, ...item }) {
      return connector.put(`/items/${id}`, { ...item }, headers);
    },

    deleteItem(itemId) {
      return connector.delete(`/items/${itemId}`, headers);
    },

    fetchItem(itemId) {
      return connector.post(`/items/${itemId}`, headers);
    },

    fetchItemList(pagination = null) {
      let config = { ...headers };

      if (pagination !== null) {
        config = { ...config, params: { ...pagination } };
      }

      return connector.post('/items', config);
    },
  };
}
