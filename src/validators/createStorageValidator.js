const validationSchema = {
  code: [{
    required: true,
    message: 'Please, input the code',
    trigger: 'blur',
  }],
  name: [{
    required: true,
    message: 'Please, input the name',
    trigger: 'blur',
  }],
};

export default validationSchema;
