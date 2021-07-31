import { View } from './View';
import icons from 'url:../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _windowElement = document.querySelector('.add-recipe-window');
  _overlayElement = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this.addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlayElement.classList.toggle('hidden');
    this._windowElement.classList.toggle('hidden');
  }

  addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlayElement.addEventListener(
      'click',
      this.toggleWindow.bind(this)
    );
  }

  addHandlerUpload() {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      console.log(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
