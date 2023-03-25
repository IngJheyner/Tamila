module.exports = {
  calculadora: (n1, n2) => {
    return `El resultado de ${n1} + ${n2} = ${parseInt(n1) + parseInt(n2)}`;
  },

  shortDescription: (value) => {
    return value.substring(0, 150);
  },

  formatNumber: (number) => {
    return new Intl.NumberFormat().format(number);
  }
}