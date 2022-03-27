export const clientValidationSchema = {
  name: [{
    required: true,
    message: 'Please, input the name',
    trigger: 'blur',
  }, {
    min: 3,
    message: 'Must have at least 3 characters',
    trigger: 'blur',
  }],
  legal_document_code: [{
    required: true,
    message: 'Please, input the legal document',
    trigger: 'blur',
  }]
};

export const contactValidationSchema = {
  phone: [{
    required: true,
    message: 'Please, input the phone',
    trigger: 'blur',
  }],
  address: [{
    required: true,
    message: 'Please, input the address',
    trigger: 'blur',
  }],
  postal_code: [{
    required: true,
    message: 'Please, input the postal code',
    trigger: 'blur',
  }],
  city: [{
    required: true,
    message: 'Please, input the city',
    trigger: 'blur',
  }],
  region: [{
    required: true,
    message: 'Please, input the state/province',
    trigger: 'blur',
  }],
  country: [{
    required: true,
    message: 'Please, input the country',
    trigger: 'blur',
  }],
};
