const express = require('express');
const { Worker } = require('worker_threads');
const THREAD_COUNT = 5;

const app = express();

app.get('/non-block/', (req, res) => {
  res.status(200).send('Non block');
});

function createWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./five-workers.js', {
      workerData: { thread_count: THREAD_COUNT },
    });

    worker.on('message', (data) => {
      resolve(data);
    });

    worker.on('erorr', (error) => {
      reject(error);
    });
  });
}

app.get('/block', async (req, res) => {
  const workerPromises = [];

  for (let i = 0; i < THREAD_COUNT; i++) {
    workerPromises.push(createWorker());
  }

  const tread_results = await Promise.all(workerPromises);
  const total =
    tread_results[0] +
    tread_results[1] +
    tread_results[2] +
    tread_results[3] +
    tread_results[4];

  res.status(200).send(`result ${total}`);
});

app.listen(3000);
