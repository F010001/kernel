class Animal extends Object {
  constructor() {
    super();
    this.name = 'sdasdas';
  }

  speak() {
    console.log(this.name + ' издает звук');
  }
}

const animal = new Animal('asd');

console.dir(Object);
// // class Dog extends Animal {
// //   constructor(name, breed) {
// //     super(name);
// //     this.name = name;
// //     this.breed = breed;
// //   }

// //   bark() {
// //     console.log(this.name + ' лает');
// //   }
// // }

// // const dog = new Dog('Шарик', 'лабрадор');

// // animal.speak(); // Выводит "Шарикadasdsa издает звук"
// // dog.bark(); // Выводит "Шарикadasdsa лает"

// const user = {
//   name: 'Вася',
//   sayHi: function () {
//     console.log(this.name);
//   },
// };

// const user1 = {
//   name: 'Вася1',
//   sayHi: function () {
//     console.log(this.name);
//   },
// };

// const user2 = {
//   name: '2Вася1',
//   sayHi: function () {
//     console.log(this.name);
//   },
// };

// // bind()
// const boundSayHi = user.sayHi.bind(user1); // Создает новую функцию с контекстом user
// boundSayHi(); // Выводит 'Вася'

// // call()
// user.sayHi.call(user2, 'Привет!'); // Вызывает функцию с контекстом user и аргументом 'Привет!'
// // Выводит 'Привет!' (this будет ссылаться на user)

// // apply()
// user.sayHi.apply(user, ['Привет!', 'Всем!']); // Вызывает функцию с контекстом user и аргументами ['Привет!', 'Всем!']
// // Выводит 'Привет!' (this будет ссылаться на user)

// const Text = function (s) {
//   this.value = s;
// };

// Text.prototype.line = function (a) {
//   this.value += '\n' + a;
//   return this;
// };

// Text.prototype.toString = function () {
//   return this.value;
// };

// // Usage

// const txt = new Text('line1')
//   .line('line2')
//   .line('line3')
//   .line('line4')
//   .toString();

// console.log(`${txt}`);

// const compose = (f, g) => (x) => f(g(x));

// // Usage

// const upperFirst = (word) => word.charAt(0).toUpperCase() + word.slice(1);
// const upperCapital = (s) => s.split(' ').map(upperFirst).join(' ');
// const lower = (s) => s.toLowerCase();

// const capitalize = compose(upperCapital, lower);

// const s = 'MARCUS AURELIUS';
// console.log(s);
// console.log(`lower('${s}') = '${lower(s)}'`);
// console.log(`upperCapital('${s}') = '${upperCapital(s)}'`);
// console.log(`capitalize('${s}') = '${capitalize(s)}'`);

// const compose =
//   (f, g) =>
//   (...args) =>
//     f(g(...args));
// const pipe =
//   (f, g) =>
//   (...args) =>
//     g(f(...args));

// Usage

// const upperFirst = (word) => word.charAt(0).toUpperCase() + word.slice(1);
// const upperCapital = (s) => s.split(' ').map(upperFirst).join(' ');
// const lower = (s) => s.toLowerCase();

// const s = 'MARCUS AURELIUS';
// console.log(s);
// console.log(`lower('${s}') = '${lower(s)}'`);
// console.log(`upperCapital('${s}') = '${upperCapital(s)}'`);

// {
//   console.log('Use compose');
//   const capitalize = compose(upperCapital, lower);
//   console.log(`capitalize('${s}') = '${capitalize(s)}'`);
// }
// {
//   console.log('Use pipe');
//   const capitalize = pipe(upperCapital, lower);
//   console.log(`capitalize('${s}') = '${capitalize(s)}'`);
// }

// const compose =
//   (...fns) =>
//   (x) =>
//     fns.reduceRight((v, f) => f(v), x);
// const pipe =
//   (...fns) =>
//   (x) =>
//     fns.reduce((v, f) => f(v), x);

// // Usage

// const upperFirst = (word) => word.charAt(0).toUpperCase() + word.slice(1);
// const upperCapital = (s) => s.split(' ').map(upperFirst).join(' ');
// const lower = (s) => s.toLowerCase();
// const trim = (s) => s.trim();

// const s = '   MARCUS AURELIUS   ';
// console.log(s);
// console.log(`lower('${s}') = '${lower(s)}'`);
// console.log(`upperCapital('${s}') = '${upperCapital(s)}'`);

// {
//   console.log('Use compose');
//   const capitalize = compose(upperCapital, lower, trim);
//   console.log(`capitalize('${s}') = '${capitalize(s)}'`);
// }

// const wrap = (f) => {
//   console.log('Wrap function:', f.name);
//   return (...args) => {
//     console.log('Called wrapper for:', f.name);
//     console.dir({ args });
//     const result = f(...args);
//     console.log('Ended wrapper for:', f.name);
//     console.dir({ result });
//     return result;
//   };
// };

// // Usage

// const func = (par1, par2) => {
//   console.dir({ par1, par2 });
//   return [par1, par2];
// };

// func('Uno', 'Due');
// const wrapped = wrap(func);
// wrapped('Tre', 'Quatro');
