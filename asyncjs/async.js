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

const emitter = () => {
  const events = {};

  return {
    on: (name, fn) => {
      const event = events[name];
      if (event) event.push(fn);
      else events[name] = [fn];
    },
    emit: (name, ...data) => {
      const event = events[name];

      if (event)
        event.forEach((fn) => {
          fn(...data);
        });
    },
  };
};
const ee = emitter();

ee.on('event1', (data) => {
  console.dir(data);
});

ee.emit('event1', { a: 5 });
