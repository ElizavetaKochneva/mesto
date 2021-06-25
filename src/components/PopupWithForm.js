import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitForm){
    super (popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupSave = this._popup.querySelector('.popup__save');
    this.setEventListeners();
  }

  close = () => {
    super.close();
    this._popupForm.reset();
  }

  _getInputValues = () => {
    this._inputList = this._popup.querySelectorAll('.popup__title');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setEventListeners = () => {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this._close();
    })
  }
}