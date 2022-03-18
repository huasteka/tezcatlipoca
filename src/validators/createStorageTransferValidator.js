const validationSchema = {
  from_storage_id: [{
    required: true,
    message: 'Please, select the source storage',
    trigger: 'blur',
  }],
  to_storage_id: [{
    required: true,
    message: 'Please, select the target storage',
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
