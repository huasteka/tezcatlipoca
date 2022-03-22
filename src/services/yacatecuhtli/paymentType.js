export default function createService(connector, headers) {
  return {
    createPaymentType(paymentType) {
      return connector.post('/payment-types', paymentType, headers);
    },

    updatePaymentType(paymentType) {
      return connector.put(`/payment-types/${paymentType.id}`, paymentType, headers);
    },

    deletePaymentType(paymentTypeId) {
      return connector.delete(`/payment-types/${paymentTypeId}`, headers);
    },

    fetchPaymentType(paymentTypeId) {
      return connector.get(`/payment-types/${paymentTypeId}`, headers);
    },

    fetchPaymentTypeList(pagination = null) {
      let config = { ...headers };

      if (pagination !== null) {
        config = { ...config, params: { ...pagination } };
      }

      return connector.get('/payment-types', config);
    },
  }
}
