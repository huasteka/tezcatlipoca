const validationSchema = {
  name: [{
    required: true,
    message: 'Please, input the name',
    trigger: 'blur',
  }],
};

export default validationSchema;
