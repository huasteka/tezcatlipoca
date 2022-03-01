const validationSchema = {
  name: [{
    required: true,
    message: 'Please, input the name',
    trigger: 'blur',
  }],
  email: [{
    type: 'email',
    required: true,
    message: 'Please, input the email',
    trigger: 'blur',
  }],
  password: [{
    required: true,
    message: 'Please, input the password',
    trigger: 'blur',
  }, {
    min: 6,
    message: 'Must have at least 6 characters',
    trigger: 'blur',
  }],
};

export default validationSchema;
