import { parentPort } from 'node:worker_threads';

parentPort.on('message', (msg) => {
  console.log('In worker after Sharing' + msg);
});

let result = '';
for (let i = 0; i < 100000000000000; i++) {
  i++;
}

result = 'Done!';
parentPort.postMessage(result);
