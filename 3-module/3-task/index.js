function camelize(str) {
  return str
    .split('-')
    .map((str, index) => (index !== 0) ? str[0].toUpperCase() + str.slice(1) : str)
    .join('');
}
