import * as model from './model.js';
import recipeView from '../views/recipeView.js';
import searchView from '../views/searchView';
import resultsView from '../views/resultsView.js';
import bookmarksView from '../views/bookmarksView.js';
import paginationView from '../views/paginationView.js';
import addRecipeView from '../views/addRecipeView.js';
import { CLOSE_MODAL_SEC } from './config.js';
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

    // Update the bookmarks
    bookmarksView.update(model.state.bookmarks);
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

const controlBookmarks = function () {
  // Add bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
    // Delete bookmark
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // Update recipe view
  recipeView.update(model.state.recipe);

  // add bookmark to bookmark list
  bookmarksView.render(model.state.bookmarks);

  // Put bookmarks in local storage
  bookmarksView.addHandlerRender(model.state.bookmarks);
};

const bookmarkStorage = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Add loading spinner
    addRecipeView.renderSpinner();

    // Upload new data
    await model.uploadNewRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render new recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderSuccessMessage();

    // Rerender bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Chnage id in browser
    window.history.pushState(null, `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, CLOSE_MODAL_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
    console.error(err);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(bookmarkStorage);
  recipeView.addHandlerRender(getRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView._addClickHandler(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
