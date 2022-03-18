const validationSchema = {
  storage_id: [{
    required: true,
    message: 'Please, select a storage',
    trigger: 'blur',
  }],
  item_id: [{
    required: true,
    message: 'Please, select an item',
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

export default validationSchema;
