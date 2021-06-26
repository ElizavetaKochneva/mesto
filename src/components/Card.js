export default class Card{
  constructor(name, link, openPopup, placeTemplateSelector) {
    this._name = name;
    this._link = link;
    this._openPopup = openPopup;
    this._placeTemplate = document.querySelector(placeTemplateSelector).content;
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
    this._placeImage.addEventListener('click',() =>{this._openPopup(this._name, this._link);});
  }

  _getTemplate = () => {
    return this._placeTemplate.querySelector('.place').cloneNode(true);
  }

  _createPlace = () => {
    this._place = this._getTemplate();
    this._placeImage = this._place.querySelector('.place__image');
    this._placeTitle = this._place.querySelector('.place__title');
    this._placeTitle.textContent = this._name;
    this._placeImage.src = this._link;
    this._placeImage.alt = 'Фото "' + this._name + '"';
    this._like = this._place.querySelector('.place__like');
    this._addListeners();
  }

  getCard = () => {
    this._createPlace()
    return this._place
  }
}