export default class UserInfo {
  constructor({ profileTitleSelector, profileSubtitleSelector, profileAvatarSelector}) {
    this._name = document.querySelector(profileTitleSelector);
    this._title = document.querySelector(profileSubtitleSelector);
    this._avatar = document.querySelector(profileAvatarSelector);
  }
  getUserInfo = () => {
    return { name: this._name.textContent, title: this._title.textContent }
  }
  setUserInfo = ({name, title}) => {
    this._name.textContent = name;
    this._title.textContent = title;
  }
  setAvatar = (avatar) => {
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }
}