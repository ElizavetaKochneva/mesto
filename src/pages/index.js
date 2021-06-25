import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards, containerSelector, popupImagesSelector, 
  popupProfileSelector, popupPlaceSelector, profileTitleSelector, profileSubtitleSelector, profilePencil, 
  placeAddButton, validationList, profileForm, placeForm, placeTemplateSelector } from '../utils/constants.js';

const profileFormValidator = new FormValidator(validationList, profileForm);
const placeFormValidator = new FormValidator(validationList, placeForm);
const popupWithImage = new PopupWithImage(popupImagesSelector);
const profile = new UserInfo ({ profileTitleSelector, profileSubtitleSelector });


const cardsList = new Section ({
    items: initialCards,
    renderer:(item) => {
      cardsList.addItem(createCard(item.name, item.link))
    }},
  containerSelector
);

const popupProfile = new PopupWithForm(
  popupProfileSelector,
  ({ profile_title, profile_subtitle }) => {
    profile.setUserInfo({ name: profile_title, title: profile_subtitle});

  }
)

const popupPlace = new PopupWithForm(
  popupPlaceSelector,
  ({ place_info, place_image }) => {
    cardsList.addItem(createCard(place_info, place_image))
  }
)

function createCard (name, link) {
  const place = new Card(name, link, popupWithImage.open, placeTemplateSelector);
  return place.getCard();
};

profilePencil.addEventListener('click',() => {
  profileFormValidator.clearValidation(false);
  const {name, title} =  profile.getUserInfo();
  profileForm.profile_title.value = name;
  profileForm.profile_subtitle.value = title;
  popupProfile.open();
});

placeAddButton.addEventListener('click',() => {
  placeFormValidator.clearValidation(true);
  popupPlace.open();
});

cardsList.renderItems();
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
