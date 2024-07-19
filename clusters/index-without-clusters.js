import express from 'express';

const app = express();

app.get('/heavy', (req, res) => {
  let counter = 0;
  for (let i = 0; i < 50000000; i++) {
    counter++;
  }

  res.send(`result is ${counter}`);
});

app.listen(3000, () => {
  console.log(`worker pid=${process.pid}`);
});
