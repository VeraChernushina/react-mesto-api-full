import { checkResponse, BASE_URL } from './utils';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получение карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: this._headers,
    }).then((res) => checkResponse(res));
  }

  // Добавление новой карточки через попап
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => checkResponse(res));
  }

  // Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then((res) => checkResponse(res));
  }

  // like/dislike
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: `${!isLiked ? 'DELETE' : 'PUT'}`,
      credentials: 'include',
      headers: this._headers,
    }).then((res) => checkResponse(res));
  }

  // Получение информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers,
    }).then((res) => checkResponse(res));
  }

  // Редактирование информации о пользователе через попап
  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => checkResponse(res));
  }

  // Редактирование аватара пользователя через попап
  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => checkResponse(res));
  }
}

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
