const validationSchema = {
  sourceAccountId: [{
    required: true,
    message: 'Please, select the origin account',
    trigger: 'blur',
  }],
  targetAccountId: [{
    required: true,
    message: 'Please, select the destination account',
    trigger: 'blur',
  }],
  paymentTypeId: [{
    required: true,
    message: 'Please, select the payment type',
    trigger: 'blur',
  }],
  amount: [{
    required: true,
    message: 'Please, input the amount to transfer',
    trigger: 'blur',
  }, {
    type: 'number',
    min: 1,
    message: 'Must be greater than zero',
    trigger: 'blur',
  }],
};

export default validationSchema;
