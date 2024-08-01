import * as net from 'net';

const tcp = net.createConnection({ port: 8081 }, () => {
  tcp.write('Hello, server!\n');
});
tcp.on('data', (data) => {
  console.log(`Сервер 2 получил данные от Сервер 1: ${data}`);
  tcp.end();
});

tcp.on('end', () => {
  console.log('Сервер 2 отключен от Сервер 1');
});
