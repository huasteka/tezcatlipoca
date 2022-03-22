export default function createService(connector, headers) {
  return {
    createAccount(account) {
      return connector.post('/accounts', account, headers);
    },

    updateAccount(account) {
      return connector.put(`/accounts/${account.id}`, account, headers);
    },

    deleteAccount(accountId) {
      return connector.delete(`/accounts/${accountId}`, headers);
    },

    fetchAccount(accountId) {
      return connector.get(`/accounts/${accountId}`, headers);
    },

    fetchAccountList(pagination = null) {
      let config = { ...headers };

      if (pagination !== null) {
        config = { ...config, params: { ...pagination } };
      }

      return connector.get('/accounts', config);
    },
  }
}
