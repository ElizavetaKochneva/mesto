import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitForm){
    super (popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupSave = this._popup.querySelector('.popup__save');
    this.setEventListeners();
  }

  open = (info) => {
    const elements = this._getInputValues();
    for(let i=0; i<elements.length; i++) {
      elements[i].value = info[i];
      elements[i].classList.remove('popup__title-error');
    }
    if(info[2] === true){
      this._popupSave.classList.add('popup__save-error');
    }
    else{
      this._popupSave.classList.remove('popup__save-error');
    }
    this._popupSave.disabled = info[2];
    const errorMessageList = Array.from(this._popup.querySelectorAll('.popup__span-error'));
    errorMessageList.forEach((errorMessage)=> { 
      errorMessage.classList.remove('popup__span-error_active')
    });
    super.open();
  }

  close = () => {
    super.close();
    this._popupForm.reset();
  }

  _getInputValues=() => {
    return Array.from(this._popupForm.querySelectorAll('.popup__title'));
  }

  setEventListeners = (evt) => {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm();
      this._close();
    })
  }
}