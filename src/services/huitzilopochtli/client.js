export default function createService(connector, headers) {
  return {
    createClient(client) {
      return connector.post('/clients', client, headers);
    },

    createClientContact(client_id, contact) {
      return connector.post(`/clients/${client_id}/contacts`, contact, headers);
    },

    updateClient({ id, ...client }) {
      return connector.put(`/clients/${id}`, { ...client }, headers);
    },

    updateClientContact(client_id, { id, ...contact }) {
      return connector.put(`/clients/${client_id}/contacts/${id}`, { ...contact }, headers);
    },

    deleteClient(client_id) {
      return connector.delete(`/clients/${client_id}`, headers);
    },

    deleteClientContact(client_id, contact_id) {
      return connector.delete(`/clients/${client_id}/contacts/${contact_id}`, headers);
    },

    fetchClient(client_id) {
      return connector.get(`/clients/${client_id}`, headers);
    },

    fetchClientList(pagination = null) {
      let config = { ...headers };

      if (pagination !== null) {
        config = { ...config, params: { ...pagination } };
      }

      return connector.get('/clients', config);
    },
  };
}
