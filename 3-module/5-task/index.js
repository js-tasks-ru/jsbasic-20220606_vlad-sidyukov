function getMinMax(str) {
  const arrNumber = str
    .split(' ')
    .filter(user => !Number.isNaN(Number(user)));

  const objMinMax = {};
  objMinMax.max = Math.max(...arrNumber);
  objMinMax.min = Math.min(...arrNumber);

  return objMinMax;
}
