import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup{
  constructor(popupSelector, patchRequestAvatar, setAvatar){
    super (popupSelector);
    this._submitButton = this._popup.querySelector('.popup__save');
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupInput = this._popup.querySelector('.popup__title');
    this._patchRequestAvatar = patchRequestAvatar;
    this._setAvatar = setAvatar;
    this.setEventListeners();
  }

  close = () => {
    super.close();
    this._submitButton.textContent = 'Сохранить'
    this._popupForm.reset();
  }

  setEventListeners = () => {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = 'Сохранение...'
      this._patchRequestAvatar(this._popupInput.value)
        .then((data) => {
          this._setAvatar(data.avatar);
          this.close();
        })
    })
  }
}