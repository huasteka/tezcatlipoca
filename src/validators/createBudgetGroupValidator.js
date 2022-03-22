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
};

export default validationSchema;
