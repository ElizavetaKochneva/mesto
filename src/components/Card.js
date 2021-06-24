export default class Card{
  _placeTemplate = document.querySelector('#place-template').content;
  _place;
  _name;
  _link;
  _like;
  _placeTitle;
  _placeImage;

  constructor(name, link, openPopup) {
    this._name = name;
    this._link = link;
    this._openPopup = openPopup;
  }

  _deletePlace = () => {
    this._place.remove();
  }

  _likePlace = () => {
    this._like.classList.toggle('place__like_active');
  }

  _addListeners = () => {
    this._place.querySelector('.place__delete').addEventListener('click', this._deletePlace);
    this._like.addEventListener('click', this._likePlace);
    this._openPlaceForm();
  }

  _createPlace = () => {
    this._place = this._placeTemplate.querySelector('.place').cloneNode(true);
    this._placeImage = this._place.querySelector('.place__image');
    this._placeTitle = this._place.querySelector('.place__title');
    this._placeTitle.textContent = this._name;
    this._placeImage.src = this._link;
    this._placeImage.alt = 'Фото "' + name + '"';
    this._like = this._place.querySelector('.place__like');
    this._addListeners();
  }
  _openPlaceForm = () =>{
    const thisObject = this;
    this._placeImage.addEventListener('click',function(){
      thisObject._openPopup(thisObject._placeImage, thisObject._placeTitle);
    });
  }

  getCard = () => {
    if(!this._place) {
      this._createPlace()
    }
  
    return this._place
  }
}