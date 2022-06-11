function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }

  let factorial = n;
  
  for (let i = 1; i < n; i++) {
    factorial *= (n - i);
  }

  return factorial;
}
