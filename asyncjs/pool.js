'use strict';

class Pool {
  constructor() {
    this.items = [];
    this.free = [];
    this.available = 0;
    this.current = 0;
    this.size = 0;
  }

  add(item) {
    if (this.items.includes(item)) throw new Error('Already exist');
    this.size++;
    this.available++;
    this.items.push(item);
    this.free.push(true);
  }

  next() {
    if (this.available === 0) return null;
    let item = null;
    let free = false;
    do {
      item = this.items[this.current];
      free = this.free[this.current];
      console.log('this.current', this.current, item, free);
      this.current++;
    } while (!item || !free);
    if (this.current === this.size) this.current = 0;
    return item;
  }

  capture() {
    const item = this.next();
    if (!item) return null;
    const index = this.items.indexOf(item);
    this.free[index] = false;
    this.available--;
    return item;
  }

  release(item) {
    const index = this.items.indexOf(item);
    if (index < 0) throw new Error('Unknown element');
    if (this.free[index]) throw new Error('Element free');
    this.free[index] = true;
    this.available++;
  }
}

const pool = new Pool();
pool.add({ item: 1 });
pool.add({ item: 2 });
const last = { item: 3 };
pool.add(last);

for (let i = 0; i < 10; i++) {
  console.log(pool.capture());
  if (i === 5) pool.release(last);
}
