import * as model from './model.js';
import recipeView from '../views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

///////////////////////////////////////

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

getRecipe();

const init = function () {
  recipeView.addHandlerRender(getRecipe);
};
init();
