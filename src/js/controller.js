import * as model from './model.js';
import recipeView from '../views/recipeView.js';
import searchView from '../views/searchView';
import resultsView from '../views/resultsView.js';
import paginationView from '../views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const getRecipe = async function () {
  const id = window.location.hash.slice(1);
  if (!id) return;
  try {
    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());
    // Loading the recipe
    await model.loadRecipe(id);
    // Rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // Get query from search view
    const query = searchView.getQuery();
    if (!query) return;
    // search results
    await model.loadSearchResults(query);
    // Load results
    resultsView.render(model.getSearchResultsPage());
    // Render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (newPage) {
  // Load NEW results
  resultsView.render(model.getSearchResultsPage(newPage));
  // Render NEW pagination
  paginationView.render(model.state.search);
};

const controlServings = function (servings) {
  // Update recipe servings
  model.updateServings(servings);

  // Update the view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(getRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView._addClickHandler(controlPagination);
};
init();
