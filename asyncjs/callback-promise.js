'use strict';

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: -100 },
  { name: 'HDMI cable', price: 10 },
];

const total = (items, callback) => {
  let result = 0;

  for (const item of items) {
    if (item.price < 0) {
      return callback(
        new Error(`Item ${item.name} has a negative price of ${item.price}`),
        null,
      );
    }
    result += item.price;
  }

  callback(null, result);
};

total(electronics, (err, money) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log({ money });
  }
});

class Thenable {
  next = null;

  then(onSuccess) {
    this.onSuccess = onSuccess;
    this.next = new Thenable();
    return this.next;
  }

  resolve(value) {
    if (!this.onSuccess) return;
    const next = this.onSuccess(value);
    if (!next) return;
    if (!next.then) return void this.next.resolve(next);
    next.then((value) => {
      this.next.resolve(value);
    });
  }
}

// Usage

const readFile = (filename) => {
  const thenable = new Thenable();
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw err;
    thenable.resolve(data);
  });
  return thenable;
};

readFile('1-contract.js')
  .then((data) => {
    console.dir({ file1: data.length });
    return readFile('2-usage.js');
  })
  .then((data) => {
    console.dir({ file2: data.length });
    return readFile('3-class.js');
  })
  .then((data) => {
    console.dir({ file3: data.length });
    return 'I will be printed by callback in the next then';
  })
  .then((data) => {
    console.dir({ text: data });
  })
  .then(() => {
    console.log('Will be never printed');
  });
