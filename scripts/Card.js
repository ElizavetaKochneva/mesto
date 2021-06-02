class Card{
  _placeTemplate = document.querySelector('#place-template').content;
  _place;
  _name;
  _link;
  _like;

  constructor(name, link) {
    this._name = name;
    this._link = link;
  }

  _deletePlace = () => {
      this._place.remove();
  }

  _likePlace = () => {
      this._like.classList.toggle('place__like_active');
  }

  _addListeners = () => {
    this._place.querySelector('.place__delete').addEventListener('click', this._deletePlace)
    this._like.addEventListener('click', this._likePlace)
  }

  _createPlace = () => {
    this._place = this._placeTemplate.querySelector('.place').cloneNode(true);
    this._place.querySelector('.place__title').textContent = this._name;
    this._place.querySelector('.place__image').src = this._link;
    this._place.querySelector('.place__image').alt = 'Фото "' + name + '"';
    this._like = this._place.querySelector('.place__like');
    this._addListeners();
  }

  getCard = () => {
    if(!this._place) {
      this._createPlace()
    }
  
    return this._place
  }
}

export default Card

