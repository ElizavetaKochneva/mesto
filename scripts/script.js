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
const placeTemplate = document.querySelector('#place-template').content;
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

function popupProfileToggle() {
    popupProfile.classList.toggle('popup_is-opened');
    if (popupProfile.classList.contains('popup_is-opened')) {
        profileFormTitle.value = profileTitle.textContent;
        profileFormSubtitle.value = profileSubtitle.textContent;
    }
}

function formSubmitProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = profileFormTitle.value;
    profileSubtitle.textContent = profileFormSubtitle.value;
    popupProfileToggle();
}

function popupPlaceToggle(){
  popupPlace.classList.toggle('popup_is-opened');
  if (popupPlace.classList.contains('popup_is-opened')) {
    placeFormInfo.value='';
    placeFormImage.value='';
  }
}

function popupImagesToggle(){
  popupImages.classList.toggle('popup_is-opened');
};

function placeAdd(name, link) {
  const place = placeTemplate.querySelector('.place').cloneNode(true);
  const placeTitle = place.querySelector('.place__title');
  const placeImage = place.querySelector('.place__image');
  const placeLike = place.querySelector('.place__like');
  const placeDelete = place.querySelector('.place__delete');

  placeTitle.textContent = name;
  placeImage.src = link;
  places.prepend(place);

  placeLike.addEventListener('click',function(){
    placeLike.classList.toggle('place__like_active');
  });

  placeDelete.addEventListener('click',function(){
    place.remove();
  });
  
  placeImage.addEventListener('click',function(){
    popupImagesToggle();
    popupImage.src = placeImage.src;
    popupName.textContent = placeTitle.textContent;

  });
};

function formSubmitPlace(evt) {
  evt.preventDefault();
  placeAdd(placeFormInfo.value, placeFormImage.value);
  popupPlaceToggle();
}

initialCards.forEach(function(item){
  placeAdd(item.name, item.link);
});

profilePencil.addEventListener('click', popupProfileToggle)
profileFormClose.addEventListener('click', popupProfileToggle)
profileForm.addEventListener('submit', formSubmitProfile);

placeAddButton.addEventListener('click', popupPlaceToggle);
placeFormClose.addEventListener('click', popupPlaceToggle);
placeForm.addEventListener('submit', formSubmitPlace);

imageClose.addEventListener('click',popupImagesToggle);