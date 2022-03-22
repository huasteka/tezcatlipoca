const validationSchema = {
  name: [{
    required: true,
    message: 'Please, input the name',
    trigger: 'blur',
  }, {
    min: 3,
    message: 'Must have at least 3 characters',
    trigger: 'blur',
  }],
  terms: [{
    type: 'object',
    fields: {
      stagedPayment: {
        type: 'boolean',
        required: true,
        message: 'Please, inform if payment is staged'
      },
      tax: {
        required: true,
        message: 'Please, input the tax',
        trigger: 'blur',
      },
      installmentQuantity: [{
        required: true,
        message: 'Please, input the installment quantity',
        trigger: 'blur',
      }, {
        type: 'number',
        min: 1,
        message: 'Must be greater than zero',
        trigger: 'blur',
      }],
      firstInstallmentTerm: {
        required: true,
        message: 'Please, input the first installment term',
        trigger: 'blur',
      },
      installmentTerm: {
        required: true,
        message: 'Please, input the installment periodicity',
        trigger: 'blur',
      }, 
    },
  }],
  paymentAccountId: [{
    required: true,
    message: 'Please, select a default payment account',
    trigger: 'blur',
  }],
};

export default validationSchema;
