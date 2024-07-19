import os from 'os';
import cluster from 'cluster';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cpuCount = os.cpus().length - 6;

console.log(`cpu total is ${cpuCount}`);
console.log(`Primary pid=${process.pid}`);
cluster.setupPrimary({
  exec: __dirname + '/index-without-clusters.js',
});

for (let i = 0; i < cpuCount; i++) {
  cluster.fork();
}

cluster.on('exit', (worker, code, signal) => {
  console.log(`worker ${worker.process.pid} is died`);
  console.log(`up new worker`);
  cluster.fork();
});
