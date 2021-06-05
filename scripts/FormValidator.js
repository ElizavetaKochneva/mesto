class FormValidator{
  _formSelector;
  _inputSelector;
  _submitButtonSelector;
  _inactiveButtonClass;
  _inputErrorClass;
  _errorClass;
  _form;
  _inputList;
  _buttonElement;
  
  constructor(validationList, form) {
    this._formSelector = validationList.formSelector,
    this._inputSelector = validationList.inputSelector,
    this._submitButtonSelector = validationList.submitButtonSelector,
    this._inactiveButtonClass = validationList.inactiveButtonClass,
    this._inputErrorClass = validationList.inputErrorClass,
    this._errorClass = validationList.errorClass;
    this._form = form;
  }
  
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };
  
  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
  
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  
  _setEventListeners = () => {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector)
    const thisObject = this;
    this._inputList.forEach(function(inputElement){
      inputElement.addEventListener('input', function() {
        thisObject._checkInputValidity(inputElement);
        thisObject._toggleButtonState();
      });
    });
  };
  
  _hasInvalidInput=()=> {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  _toggleButtonState=()=>{
    if (this._hasInvalidInput()) {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
   } else {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
   }
  };

  enableValidation = () => {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
   };
}

export default FormValidator
