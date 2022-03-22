const validationSchema = {
  budgetCategoryId: [{
    required: true,
    message: 'Please, select the budget category',
    trigger: 'blur',
  }],
  accountId: [{
    required: true,
    message: 'Please, select the account',
    trigger: 'blur',
  }],
  paymentTypeId: [{
    required: true,
    message: 'Please, select the payment type',
    trigger: 'blur',
  }],
  grossValue: [{
    required: true,
    message: 'Please, input the gross value',
    trigger: 'blur',
  }, {
    type: 'number',
    min: 1,
    message: 'Must be greater than zero',
    trigger: 'blur',
  }],
};

export default validationSchema;
