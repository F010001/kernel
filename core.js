// 'use strict';

// import * as fs from 'fs';
// import path from 'path';
// class Animal extends Object {
//   constructor() {
//     super();
//     this.name = 'sdasdas';
//   }

//   speak() {
//     console.log(this.name + ' издает звук');
//   }
// }

// const animal = new Animal('asd');

// console.dir(Object);
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

// const asyncConvert = (document: Buffer, format: string): Promise<Buffer> =>
//   new Promise((resolve, reject) => {
//     convert(document, format, undefined, (err, data) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(data);
//     });
//   });

// pdfBuf = await asyncConvert(buffer, '.pdf');

// const file = fs.readFile(
//   path.join(process.cwd(), 'core.sql'),
//   'hex',
//   (err, data) => {
//     if (err) {
//       console.error('Error reading file:', err);
//     } else {
//       console.log('data', data);
//     }
//   },
// );

// const sourceFilePath = path.join(process.cwd(), 'corejs.js');
// const destinationFilePath = path.join(process.cwd(), 'corejs_copy.js');

// // Создание потока чтения
// const readStream = fs.createReadStream(sourceFilePath, { encoding: 'binary' });

// // Создание потока записи
// const writeStream = fs.createWriteStream(destinationFilePath, {
//   encoding: 'binary',
// });

// // Перенаправление данных из потока чтения в поток записи
// readStream.pipe(writeStream);

// const sayLater = (text, when) => {
//   let task = () => console.log(text);
//   setTimeout(task, when);
// };

// sayLater('asdsa', 5000);

// function test(s) {
//   this.s2 = s;

//   const a = () => {
//     // this.s2 = 2;
//     console.log('s2', this.s2);
//   };

//   return a;
// }
// const a = new test('SAD')();
//   let value = 'test';

// function getFunc() {

//   let func = new Function('console.log(value)');

//   return func;
// }

// getFunc()();

// let person = {
//   name: 'John',
//   greet() {
//     console.log(`Hello, my name is ${this.name}`);
//   },
// };

// let greetFunc = person.greet.bind(person);

// greetFunc();

// let counter = {
//   count: 0,
//   increment() {
//     this.count++;
//     console.log(this.count);
//   },
// };

// // counter.increment(); // Что выведет в консоль?
// let incrementFunc = counter.increment.bind(counter);
// incrementFunc();
// let person = {
//   age: 25,
//   growOlder() {
//     setTimeout(() => {
//       this.age++;
//       console.log(this.age);
//     }, 1000);
//   },
// };

// person.growOlder();

// let user = {
//   name: 'Alice',
//   sayHello() {
//     console.log('this', this);
//     console.log(`Hello, ${this.name}`);
//   },
// };

// // global.setTimeout(user.sayHello, 2000);

// const a = user.sayHello;
// a();

// let obj = {
//   value: 10,
//   incr: function () {
//     console.log(this);
//     const a = () => {
//       console.log('this', this);
//     };
//     a();
//   },
// };
// undefined;
// obj;
// obj.incr(); // Что выведет в консоль? Почему? Как исправить?

// let calculator = {
//   value: 0,
//   add: (num) => {
//     this.value += num;
//     console.log(this.value);
//   },
// };

// calculator.add(5); // Что выведет в консоль? Почему?

// let person = {
//   name: 'Jane',
//   regularFunc: function () {
//     console.log(`Regular function: ${this.name}`);
//   },
//   arrowFunc: () => {
//     console.log(`Arrow function: ${this}`);
//   },
// };

// person.regularFunc(); // Что выведет в консоль?
// person.arrowFunc(); // Что выведет в консоль?

// let car = {
//   speed: 0,
//   accelerate() {
//     console.log('this', this, (this.speed += 10));
//     this.speed += 10;
//     console.log(this.speed);
//   },
// };

// let accelerateFunc = car.accelerate;
// setTimeout(accelerateFunc, 1000); // Что выведет в консоль? Как исправить?

// let team = {
//   members: ['Alice', 'Bob', 'Charlie'],
//   getMember(index) {
//     return () => {
//       console.log('this', this);
//       console.log(this.members[index]);
//     };
//   },
// };

// let getFirstMember = team.getMember(0);
// getFirstMember(); // Что выведет в консоль? Почему? Как исправить?

// let book = {
//   title: 'JavaScript: The Good Parts',
//   printTitle() {
//     console.log(this.title);
//   },
// };

// setTimeout(book.printTitle.bind(book), 1000);

// function createCounter() {
//   let count = 0;
//   return function () {
//     count++;
//     console.log(count);
//   };
// }

// let counter = createCounter();
// counter(); // Что выведет в консоль?
// counter(); // Что выведет в консоль?

// function createArrowCounter() {
//   let count = 0;
//   return () => {
//     count++;
//     console.log(count);
//   };
// }

// let arrowCounter = createArrowCounter();
// arrowCounter(); // Что выведет в консоль?
// arrowCounter(); // Что выведет в консоль?

// function createPrivateCounter() {
//   let count = 0;

//   const increment = () => {
//     count++;
//     console.log(count);
//   };

//   const getCount = () => {
//     console.log(count);
//   };
//   return {
//     increment,
//     getCount,
//   };
// }

// let privateCounter = createPrivateCounter();
// privateCounter.increment(); // Что выведет в консоль?
// privateCounter.getCount();

// function createClickHandler() {
//   let clickCount = 0;
//   return () => {
//     clickCount++;
//     console.log(`Button clicked ${clickCount} times`);
//   };
// }

// let clickHandler = createClickHandler();
// // Представьте, что этот обработчик назначается на кнопку:
// // document.querySelector('button').addEventListener('click', clickHandler);
// clickHandler(); // Что выведет в консоль?
// clickHandler(); // Что выведет в консоль?

// function createTimers() {
//   for (let i = 1; i <= 3; i++) {
//     setTimeout(function () {
//       console.log(i);
//     }, i * 1000);
//   }
// }

// createTimers(); // Что выведет в консоль через 1, 2, и 3 секунды? Почему? Как исправить?

// function createMultiplier(multiplier) {
//   return function (num) {
//     return num * multiplier;
//   };
// }

// let double = createMultiplier(2);
// console.log(double(5)); // Что выведет в консоль?
// console.log(double(10)); // Что выведет в консоль?

// function regularFunction() {
//   console.log(arguments);
// }

// let arrowFunction = () => {
//   console.log(arguments);
// };

// regularFunction(1, 2, 3); // Что выведет в консоль?
// arrowFunction(1, 2, 3); // Что выведет в консоль? Почему?

// function createAsyncTracker() {
//   let count = 0;
//   return function () {
//     count++;
//     setTimeout(() => {
//       console.log(`Async operation ${count} completed`);
//     }, 1000);
//   };
// }

// let asyncTracker = createAsyncTracker();

// asyncTracker(); // Что выведет в консоль через 1 секунду?
// asyncTracker(); // Что выведет в консоль через 1 секунду?

// function startCounting() {
//   let count = 0;
//   let intervalId = setInterval(() => {
//     count++;
//     console.log(count);
//     if (count >= 5) {
//       clearInterval(intervalId);
//     }
//   }, 1000);
// }

// startCounting(); // Что выведет в консоль каждая итерация?

// let user = {
//   name: 'John',
//   surname: 'Smith',

//   set fullName(value) {
//     [this.name, this.surname] = value.split(' ');
//   },

//   get fullName() {
//     console.log(`${this.name} ${this.surname}`);
//   },
// };

// const a = user.fullName;

// let user2 = {
//   name: 'Alice',
//   sayHello() {
//     console.log('this', this);
//     console.log(`Hello, ${this.name}`);
//   },
// };

// const a = user.sayHello;
// a();

// console.log(Object.getOwnPropertyName()); // Примерный вывод:
// ["length", "name", "prototype", "from", "isArray", "of", ...]

// const arr = [1232132, 12,323]

// arr.asd = 23

// console.log(Object.getPrototypeOf(arr));

// const buf = Buffer.from('hello world', 'utf8');

// console.log(buf.toString('hex'));

// console.log(Buffer.from('fhqwhgads', 'utf8'));
// // Prints: <Buffer 66 68 71 77 68 67 61 64 73>

// const fs = require('fs');

// console.log('Start');

// // Блокирующий коллбэк
// setTimeout(() => {
//   console.log('Long running task started');
//   // Долгий цикл
//   for (let i = 0; i < 1e9; i++) {
//     /* Долгое выполнение */
//   }
//   console.log('Long running task finished');
// }, 0);

// // Асинхронное чтение файла
// fs.readFile(__filename, (err, data) => {
//   if (err) throw err;
//   console.log('File read callback executed');
// });

// console.log('End');
// var x = 10;
// function outer() {
//   var x = 20;
//   function inner() {
//     x++;
//     var x = 30;
//     console.log(x);
//   }
//   inner();
// }
// outer();

// const obj = {
//   name: 'Alice',
//   greet: function () {
//     console.log(`Hello, ${this.name}!`);
//     (function () {
//       console.log(`Hello again, ${this.name}!`);
//     })();
//   },
// };
// obj.greet();

// async function asyncFunc() {
//   console.log('Async Function Start');
//   new Promise((resolve) => setTimeout(resolve, 1000));
//   const prInst = new Promise((resolve) => setTimeout(resolve, 1000));
//   console.log('Async Function End');
// }
// console.log('Start');
// asyncFunc();
// console.log('End');

// async function firstAsync() {
//   console.log('First Async Start');
//   await secondAsync();
//   console.log('First Async End');
// }
// async function secondAsync() {
//   console.log('Second Async');
// }
// console.log('Start');
// firstAsync();
// console.log('End');

async function asyncFunc1() {
  await asyncFunc2();
}

async function asyncFunc2() {
  console.log('1', 1);

  await asyncFunc3();
}

async function asyncFunc3() {
  await asyncFunc4();
  console.log('1', 2);
}

async function asyncFunc4() {
  console.log('1', 3);
}
asyncFunc1();

console.log('Main End');

// async function asyncFunc1() {
//   console.log('Async 1 Start');
//   await asyncFunc2();
//   console.log('Async 1 End');
// }

// async function asyncFunc2() {
//   console.log('Async 2');
// }

// asyncFunc1().then(() => {
//   console.log('Promise Resolved');
// });

// console.log('Main End');

// console.log('Start');

// setTimeout(() => {
//   console.log('Timeout 1');
// }, 1000);

// setTimeout(() => {
//   console.log('Timeout 2');
// }, 0);

// Promise.resolve()
//   .then(() => {
//     console.log('Promise 1');
//   })
//   .then(() => {
//     console.log('Promise 2');
//   });

// console.log('End');

// console.log('Start');

// await Promise.resolve()
//   .then(() => {
//     console.log('Promise 1');
//     return Promise.resolve('Promise 2');
//   })
//   .then((message) => {
//     console.log(message);
//   });

// await Promise.resolve().then(() => {
//   console.log('Promise 3');
// });

// console.log('End');
