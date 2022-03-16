export default function createService(connector, headers) {
  return {
    createStorage(storage) {
      return connector.post('/storages', storage, headers);
    },

    createNestedStorage({ parentId, childStorage }) {
      return connector.post(`/storages/${parentId}/add`, childStorage, headers);
    },

    updateStorage({ id, ...storage }) {
      return connector.put(`/storages/${id}`, { ...storage }, headers);
    },

    deleteStorage(storageId) {
      return connector.delete(`/storages/${storageId}`, headers);
    },

    fetchStorage(storageId) {
      return connector.get(`/storages/${storageId}`, headers);
    },

    fetchStorageList(pagination = null) {
      let config = { ...headers };

      if (pagination !== null) {
        config = { ...config, params: { ...pagination } };
      }

      return connector.get('/storages', config);
    },
  }
}
