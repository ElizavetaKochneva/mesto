import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popupProfile = document.querySelector('#popup_profile');
const profileForm = document.querySelector('#profile_form');
const profilePencil = document.querySelector('.profile__pencil');
const profileFormClose = document.querySelector('#profile_form_close');
const profileFormTitle = profileForm.querySelector('#profile_form_title');
const profileFormSubtitle = profileForm.querySelector('#profile_form_subtitle');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const popupPlace = document.querySelector('#popup_place');
const placeForm = document.querySelector('#place_form');
const placeAddButton = document.querySelector('.profile__plus');
const placeFormClose = document.querySelector('#place_form_close');
const placeFormInfo =  placeForm.querySelector('#place_form_info');
const placeFormImage =  placeForm.querySelector('#place_form_image');

const popupImages = document.querySelector('#popup_images');
const imageClose = document.querySelector('#image_close');
const popupImage = document.querySelector('.popup__image');
const popupName = document.querySelector('.popup__name');

const places= document.querySelector('.places');

const escape = 'Escape'

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

const validationList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__title',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save-error',
  inputErrorClass: 'popup__title-error',
  errorClass: 'popup__span-error_active'
};
const profileFormValidator = new FormValidator(validationList, profileForm);
const placeFormValidator = new FormValidator(validationList, placeForm);

function togglePopupOpenClass(popup){
  popup.classList.toggle('popup_is-opened');
  if (popup.classList.contains('popup_is-opened')) {
    document.addEventListener('keydown', closeByEscape);
  }
  else {
    document.removeEventListener('keydown', closeByEscape);
  }
}

function togglePopupProfile() {
  togglePopupOpenClass(popupProfile);
  if (popupProfile.classList.contains('popup_is-opened')) {
    const submitButton = popupProfile.querySelector('.popup__save');
    profileFormTitle.value = profileTitle.textContent;
    profileFormTitle.classList.remove('popup__title-error');
    profileFormSubtitle.value = profileSubtitle.textContent;
    profileFormSubtitle.classList.remove('popup__title-error');
    submitButton.classList.remove('popup__save-error');
    submitButton.disabled = false;
    removeErrorMessage(profileForm);
  }
}

function submitFormProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = profileFormTitle.value;
    profileSubtitle.textContent = profileFormSubtitle.value;
    togglePopupProfile();
}

function togglePopupPlace(){
  togglePopupOpenClass(popupPlace);
  if (popupPlace.classList.contains('popup_is-opened')) {
    const submitButton = popupPlace.querySelector('.popup__save');
    placeFormInfo.value='';
    placeFormInfo.classList.remove('popup__title-error');
    placeFormImage.value='';
    placeFormImage.classList.remove('popup__title-error');
    submitButton.disabled = true;
    submitButton.classList.add('popup__save-error');
    removeErrorMessage(placeForm)
  }
}

function addPlace(place){
  places.prepend(place);
}

function submitFormPlace(evt) {
  evt.preventDefault();
  const place =  new Card(placeFormInfo.value, placeFormImage.value);
  addPlace(place.getCard());
  togglePopupPlace();
}

initialCards.forEach(function(item){
  const place = new Card(item.name, item.link);
  addPlace(place.getCard());
});

function removeErrorMessage (popup){
  const errorMessageList = Array.from(popup.querySelectorAll('.popup__span-error'));
  errorMessageList.forEach((errorMessage)=>{
    errorMessage.classList.remove('popup__span-error_active')
 })
}

function closeByEscape(evt) {
  if (evt.key === escape) {
    const activePopup = document.querySelector('.popup_is-opened')
    togglePopupOpenClass(activePopup);
  }
}

popupProfile.addEventListener('click',function(evt){
  if (evt.target === popupProfile){
    togglePopupProfile();
  }
});
profilePencil.addEventListener('click', togglePopupProfile)
profileFormClose.addEventListener('click', togglePopupProfile)
profileForm.addEventListener('submit', submitFormProfile);


popupPlace.addEventListener('click',function(evt){
  if (evt.target === popupPlace){
    togglePopupPlace();
  }
});
placeAddButton.addEventListener('click', togglePopupPlace);
placeFormClose.addEventListener('click', togglePopupPlace);
placeForm.addEventListener('submit', submitFormPlace);

popupImages.addEventListener('click',function(evt){
  if (evt.target === popupImages){
    togglePopupOpenClass(popupImages);
  }
});
imageClose.addEventListener('click', function(){
  togglePopupOpenClass(popupImages);
});

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

export {popupImage, popupName, togglePopupOpenClass, popupImages}