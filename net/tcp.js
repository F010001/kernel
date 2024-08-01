import * as net from 'net';

const tcp = net.createServer((socket) => {
  console.log('Сервер 1: Клиент подключен');
  socket.on('data', (data) => {
    console.log(`Сервер 1 получил данные: ${data.buffer}`);
    // Отправляем ответ
    socket.write('Ответ от Сервер 1');
  });
});

tcp.listen(8081, () => {
  console.log('Сервер 1 слушает на порту 8081');
});
