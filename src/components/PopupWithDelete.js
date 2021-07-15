import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup{
  constructor(popupSelector, deleteCards){
    super (popupSelector);
    this._form = this._popup.querySelector('#acceptance_form');
    this._deleteCards = deleteCards;
  }

  open = (cardId, card) => {
    super.open()
    this._cardId = cardId
    this._card = card
  }

  _deleteCard = () => {
    this._deleteCards(this._cardId)
    .then((data) => {
      if(data.message === 'Пост удалён') {
        this._card.remove();
        this.close();
      }
    })
  }

  setEventListeners = () => {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._deleteCard(); 
    });
  }
}