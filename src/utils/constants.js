export const popupProfileSelector = '#popup_profile';
export const profileForm = document.querySelector('#profile_form');
export const profilePencil = document.querySelector('.profile__pencil');
export const profileTitleSelector = '.profile__title';
export const profileSubtitleSelector = '.profile__subtitle';

export const popupPlaceSelector = '#popup_place';
export const placeForm = document.querySelector('#place_form');
export const placeAddButton = document.querySelector('.profile__plus');

export const popupImagesSelector = '#popup_images';

export const popupImage = document.querySelector('.popup__image');
export const popupName = document.querySelector('.popup__name');

export const containerSelector = '.places';
export const placeTemplateSelector = '#place-template';

export const escape = 'Escape';

export const initialCards = [
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

export const validationList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__title',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save-error',
  inputErrorClass: 'popup__title-error',
  errorClass: 'popup__span-error_active'
};
