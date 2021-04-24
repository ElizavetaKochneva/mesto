let popup = document.querySelector('.popup');
let popupForm = document.querySelector('form[name="popup__form"]');
let profilePencil = document.querySelector('.profile__pencil');
let popupClose = document.querySelector('.popup__close');
let popupTitle = popupForm.querySelector('#popup__title');
let popupSubtitle = popupForm.querySelector('#popup__subtitle');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function popupOpening() {
    popup.classList.toggle('popup_is-opened');
    popupTitle.value = profileTitle.textContent;
    popupSubtitle.value = profileSubtitle.textContent;
}

function popupClosing() {
    popup.classList.toggle('popup_is-opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupTitle.value;
    profileSubtitle.textContent = popupSubtitle.value;
    popupClosing();
}

profilePencil.addEventListener('click', popupOpening)
popupClose.addEventListener('click', popupClosing)
popupForm.addEventListener('submit', formSubmitHandler);
