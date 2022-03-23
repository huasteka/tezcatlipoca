export const merchandiseValidationSchema = {
  retail_price: [{
    required: true,
    message: 'Please, input the retail price',
    trigger: 'blur',
  }, {
    type: 'number',
    min: 1,
    message: 'Must be greater than zero',
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
};

export const selectProductValidationSchema = {
  product_id: [{
    required: true,
    message: 'Please, select a product',
    trigger: 'blur',
  }],
};

export const createProductValidationSchema = {
  code: [{
    required: true,
    message: 'Please, input the product code',
    trigger: 'blur',
  }, {
    min: 2,
    message: 'Must have at least 2 characters',
    trigger: 'blur',
  }],
  name: [{
    required: true,
    message: 'Please, input the product name',
    trigger: 'blur',
  }],
};
