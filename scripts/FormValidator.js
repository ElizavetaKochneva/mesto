class FormValidator{
  _formSelector;
  _inputSelector;
  _submitButtonSelector;
  _inactiveButtonClass;
  _inputErrorClass;
  _errorClass;
  _form;
  
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
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const buttonElement = this._form.querySelector(this._submitButtonSelector)
    const thisObject = this;
    inputList.forEach(function(inputElement){
      inputElement.addEventListener('input', function() {
        thisObject._checkInputValidity(inputElement);
        thisObject._toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  _hasInvalidInput=(inputList)=> {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  _toggleButtonState=(inputList, buttonElement)=>{
    if (this._hasInvalidInput(inputList)) {
     buttonElement.classList.add(this._inactiveButtonClass);
     buttonElement.disabled = true;
   } else {
     buttonElement.classList.remove(this._inactiveButtonClass);
     buttonElement.disabled = false;
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
