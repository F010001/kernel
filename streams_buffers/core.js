import { createReadStream } from 'fs';
// Создаем поток для чтения файла
const readStream = createReadStream('asdasddasdasdasdasdasdassds', {
  encoding: 'utf8',
});
// Обработка данных по частям
readStream.on('data', (chunk) => {
  console.log(`Получен кусок данных: ${chunk}`);
});

// Событие окончания чтения файла
readStream.on('end', () => {
  console.log('Чтение файла завершено.');
});

// Обработка ошибок
readStream.on('error', (err) => {
  console.error(`Ошибка при чтении файла: ${err.message}`);
});
