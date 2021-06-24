import './pages/index.css';
import Card from './components/Card.js';
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js'
import PopupWithImage from './components/PopupWithImage.js';
import FormValidator from './components/FormValidator.js';
import UserInfo from './components/UserInfo.js';
import {initialCards, containerSelector, popupImagesSelector, 
  popupProfileSelector, popupPlaceSelector, profileTitleSelector, profileSubtitleSelector, profilePencil, 
  placeAddButton, validationList, profileForm,placeForm } from './utils/constants.js';

const profileFormValidator = new FormValidator(validationList, profileForm);
const placeFormValidator = new FormValidator(validationList, placeForm);
const popupWithImage = new PopupWithImage(popupImagesSelector);
const profile = new UserInfo ({ profileTitleSelector, profileSubtitleSelector });

const cardsList = new Section ({
    items: initialCards,
    renderer:(item) => {
      const place = new Card(item.name, item.link, popupWithImage.open);
      cardsList.addItem(place.getCard())
    }},
  containerSelector
);

const popupProfile = new PopupWithForm(
  popupProfileSelector,
  () => {
    const [ name, title ] = popupProfile._getInputValues();
    profile.setUserInfo({ name: name.value, title: title.value });

  }
)

const popupPlace = new PopupWithForm(
  popupPlaceSelector,
  () => {
    const [ name, title ] = popupPlace._getInputValues();
    const place =  new Card(name.value, title.value, popupWithImage.open);
    cardsList.addItem(place.getCard())
  }
)

profilePencil.addEventListener('click',() => {
  const {name, title} =  profile.getUserInfo();
  popupProfile.open([ name, title , false ]);
});

placeAddButton.addEventListener('click',() => {
  popupPlace.open([ '' , '' , true ]);
});

cardsList.renderItems();
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
