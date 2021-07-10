import * as model from './model.js';
import recipeView from '../views/recipeView.js';
import searchView from '../views/searchView';
import resultsView from '../views/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

const getRecipe = async function () {
  const id = window.location.hash.slice(1);
  if (!id) return;
  try {
    recipeView.renderSpinner();

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
    console.log(query);
    // search results
    await model.loadSearchResults(query);

    // Load results
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(getRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
