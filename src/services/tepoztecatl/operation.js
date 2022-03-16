export default function createService(connector, headers) {
  return {
    createStockDeposit(operation) {
      return connector.post('/operations/stocks/deposit', { operation }, headers);
    },

    createStockWithdraw(operation) {
      return connector.post('/operations/stocks/withdraw', { operation }, headers);
    },

    createStockTransfer(transfer) {
      return connector.post('/operations/stocks/transfer', { transfer }, headers);
    },

    setStockMinimum({ stockId, minimumQuantity }) {
      const payload = { minimum_quantity: minimumQuantity };
      return connector.post(`/operations/stocks/${stockId}/set_minimum`, payload, headers);
    },

    fetchOperationHistory({ storageId }, pagination = null) {
      let config = { ...headers };

      if (storageId !== null && storageId !== '') {
        config = { ...config, storage_id: storageId };
      }

      if (pagination !== null) {
        config = { ...config, params: { ...pagination } };
      }

      return connector.get('/operations/stocks', config);
    }
  };
}
