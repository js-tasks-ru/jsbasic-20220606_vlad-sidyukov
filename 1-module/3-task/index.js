function ucFirst(str) {
  if (str) {
    let newString = str[0].toUpperCase() + str.slice(1);
    return newString;
  }
  return str;
}
