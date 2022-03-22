export default function createService(connector, headers) {
  return {
    createAccountDeposit(operation) {
      return connector.post('/entries/deposit', operation, headers);
    },

    createAccountWithdraw(operation) {
      return connector.post('/entries/withdraw', operation, headers);
    },

    createAccountTransfer(transfer) {
      return connector.post('/transfers', transfer, headers);
    },

    executeEntry(entryId, executionData) {
      return connector.post(`/entries/${entryId}/execute`, executionData, headers);
    },

    revertEntry(entryId) {
      return connector.delete(`/entries/${entryId}/reverse`, headers);
    },

    fetchEntry(entryId) {
      return connector.get(`/entries/${entryId}`, headers);
    },

    fetchEntryByCode(entryCode) {
      return connector.get(`/entries/search-code/${entryCode}`, headers);
    },

    fetchEntriesByAccount(accountId, pagination = null) {
      let config = { ...headers };

      if (pagination !== null) {
        config = { ...config, params: { ...config.params, ...pagination } };
      }

      return connector.get(`/entries/accounts/${accountId}`, config);
    }
  };
}
