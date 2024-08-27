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
    this.waitTimeout = Infinity;
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
    this.waiting.push({ ...task, start: Date.now() });
  }

  next(task) {
    this.count++;
    this.onProcess(task, this.finish.bind(this));
  }

  nextWait(task) {
    this.count++;

    if (Date.now() - task.start > this.waitTimeout) {
      this.onProcess(new Error(`${task.name}`), this.finish.bind(this));
    } else {
      this.onProcess(task, this.finish.bind(this));
    }
  }

  finish(err, result) {
    if (result instanceof Error) {
      if (this.onFailure) this.onFailure(result);
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

  timeout(msc) {
    this.waitTimeout = msc;
    return this;
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

  priority(flag = true) {
    this.priorityMode = flag;
    return this;
  }
}

const queue = Queue.channels(3)
  .timeout(3000)
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
  queue.add({ name: `Task${i}`, interval: 1000 });
}
