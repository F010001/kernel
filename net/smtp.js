import { SMTPServer } from 'smtp-server';
import * as dns from 'dns';
import { createTransport } from 'nodemailer';
import { simpleParser } from 'mailparser';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);

let localTransporter = createTransport({
  host: 'localhost',
  port: 2525,
  tls: {
    rejectUnauthorized: false,
  },
});

let mailOptions = {
  from: 'osbios3301@gmail.com',
  to: 'faridkarmanov@gmail.com',
  subject: 'Тестовое письмо через локальный SMTP и Gmail',
  text: 'Привет, это тестовое письмо, отправленное через локальный SMTP и Gmail!',
  html: '<b>Привет, это тестовое письмо, отправленное через локальный SMTP и Gmail!</b>',
};

const smtp = new SMTPServer({
  authOptional: true,
  onData: async (stream, session, callback) => {
    try {
      const parsed = await simpleParser(stream);

      // Получение MX-записей для домена получателя
      const domain = parsed.to.value[0].address.split('@')[1];

      const mxRecords = await resolveMx(domain);
      if (mxRecords.length === 0) {
        throw new Error('Не удалось найти MX-записи для домена');
      }

      // Создание транспорта для отправки через внешний SMTP-сервер
      const externalTransporter = createTransport({
        host: mxRecords[0].exchange, // Используем первый MX-сервер
        port: 25, // Обычно это порт для SMTP
        secure: false, // Обычно для внешних SMTP-серверов не используется TLS по умолчанию
      });

      // Отправка письма на внешний SMTP-сервер
      await externalTransporter.sendMail({
        from: parsed.from.text,
        to: parsed.to.text,
        subject: parsed.subject,
        text: parsed.text,
        html: parsed.html,
      });

      console.log('Сообщение отправлено на внешний SMTP-сервер');
      callback(null, 'OK');
    } catch (err) {
      console.error('Ошибка при обработке письма:', err);
      callback(err);
    }
  },
});

smtp.listen(2525, () => {
  console.log('Локальный SMTP-сервер запущен на порту 2525');
});

localTransporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Ошибка при отправке через локальный SMTP:', error);
  }
  console.log('Сообщение отправлено через локальный SMTP:', info.messageId);
});
