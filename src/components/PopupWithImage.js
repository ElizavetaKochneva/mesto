import Popup from "./Popup.js";
import {popupImage, popupName} from '../utils/constants.js';

export default class PopupWithImage extends Popup{
  open = (name, link) => {
    super.open()
    popupImage.src = link;
    popupImage.alt = 'Фото "' + name + '"';
    popupName.textContent = name;
  }
}