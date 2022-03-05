export default {
  read(raw) {
    return JSON.parse(raw);
  },

  write(value) {
    return JSON.stringify(value);
  },
};
