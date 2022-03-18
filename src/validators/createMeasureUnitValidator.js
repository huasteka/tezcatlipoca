const validationSchema = {
  acronym: [{
    required: true,
    message: 'Please, input the acronym',
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
};

export default validationSchema;
