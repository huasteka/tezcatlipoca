export default {
  format(numericValue) {
    const currencyFormatter = new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: 'BRL',
    });
    return currencyFormatter.format(numericValue);
  }
};
