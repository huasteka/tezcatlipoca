const validationSchema = {
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
  }],
};

export default validationSchema;
