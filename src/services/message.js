import IdentityService from './identity';

export default {
  createSuccess(message, title = 'Success') {
    return { id: IdentityService.generateId(), type: 'success', title, message };
  },

  createWarning(message, title = 'Warning') {
    return { id: IdentityService.generateId(), type: 'warning', title, message };
  },

  createError(message, title = 'Error') {
    return { id: IdentityService.generateId(), type: 'error', title, message };
  },
};
