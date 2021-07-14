import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';
import { containerSelector, popupImagesSelector, 
  popupProfileSelector, popupPlaceSelector, profileTitleSelector, 
  profileSubtitleSelector, popupAcceptanceSelector, popupAvatarSelector, 
  profilePencil, placeAddButton, validationList, profileForm, placeForm, avatarForm, 
  placeTemplateSelector, headers, baseUrl, profileAvatarSelector, popupImage } from '../utils/constants.js';
let myUserId = '';


const profileFormValidator = new FormValidator(validationList, profileForm);
const placeFormValidator = new FormValidator(validationList, placeForm);
const avatarFormValidator = new FormValidator(validationList, avatarForm);
const popupWithImage = new PopupWithImage(popupImagesSelector);
const profile = new UserInfo ({ profileTitleSelector, profileSubtitleSelector, profileAvatarSelector });
const api = new Api ({ baseUrl, headers });
const popupAcceptance = new PopupWithDelete( popupAcceptanceSelector, api.deleteCards );

const popupAvatar = new PopupWithForm( popupAvatarSelector, 
  ({ profile_avatar }) => {
    api.patchAvatar(profile_avatar)
    .then((data) => {
      popupAvatar.close();
      profile.setAvatar(data.avatar);
    })
  });

const popupProfile = new PopupWithForm(
  popupProfileSelector,
  ({ profile_title, profile_subtitle }) => {
    api.patchProfile( profile_title, profile_subtitle )
    .then((data) => {
      popupProfile.close();
      profile.setUserInfo({ name: data.name, title: data.about});
    })
    .catch((err) => {
      console.log(err);
    }); 
  }
)

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then((data) => {
  profile.setUserInfo({ name: data[0].name, title:data[0].about });
  profile.setAvatar(data[0].avatar);
  myUserId = data[0]._id;

  const cardsList = new Section ({
    items: data[1].reverse(),
    renderer:(item) => {
      cardsList.addItem(createCard(item._id, item.name, item.link, item.likes, item.owner._id))
    }},
  containerSelector
  )
  cardsList.renderItems();
  const popupPlace = new PopupWithForm(
    popupPlaceSelector,
    ({ place_info, place_image }) => {
      api.postCards(place_info,place_image)
        .then((data) => {
          cardsList.addItem(createCard(data._id, place_info, place_image, data.likes, data.owner._id))
          popupPlace.close()
        })
    }
  )
  popupPlace.setEventListeners();

  placeAddButton.addEventListener('click',() => {
    placeFormValidator.clearValidation(true);
    popupPlace.open();
  });
})
.catch((err) => {
  console.log(err);
}); 

function createCard (id, name, link, likes, ownerId) {
  const place = new Card(id, name, link, likes, ownerId, myUserId, placeTemplateSelector, 
    popupWithImage.open, popupAcceptance.open, api.putLike, api.deleteLike);
  return place.getCard();
};


profilePencil.addEventListener('click',() => {
  profileFormValidator.clearValidation(false);
  const {name, title} =  profile.getUserInfo();
  profileForm.profile_title.value = name;
  profileForm.profile_subtitle.value = title;
  popupProfile.open();
});

document.querySelector(profileAvatarSelector).addEventListener('click',() => {
  avatarFormValidator.clearValidation(true);
  popupAvatar.open();
});

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
avatarFormValidator.enableValidation();
popupAvatar.setEventListeners();
popupAcceptance.setEventListeners();
popupProfile.setEventListeners();
popupWithImage.setEventListeners();