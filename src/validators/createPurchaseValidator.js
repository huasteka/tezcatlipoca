export const purchaseValidationSchema = {
  code: [{
    required: true,
    message: 'Please, input the purchase code',
    trigger: 'blur',
  }, {
    min: 2,
    message: 'Must have at least 2 characters',
    trigger: 'blur',
  }],
  gross_value: [{
    required: true,
    message: 'Please, input the gross value',
    trigger: 'blur',
  }, {
    type: 'number',
    min: 1,
    message: 'Must be greater than zero',
    trigger: 'blur',
  }],
  discount: [{
    required: true,
    message: 'Please, input the discount',
    trigger: 'blur',
  }, {
    type: 'number',
    min: 0,
    message: 'Must be greater or equal zero',
    trigger: 'blur',
  }],
  net_value: [{
    required: true,
    message: 'Please, input the net value',
    trigger: 'blur',
  }, {
    type: 'number',
    min: 1,
    message: 'Must be greater than zero',
    trigger: 'blur',
  }],
  merchandises: [{
    type: 'array',
    required: true,
    min: 1,
    message: 'Must inform at least one merchandise',
  }],
};

export const merchandiseValidationSchema = {
  supplier_id: [{
    required: true,
    message: 'Please, select a supplier',
    trigger: 'blur',
  }],
  merchandise_id: [{
    required: true,
    message: 'Please, select a merchandise',
    trigger: 'blur',
  }],
  purchase_price: [{
    required: true,
    message: 'Please, input the purchase price',
    trigger: 'blur',
  }, {
    type: 'number',
    min: 1,
    message: 'Must be greater than zero',
    trigger: 'blur',
  }],
  quantity: [{
    required: true,
    message: 'Please, input the quantity',
    trigger: 'blur',
  }, {
    type: 'number',
    min: 1,
    message: 'Must be greater than zero',
    trigger: 'blur',
  }],
};
