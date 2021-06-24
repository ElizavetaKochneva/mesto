import { escape } from '../utils/constants.js';

export default class Popup{
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._close = this.close.bind(this);
    this.setEventListeners();
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
      this._close();
    }
  }

  setEventListeners () {
    const thisObject = this;
    const closeButton = this._popup.querySelector('.popup__close');
    closeButton.addEventListener('click', this._close);
    this._popup.addEventListener('click',function(evt){
      if (evt.target === thisObject._popup){
        thisObject._close();
      }
    });
  }
}