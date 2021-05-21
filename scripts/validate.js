const showInputError = (formElement, inputElement, errorMessage, validationList) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(validationList.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationList.errorClass);
};

const hideInputError = (formElement, inputElement, validationList) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(validationList.inputErrorClass);
  errorElement.classList.remove(validationList.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement,validationList) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationList);
  } else {
    hideInputError(formElement, inputElement, validationList);
  }
};

const setEventListeners = (formElement, validationList) => {
  const inputList = Array.from(formElement.querySelectorAll(validationList.inputSelector));
  const buttonElement = formElement.querySelector(validationList.submitButtonSelector)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationList);
      toggleButtonState (inputList, buttonElement, validationList);

    });
  });
};

const enableValidation = (validationList) => {
  const formList = Array.from(document.querySelectorAll(validationList.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
      setEventListeners(formElement, validationList);
  });
};

const hasInvalidInput=(inputList)=> {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState=(inputList, buttonElement,validationList )=>{
  if (hasInvalidInput(inputList)) {
   buttonElement.classList.add(validationList.inactiveButtonClass);
   buttonElement.disabled = true;
 } else {
   buttonElement.classList.remove(validationList.inactiveButtonClass);
   buttonElement.disabled = false;
 }
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__title',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save-error',
  inputErrorClass: 'popup__title-error',
  errorClass: 'popup__span-error_active'
});