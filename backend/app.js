require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundError');
const {
  signUp, signIn,
} = require('./middlewares/validations');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors({
  origin: ['http://verachernushina.mesto.nomoredomains.work', 'https://verachernushina.mesto.nomoredomains.work', 'http://localhost:3000', 'https://localhost:3000'],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаем логгер запросов
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', signUp, createUser);
app.post('/signin', signIn, login);

app.use(auth);
// роуты, которым нужна авторизация
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

// запрос к несуществующему роуту
app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

// подключаем логгер ошибок
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
