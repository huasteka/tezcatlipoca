export default function createService(connector, headers) {
  return {
    createMerchandise(merchandise) {
      return connector.post('/merchandises', merchandise, headers);
    },

    updateMerchandise({ id, ...merchandise }) {
      return connector.put(`/merchandises/${id}`, { ...merchandise }, headers);
    },

    deleteMerchandise(merchandise_id) {
      return connector.delete(`/merchandises/${merchandise_id}`, headers);
    },

    fetchMerchandise(merchandise_id) {
      return connector.get(`/merchandises/${merchandise_id}`, headers);
    },

    fetchMerchandiseList(pagination = null) {
      let config = { ...headers };

      if (pagination !== null) {
        config = { ...config, params: { ...pagination } };
      }

      return connector.get('/merchandises', config);
    },
  }
}
