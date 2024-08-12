// const sleep = (msec) => {
//   const end = new Date().getTime() + msec;

//   while (new Date().getTime() < end);
// };

// const sleep2 = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

// (async () => {
//   console.log('Start sleep: ' + new Date().toISOString());
//   console.log('  Sleep about 3 sec');
//   await sleep2(3000);
//   console.log('After sleep: ' + new Date().toISOString());
// })();

// console.log('Start sleep: ' + new Date().toISOString());
// console.log('  Sleep about 3 sec');
// sleep(3000).then(() => {
//   console.log('After sleep: ' + new Date().toISOString());
// });
// const EventEmmiter = function () {
//   this.events = {};
// };

// EventEmmiter.prototype.on = function (name, fn) {
//   const event = this.events[name];
//   if (event) event.push(fn);
//   else this.events[name] = [fn];
// };

// EventEmmiter.prototype.emit = function (name, ...data) {
//   const event = this.events[name];

//   if (event)
//     event.forEach((fn) => {
//       fn(...data);
//     });
// };

// module.exports = EventEmmiter;

// const emitter = () => {
//   const events = {};

//   return {
//     on: (name, fn) => {
//       const event = events[name];
//       if (event) event.push(fn);
//       else events[name] = [fn];
//     },
//     emit: (name, ...data) => {
//       const event = events[name];

//       if (event)
//         event.forEach((fn) => {
//           fn(...data);
//         });
//     },
//   };
// };
// const ee = emitter();

// ee.on('event1', (data) => {
//   console.dir(data);
// });

// ee.emit('event1', { a: 5 });

// sync
// const sum = (a, b, callback) => callback(a + b);

// sum(5, 2, console.log.bind(null, 'sum(5,2) ='));

// const wrapasync =
//   (fn) =>
//   (...args) =>
//     setTimeout(() => fn(...args), Math.floor(Math.random() * 1000));

// ('use strict');

// Sequential calls and sequentian execution
// of 4 pseudo-asynchronous functions

// const readConfig = wrapasync((name, callback) => {
//   console.log('(1) config loaded: ' + name);
//   callback(null, { name });
// });

// readConfig('myConfig', (name) => {
//   console.log('name', name);
//   console.log('name');
// });

// const increment = (a) => {
//   console.log('data', a);
// };

// const a = (b, callback) => {
//   console.log('a', b);

//   callback(b + 2);
// };

// a(35, increment);

// const total = (items, callback) => {
//   let result = 0;

//   for (const item of items) {
//     if (item.price < 0) {
//       return callback(
//         new Error(`Item ${item.name} has a negative price of ${item.price}`),
//         null,
//       );
//     }
//     result += item.price;
//   }

//   callback(null, result);
// };

// const electronics = [
//   { name: 'Laptop', price: 1500 },
//   { name: 'Keyboard', price: -100 },
//   { name: 'HDMI cable', price: 10 },
// ];

// total(electronics, (err, money) => {
//   if (err) {
//     console.error(err.message);
//   } else {
//     console.log({ money });
//   }
// });

'use strict';

const total = (items, callback) => {
  let result = 0;
  let index = 0;

  const intervalId = setInterval(() => {
    const item = items[index];
    console.log({ check: { item } });

    if (item.price < 0) {
      clearInterval(intervalId);
      callback(new Error('Negative price is not allowed'), null);
      return;
    }

    result += item.price;
    index++;

    if (index === items.length) {
      clearInterval(intervalId);
      callback(null, result);
    }
  }, 1000);
};

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

// Running both totals in parallel
total(electronics, (error, money) => {
  if (error) console.error({ error });
  else console.log({ money });
});

total(electronics, (error, money) => {
  if (error) console.error({ error });
  else console.log({ money });
});
