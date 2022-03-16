const validationSchema = {
  code: [{
    required: true,
    message: 'Please, input the code',
    trigger: 'blur',
  }, {
    min: 2,
    message: 'Must have at least 2 characters',
    trigger: 'blur',
  }],
  name: [{
    required: true,
    message: 'Please, input the name',
    trigger: 'blur',
  }],
};

export default validationSchema;
