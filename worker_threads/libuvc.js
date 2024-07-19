const express = require('express');
const { Worker } = require('worker_threads');

const app = express();

app.get('/non-block/', (req, res) => {
  res.status(200).send('Non block');
});

app.get('/block', (req, res) => {
  const worker = new Worker('./worker.js');

  worker.on('message', (data) => {
    res.status(200).send(`result ${data}`);
  });

  worker.on('erorr', (error) => {
    res.status(200).send(`result ${error}`);
  });
});

app.listen(3000);
