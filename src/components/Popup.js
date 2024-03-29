import { escape } from '../utils/constants.js';

export default class Popup{
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  open(){
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close(){
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === escape) {
      this.close();
    }
  }

  setEventListeners () {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target === this._popup || evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }
}