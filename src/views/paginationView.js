import { View } from './View';
import icons from 'url:../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _addClickHandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  getNextBtn(page) {
    return `
    <button data-goto="${page + 1}" class="btn--inline pagination__btn--next">
           <span>${page + 1}</span>
           <svg class="search__icon">
             <use href="${icons}#icon-arrow-right"></use>
           </svg>
         </button>
    `;
  }

  getPrevBtn(page) {
    return `
    <button data-goto="${page - 1}" class="btn--inline pagination__btn--prev">
           <span>${page - 1}</span>
           <svg class="search__icon">
             <use href="${icons}#icon-arrow-right"></use>
           </svg>
         </button>
    `;
  }

  getPrevAndNextBtn(page) {
    return `
    <button data-goto="${page - 1}" class="btn--inline pagination__btn--prev">
           <span>${page - 1}</span>
           <svg class="search__icon">
             <use href="${icons}#icon-arrow-right"></use>
           </svg>
         </button>
         <button data-goto="${
           page + 1
         }" class="btn--inline pagination__btn--next">
           <span>${page + 1}</span>
           <svg class="search__icon">
             <use href="${icons}#icon-arrow-right"></use>
           </svg>
         </button>
    `;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1 and there other pages
    if (curPage === 1 && numPages > 1) return this.getNextBtn(curPage);
    // Last page
    if (curPage === numPages && numPages > 1) return this.getPrevBtn(curPage);
    // Other page
    if (curPage < numPages) return this.getPrevAndNextBtn(curPage);

    // Page 1 and there are no other pages
    return ``;
  }
}

export default new PaginationView();
