const validationSchema = {
  password: [{
    required: true,
    message: 'Please, input the password',
    trigger: 'blur',
  }, {
    min: 6,
    message: 'Must have at least 6 characters',
    trigger: 'blur',
  }],
  passwordConfirmation: [{
    required: true,
    message: 'Please, input the password confirmation',
    trigger: 'blur',
  }],
};

export default validationSchema;
