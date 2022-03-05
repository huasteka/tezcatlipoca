export default {
  generateId(length = 8) {
    var available = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    var result = '';
    for (var i = 0; i < length; i++) {
      result += available.charAt(Math.floor(Math.random() * available.length));
    }

    return result;
  },
};
