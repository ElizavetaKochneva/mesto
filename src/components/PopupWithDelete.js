import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup{
  constructor(popupSelector, deleteCards){
    super (popupSelector);
    this._submitButton = this._popup.querySelector('#acceptance_form');
    this._deleteCards = deleteCards;
  }

  open = (cardId, card) => {
    super.open()
    this._cardId = cardId
    this._card = card
    this._submitButton.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._deleteCard();
      this.close();
    })
  }

  close = () => {
    super.close();
    this._submitButton.removeEventListener('submit', this._deleteCard);
  }

  _deleteCard = () => {
    this._deleteCards(this._cardId)
      .then((response) => {
        if(response === true) {
          this._card.remove();
        }
      })
  }
}