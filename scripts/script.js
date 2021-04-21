let profilePencil = document.querySelector('.profile__pencil');
let popup = document.querySelector('.popup');

profilePencil.addEventListener('click', function(){
    popup.classList.toggle('popup_is-opened');
})

let popupClose = document.querySelector('.popup__close');

popupClose.addEventListener('click', function() {
   popup.classList.toggle('popup_is-opened');
})

let popupContent = document.querySelector('.popup__content');

function formSubmitHandler (evt) {
    evt.preventDefault();

    let popupTitle = popupContent.querySelector('.popup__title');
    let popupSubtitle = popupContent.querySelector('.popup__subtitle');
    let profileTitle = document.querySelector('.profile__title');
    let profileSubtitle = document.querySelector('.profile__subtitle');

    profileTitle.textContent = popupTitle.value;
    profileSubtitle.textContent = popupSubtitle.value;
    popup.classList.toggle('popup_is-opened');
}

popupContent.addEventListener('submit', formSubmitHandler);

let placeLike = document.querySelectorAll('.place__like');

for(let i=0; i<placeLike.length; i++) {
    placeLike[i].addEventListener('click',function(){
        placeLike[i].classList.toggle('place__like_active');
})
}
