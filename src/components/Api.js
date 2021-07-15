export default class Api {
  constructor ({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  getUserInfo = () => {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  getInitialCards = () => {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  patchProfile = (name, about) => {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._checkResponse)
  }

  postCards = (name, link) => {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._checkResponse)
  }

  deleteCards = (cardId) => {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  putLike = (cardId) => {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  deleteLike = (cardId) => {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  patchAvatar = (avatar) => {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(this._checkResponse)
  }
  _checkResponse = (res) => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}