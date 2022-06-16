let calculator = {
  read(a, b) {
    this.a = a;
    this.b = b;
  },

  sum() {
    return Number(this.a) + Number(this.b);
  },
  
  mul() {
    return this.a * this.b;
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
