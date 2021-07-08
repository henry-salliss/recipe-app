import recipeView from '../views/recipeView.js';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
export { async } from 'regenerator-runtime';
export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
    };
  } catch (err) {
    throw err;
  }
};
