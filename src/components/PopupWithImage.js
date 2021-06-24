import Popup from "./Popup.js";
import {popupImage, popupName} from '../utils/constants.js';

export default class PopupWithImage extends Popup{
  open = (image, title) => {
    super.open()
    popupImage.src = image.src;
    popupImage.alt = image.alt;
    popupName.textContent = title.textContent;
  }
}