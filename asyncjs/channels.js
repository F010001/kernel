'use strict';

class Queue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.count = 0;
    this.waiting = [];
    this.onProcess = null;
    this.onSuccess = null;
    this.onFailure = null;
    this.onDrain = null;
  }

  static channels(concurrency) {
    return new Queue(concurrency);
  }

  add(task) {
    const hasChannel = this.count < this.concurrency;
    if (hasChannel) {
      this.next(task);
      return;
    }
    this.waiting.push({ task, start: Date.now() });
  }

  next(task) {
    this.count++;
    this.onProcess(task, this.finish.bind(this));
  }

  nextWait(task) {
    if (Date.now() - task.time > 2000) this.onFailure(task.name);
    this.onProcess(task, this.finish.bind(this));
  }

  finish(err, result) {
    if (err) {
      if (this.onFailure) this.onFailure(err);
    } else if (this.onSuccess) {
      this.onSuccess(result);
    }
    this.count--;
    if (this.waiting.length > 0) {
      const task = this.waiting.shift();
      this.nextWait(task);
      return;
    }
    if (this.count === 0 && this.onDrain) {
      this.onDrain();
    }
  }

  process(listener) {
    this.onProcess = listener;
    return this;
  }

  success(listener) {
    this.onSuccess = listener;
    return this;
  }

  failure(listener) {
    this.onFailure = listener;
    return this;
  }

  drain(listener) {
    this.onDrain = listener;
    return this;
  }
}

const queue = Queue.channels(3)
  .process((task, callback) => {
    setTimeout(callback, task.interval, null, task);
  })
  .success((res) => {
    const { count } = queue;
    const waiting = queue.waiting.length;
    console.log(`Done: ${res.name}, count:${count}, waiting: ${waiting}`);
  })
  .failure((err) => console.log(`Failure: ${err}`))
  .drain(() => console.log('Queue drain'));

for (let i = 0; i < 10; i++) {
  queue.add({ name: `Task${i}`, interval: i * 1000 });
}
