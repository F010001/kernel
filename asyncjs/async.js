// 'use strict';

// // const sleep = (msec) => {
// //   const end = new Date().getTime() + msec;

// //   while (new Date().getTime() < end);
// // };

// // const sleep2 = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

// // (async () => {
// //   console.log('Start sleep: ' + new Date().toISOString());
// //   console.log('  Sleep about 3 sec');
// //   await sleep2(3000);
// //   console.log('After sleep: ' + new Date().toISOString());
// // })();

// // console.log('Start sleep: ' + new Date().toISOString());
// // console.log('  Sleep about 3 sec');
// // sleep(3000).then(() => {
// //   console.log('After sleep: ' + new Date().toISOString());
// // });
// // const EventEmmiter = function () {
// //   this.events = {};
// // };

// // EventEmmiter.prototype.on = function (name, fn) {
// //   const event = this.events[name];
// //   if (event) event.push(fn);
// //   else this.events[name] = [fn];
// // };

// // EventEmmiter.prototype.emit = function (name, ...data) {
// //   const event = this.events[name];

// //   if (event)
// //     event.forEach((fn) => {
// //       fn(...data);
// //     });
// // };

// // module.exports = EventEmmiter;

// // const emitter = () => {
// //   const events = {};

// //   return {
// //     on: (name, fn) => {
// //       const event = events[name];
// //       if (event) event.push(fn);
// //       else events[name] = [fn];
// //     },
// //     emit: (name, ...data) => {
// //       const event = events[name];

// //       if (event)
// //         event.forEach((fn) => {
// //           fn(...data);
// //         });
// //     },
// //   };
// // };
// // const ee = emitter();

// // ee.on('event1', (data) => {
// //   console.dir(data);
// // });

// // ee.emit('event1', { a: 5 });

// // sync
// // const sum = (a, b, callback) => callback(a + b);

// // sum(5, 2, console.log.bind(null, 'sum(5,2) ='));

// // const wrapasync =
// //   (fn) =>
// //   (...args) =>
// //     setTimeout(() => fn(...args), Math.floor(Math.random() * 1000));

// // ('use strict');

// // Sequential calls and sequentian execution
// // of 4 pseudo-asynchronous functions

// // const readConfig = wrapasync((name, callback) => {
// //   console.log('(1) config loaded: ' + name);
// //   callback(null, { name });
// // });

// // readConfig('myConfig', (name) => {
// //   console.log('name', name);
// //   console.log('name');
// // });

// // const increment = (a) => {
// //   console.log('data', a);
// // };

// // const a = (b, callback) => {
// //   console.log('a', b);

// //   callback(b + 2);
// // };

// // a(35, increment);

// // const total = (items, callback) => {
// //   let result = 0;

// //   for (const item of items) {
// //     if (item.price < 0) {
// //       return callback(
// //         new Error(`Item ${item.name} has a negative price of ${item.price}`),
// //         null,
// //       );
// //     }
// //     result += item.price;
// //   }

// //   callback(null, result);
// // };

// // const electronics = [
// //   { name: 'Laptop', price: 1500 },
// //   { name: 'Keyboard', price: -100 },
// //   { name: 'HDMI cable', price: 10 },
// // ];

// // total(electronics, (err, money) => {
// //   if (err) {
// //     console.error(err.message);
// //   } else {
// //     console.log({ money });
// //   }
// // });

// // 'use strict';

// // const total = (items, callback) => {
// //   let result = 0;
// //   let index = 0;

// //   const intervalId = setInterval(() => {
// //     const item = items[index];
// //     console.log({ check: { item } });

// //     if (item.price < 0) {
// //       clearInterval(intervalId);
// //       callback(new Error('Negative price is not allowed'), null);
// //       return;
// //     }

// //     result += item.price;
// //     index++;

// //     if (index === items.length) {
// //       clearInterval(intervalId);
// //       callback(null, result);
// //     }
// //   }, 1000);
// // };

// // const electronics = [
// //   { name: 'Laptop', price: 1500 },
// //   { name: 'Keyboard', price: 100 },
// //   { name: 'HDMI cable', price: 10 },
// // ];

// // // Running both totals in parallel
// // total(electronics, (error, money) => {
// //   if (error) console.error({ error });
// //   else console.log({ money });
// // });

// // total(electronics, (error, money) => {
// //   if (error) console.error({ error });
// //   else console.log({ money });
// // });

// // 'use strict';

// // // Task: prevent termination on error and fix code
// // // to prevent withdraw more than given limit
// // // Add 'buy' event handler
// // // Add 'done' event handler and emit it after iteration

// // 'use strict';

// // const EventEmitter = require('node:events');

// // class Purchase extends EventEmitter {
// //   constructor({ limit }) {
// //     super();
// //     this.items = [];
// //     this.total = 0;
// //     this.limit = limit;

// //     // Обработка события 'add'
// //     this.on('add', (item) => {
// //       const newTotal = this.total + item.price;

// //       // Проверка превышения лимита
// //       if (newTotal > this.limit) {
// //         this.emit('error', new Error('Limit reached'));
// //         return;
// //       }

// //       this.total = newTotal;
// //       this.items.push(item);

// //       // Эмитируем событие 'buy' после добавления товара
// //       this.emit('buy', item);
// //     });

// //     // Обработка ошибки
// //     this.on('error', (err) => {
// //       console.error('Error:', err.message);
// //     });
// //   }
// // }

// // const wallet = { money: 1600 };
// // console.log({ wallet });

// // const purchase = new Purchase({ limit: wallet.money });

// // // Обработка события 'buy'
// // purchase.on('buy', (item) => {
// //   wallet.money -= item.price;
// //   console.log(`Bought: ${item.name} for $${item.price}`);
// //   console.log({ wallet });
// // });

// // // Добавление обработчика завершения покупок
// // purchase.on('done', () => {
// //   console.log('All purchases processed.');
// //   console.log({ wallet });
// // });

// // const electronics = [
// //   { name: 'Laptop', price: 1500 },
// //   { name: 'Keyboard', price: 100 },
// //   { name: 'HDMI cable', price: 10 },
// // ];

// // // Итерируем по товарам и испускаем событие 'add'
// // for (const item of electronics) {
// //   purchase.emit('add', item);
// // }

// // // Эмитируем событие 'done' после завершения итерации
// // purchase.emit('done');

// 'use strict';

// // Task: capture error 'Negative price'
// // Hint: use EventEmitter { captureRejections: true }

// // const EventEmitter = require('node:events');

// // const purchase = new EventEmitter({});

// // const electronics = [
// //   { name: 'Laptop', price: 1500 },
// //   { name: 'Keyboard', price: -100 },
// //   { name: 'HDMI cable', price: 10 },
// // ];

// // purchase.on('add', async (item) => {
// //   console.log({ item });
// //   if (item.price < 0) {
// //     purchase.emit('error', new Error(`Negative price for ${item.name}`));
// //   }
// // });

// // purchase.on('error', (err) => {
// //   console.error(err);
// // });

// // for (const item of electronics) {
// // purchase.emit('add', item);
// // }

// // const a = {
// //   ad: 23,
// //   asd: 25,
// // };

// // a[Symbol.iterator] = function () {
// //   const keys = Object.keys(this); // Получаем ключи объекта
// //   let index = 0;

// //   return {
// //     next: () => {
// //       if (index < keys.length) {
// //         const key = keys[index++];
// //         return { value: this[key], done: false };
// //       } else {
// //         return { done: true };
// //       }
// //     },
// //   };
// // };

// // // Теперь можно итерировать по объекту a
// // // for (const value of a) {
// // //   console.log(value); // Выведет 23, затем 25
// // // }
// // // for (let i = 0; i < 2; i++) {
// // //   const element = a[i];

// // //   console.log('element', element);
// // // }

// // for (const el of a) {
// //   console.log(el);
// // }

// // 'use strict';

// // const { EventEmitter, on } = require('node:events');

// // const purchase = new EventEmitter();

// // const electronics = [
// //   { name: 'Laptop', price: 1500 },
// //   { name: 'Keyboard', price: 100 },
// //   { name: 'HDMI cable', price: 10 },
// // ];

// // // Создаем асинхронную функцию для обработки событий
// // async function processPurchases() {
// //   const iterator = on(purchase, 'add'); // Получаем асинхронный итератор для события 'add'

// //   for await (const [item] of iterator) {
// //     // Используем for await...of для обработки каждого события
// //     console.log('Purchased item:', item);
// //   }
// // }

// // // Запускаем асинхронную функцию
// // processPurchases();

// // for (const item of electronics) {
// //   purchase.emit('add', item); // Генерируем событие 'add' для каждого элемента
// // }

// // 'use strict';

// // // Task: why do we receive array in array as a `result`?
// // // Fix code to receive single array in `result`.
// // // Compare `events.once` with `EventEmitter.prototype.once`
// // // and swap them in the following example:

// // const { EventEmitter, once } = require('node:events');

// // const application = new EventEmitter();

// // const electronics = [
// //   { name: 'Laptop', price: 1500 },
// //   { name: 'Keyboard', price: 100 },
// //   { name: 'HDMI cable', price: 10 },
// // ];

// // application.on('buy', (items) => {
// //   if (!Array.isArray(items)) {
// //     application.emit('error', new Error('Array expected'));
// //   } else {
// //     application.emit('purchase', items);
// //   }
// // });

// // (async () => {
// //   const [result] = await once(application, 'purchase');
// //   console.log(result);
// // })();

// // application.once('error', console.error).emit('buy', electronics);

// // const application = new EventEmitter();

// // const electronics = [
// //   { name: 'Laptop', price: 1500 },
// //   { name: 'Keyboard', price: 100 },
// //   { name: 'HDMI cable', price: 10 },
// // ];

// // application.on('buy', (items) => {
// //   if (!Array.isArray(items)) {
// //     application.emit('error', new Error('Array expected'));
// //   } else {
// //     application.emit('purchase', items);
// //   }
// // });

// // application.once('purchase', (result) => {
// //   console.log(result); // Здесь result уже будет массивом, как передано в emit
// // });

// // application.once('error', console.error).emit('buy', electronics);

// // const { EventEmitter, once } = require('node:events');

// // const emitter = new EventEmitter();

// // (async () => {
// //   const res = await once(emitter, 'name');
// //   console.log(res);
// // })();

// // emitter.emit('name', { a: 4 }, { a: 5 }, { a: 6 });

// // const promise = new Promise((resolve, reject) => {
// //   setTimeout(() => {
// //     resolve(1);
// //   }, 1000);
// // });

// // console.log('promise', promise);

// // promise.then(console.log);

// // const fs = require('node:fs');

// // const readConfig = (name, callback) => {
// //   setTimeout(() => {
// //     console.log('(1) config loaded: ' + name);
// //     callback(null, { name });
// //   }, 1000);
// // };

// // readConfig('myConfig', (err, data) => {
// //   console.log('data', data);
// // });

// // const readFile = (file, encoding) => {
// //   return new Promise((resolve, reject) => {
// //     fs.readFile(file, encoding, (err, data) => {
// //       if (err) reject(err);
// //       else resolve(data.toString());
// //     });
// //   });
// // };

// // readFile('./async.js', 'utf8').then(console.log);

// // const promisify =
// //   (fn) =>
// //   (...args) =>
// //     new Promise((resolve, reject) => {
// //       args.push((err, result) => {
// //         if (err) reject(err);
// //         else resolve(result);
// //       });

// //       console.log('args', args);
// //       fn(...args);
// //     });

// // const readFileAsync = promisify(fs.readFile);

// // readFileAsync('./async.js')
// //   .then((data) => {
// //     console.log(data.toString());
// //   })
// //   .catch((err) => {
// //     console.error(err);
// //   });

// const fs = require('node:fs');

// class Thenable {
//   constructor() {
//     this.next = null;
//     this.fn = null;
//   }

//   then(fn) {
//     this.fn = fn;
//     const next = new Thenable();
//     this.next = next;
//     return next;
//   }

//   resolve(value) {
//     const fn = this.fn;
//     if (fn) {
//       const next = fn(value);
//       if (next) {
//         next.then((value) => {
//           this.next.resolve(value);
//         });
//       }
//     }
//   }
// }

// // Usage

// const readFile = (filename) => {
//   const thenable = new Thenable();
//   fs.readFile(filename, 'utf8', (err, data) => {
//     if (err) throw err;
//     thenable.resolve(data);
//   });
//   return thenable;
// };

// // const a = readFile('./async.js').then((data) => console.log(1));

// // Task: change `iterate` contract from callbacks to Thenable

// // const electronics = [
// //   { name: 'Laptop', price: 1500 },
// //   { name: 'Keyboard', price: 100 },
// //   { name: 'HDMI cable', price: 10 },
// // ];

// // const iterate = (items) => {
// //   const thenable = new Thenable();
// //   let current = thenable;

// //   for (const item of items) {
// //     current = current.then(() => {
// //       console.log(item); // Обрабатываем и выводим item
// //       return item; // Возвращаем элемент, чтобы передать его дальше по цепочке
// //     });
// //   }

// //   // В самом конце возвращаем начальный thenable
// //   return thenable;
// // };

// // // Пример использования с await
// // (async () => {
// //   await iterate(electronics)
// //     .then(() => {
// //       console.log('All items processed');
// //     })
// //     .resolve(); // Запускаем цепочку
// // })();

// // Task: create Promise-returning adapter function `totalAsync`
// // Do not change function `total` contract, just call `total` from
// // `totalAsync` and convert contracts

// // Should not be changed

// const electronics = [
//   { name: 'Laptop', price: 1500 },
//   { name: 'Keyboard', price: 100 },
//   { name: 'HDMI cable', price: 10 },
// ];

// const total = (items, callback) => {
//   let result = 0;
//   for (const item of items) {
//     if (item.price < 0) {
//       callback(new Error('Negative price is not allowed'));
//       return;
//     }
//     result += item.price;
//   }
//   callback(null, result);
// };

// const total2 = (items) => {
//   return new Promise((resolve, reject) => {
//     let result = 0;

//     for (const item of items) {
//       if (item.price < 0) {
//         reject(new Error('Negative price is not allowed'));
//         return;
//       }
//       result += item.price;
//     }

//     resolve(result);
//   });
// };

// // total2(electronics).then(console.log);

// // const totalAsync = (items) => new Promise...

// const totalAsync = (items) => {
//   return new Promise((resolve, reject) => {
//     total(items, (error, result) => {
//       if (error) {
//         reject(error); // В случае ошибки Promise отклоняется
//       } else {
//         resolve(result); // В случае успеха Promise разрешается
//       }
//     });
//   });
// };

// // Пример использования totalAsync с использованием .then/.catch
// totalAsync(electronics)
//   .then((money) => {
//     console.log({ money });
//   })
//   .catch((error) => {
//     console.error({ error });
//   });

// // Task: change `iterate` contract from chainable callbacks
// // to Promise (chainable or you can call it with await syntax)

// const iterate = (items) => {
//   let index = 0;
//   const chain = {
//     next: (callback) => {
//       if (index < items.length) {
//         callback(items[index++]);
//       }
//       return chain;
//     },
//   };
//   return chain;
// };

// const iterate2 = (items) => {
//   let index = 0;

//   const chain = {
//     next: () =>
//       new Promise((fulfill) => {
//         if (index < items.length) {
//           return fulfill(items[index++]);
//         }
//       }),
//   };

//   return chain;
// };
// // // Use await syntax to get items
// // iterate(electronics)
// //   .next((item) => {
// //     console.log(item);
// //   })
// //   .next((item) => {
// //     console.log(item);
// //   })
// //   .next((item) => {
// //     console.log(item);
// //   });

// const total3 = async (items) => {
//   let result = 0;

//   for (const item of items) {
//     if (item.price < 0) {
//       throw new Error('Negative price is not allowed'); // Бросаем ошибку, если цена отрицательная
//     }
//     result += item.price;
//   }

//   return result; // Возвращаем итоговую сумму
// };

// class Basket {
//   #items = null;

//   constructor(items) {
//     this.#items = items;
//   }

//   async total() {
//     let result = 0;
//     for (const item of this.#items) {
//       if (item.price < 0) {
//         throw new Error('Negative price is not allowed');
//       }
//       result += item.price;
//     }
//     return result;
//   }
// }

// (async () => {
//   const basket = new Basket(electronics);

//   await basket.total();
// })();

// // Task: optimize `total` call with default value 0 (as in example)
// // to have one-line solution - 1 line instead of 5 lines
// // (call and default value in one line)

// // Do not change code before usage block

// // Usage block: change just following code

// (async () => {
//   try {
//     await total3(electronics).then(console.log);
//   } catch {}
// })();

// // const total = (items, callback) => {
// //   let result = 0;
// //   for (const item of items) {

// //      if (item.price < 0) {
// //        callback(new Error('negative'))
// //      }
// //     result += item.price;
// //   }
// //   return callback(null,result);
// // };

const { Readable, Writable } = require('stream');

// const myWritable = new Writable({
//   write(chunk, encoding, callback) {
//     console.log('Writing:', chunk.toString());
//     setTimeout(callback, 1000); // Симулируем задержку записи
//   },
// });

// myWritable.write('First chunk');
// myWritable.write('Second chunk');
// myWritable.write('Third chunk');

const readable = new Readable({
  read(size) {
    // Генерируем данные быстрее, чем их может обработать writable
    this.push('Some large data...'.repeat(1000));
  },
});

const writable = new Writable({
  write(chunk, encoding, callback) {
    console.log('Writing:', chunk.toString());
    setTimeout(callback, 1000); // Симулируем медленную запись
  },
});

readable.pipe(writable);

writable.on('drain', () => {
  console.log('Drain event: Resuming data flow');
});
