import icons from 'url:../img/icons.svg';

class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const html = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const spinner = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', spinner);
  }

  renderError(error = this._errorMessage) {
    const html = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${error}</p>
          </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  renderSuccessMessage(message = this._successMessage) {
    const html = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
}

export { View };
