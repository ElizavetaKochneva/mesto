export default class Card{
  constructor(id, name, link, likes, ownerId, myId, placeTemplateSelector, 
    openPopup, openDeletePopup, putLike, deleteLike) {
    this._name = name;
    this._link = link;
    this._openPopup = openPopup;
    this._openDeletePopup = openDeletePopup
    this._putLike = putLike
    this._deleteLike = deleteLike
    this._likes = likes;
    this._id = id;
    this._myId = myId;
    this._ownerId = ownerId;
    this._placeTemplate = document.querySelector(placeTemplateSelector).content;
  }

  _deletePlace = () => {
    this._openDeletePopup(this._id, this._place);
  }

  _likePlace = () => {
    if(this._like.classList.contains('place__like_active')) {
      this._deleteLike(this._id)
        .then((data) => {
          this._like.classList.remove('place__like_active');
          this._counter.textContent = data.likes.length
        })
    }
    else {
      this._putLike(this._id)
        .then((data) => {
          this._like.classList.add('place__like_active');
          this._counter.textContent = data.likes.length
        })
    }
  }

  _addListeners = () => {
    this._deletePlaceButton.addEventListener('click', this._deletePlace);
    this._like.addEventListener('click', this._likePlace);
    this._placeImage.addEventListener('click',() =>{this._openPopup(this._name, this._link);});
  }

  _getTemplate = () => {
    return this._placeTemplate.querySelector('.place').cloneNode(true);
  }

  _checkLike = () => {
    this._likes.forEach(like => {
      if(like._id === this._myId) {
        this._like.classList.add('place__like_active');
      }
    });
  }

  _createPlace = () => {
    this._place = this._getTemplate();
    this._placeImage = this._place.querySelector('.place__image');
    this._placeTitle = this._place.querySelector('.place__title');
    this._placeTitle.textContent = this._name;
    this._placeImage.src = this._link;
    this._placeImage.alt = 'Фото "' + this._name + '"';
    this._like = this._place.querySelector('.place__like');
    this._counter = this._place.querySelector('.place__counter');
    this._counter.textContent = this._likes.length;
    this._checkLike();
    this._deletePlaceButton = this._place.querySelector('.place__delete');
    if(this._ownerId !== this._myId){
      this._deletePlaceButton.hidden=true;
    }
    this._addListeners();
  }

  getCard = () => {
    this._createPlace()
    return this._place
  }
}