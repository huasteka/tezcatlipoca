const validationSchema = {
  code: [{
    required: true,
    message: 'Please, input the code',
    trigger: 'blur',
  }, {
    min: 2,
    message: 'Must have at least 2 characters',
    trigger: 'blur',
  }, {
    max: 5,
    message: 'Must have less than 5 characters',
    trigger: 'blur',
  }],
  name: [{
    required: true,
    message: 'Please, input the name',
    trigger: 'blur',
  }],
  input_measure_unit_id: [{
    required: true,
    message: 'Please, select an input measurement unit',
    trigger: 'blur',
  }],
  input_quantity: [{
    required: true,
    message: 'Please, input the quantity',
    trigger: 'blur',
  }, {
    type: 'number',
    min: 1,
    message: 'Must be greater than zero',
    trigger: 'blur',
  }],
  output_measure_unit_id: [{
    required: true,
    message: 'Please, select an output measurement unit',
    trigger: 'blur',
  }],
  output_quantity: [{
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
