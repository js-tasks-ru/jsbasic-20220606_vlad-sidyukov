function truncate(str, maxlength) {
  if (str.length <= maxlength) {
    return str;
  }

  let newString = str.slice(0, maxlength - 1) + '…';

  return newString;
}

