let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let profilePencil = document.querySelector('.profile__pencil');
let popupClose = document.querySelector('.popup__close');
let popupTitle = popupForm.querySelector('#popup__title');
let popupSubtitle = popupForm.querySelector('#popup__subtitle');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function popupToggle() {
    popup.classList.toggle('popup_is-opened');
    if (popup.classList.contains('popup_is-opened')) {
        popupTitle.value = profileTitle.textContent;
        popupSubtitle.value = profileSubtitle.textContent;
    }
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupTitle.value;
    profileSubtitle.textContent = popupSubtitle.value;
    popupToggle();
}

profilePencil.addEventListener('click', popupToggle)
popupClose.addEventListener('click', popupToggle)
popupForm.addEventListener('submit', formSubmitHandler);
