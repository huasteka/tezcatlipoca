export default function createService(connector, headers) {
  return {
    createSupplier(supplier) {
      return connector.post('/suppliers', supplier, headers);
    },

    createSupplierContact(supplier_id, contact) {
      return connector.post(`/suppliers/${supplier_id}/contacts`, contact, headers);
    },

    updateSupplier({ id, ...supplier }) {
      return connector.put(`/suppliers/${id}`, { ...supplier }, headers);
    },

    updateSupplierContact(supplier_id, { id, ...contact }) {
      return connector.put(`/suppliers/${supplier_id}/contacts/${id}`, { ...contact }, headers);
    },

    deleteSupplier(supplier_id) {
      return connector.delete(`/suppliers/${supplier_id}`, headers);
    },

    deleteSupplierContact(supplier_id, contact_id) {
      return connector.delete(`/suppliers/${supplier_id}/contacts/${contact_id}`, headers);
    },

    fetchSupplier(supplier_id) {
      return connector.get(`/suppliers/${supplier_id}`, headers);
    },

    fetchSupplierList(pagination = null) {
      let config = { ...headers };

      if (pagination !== null) {
        config = { ...config, params: { ...pagination } };
      }

      return connector.get('/suppliers', config);
    },
  };
}
