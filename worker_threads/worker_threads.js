import { Worker } from 'node:worker_threads';
import * as os from 'node:os';
import * as http from 'node:http';

const port = 8000;
const cpus = os.cpus.length;

const requestHandler = (req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Done!');
    } else if (req.url === '/fat-fetch') {
      const worker = new Worker('./worker.js');
      const sharedArrayBuffer = new SharedArrayBuffer(16);
      const dataview = new Int8Array(sharedArrayBuffer, 0, 16);
      worker.postMessage(dataview);

      console.log('In Parent After Sharing' + dataview);

      worker.on('message', (result) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(result);
      });

      worker.on('error', (err) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          console.log('Error');
        }
      });
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
};

const server = http.createServer(requestHandler);

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
