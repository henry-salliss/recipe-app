var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "state", function () {
  return state;
});
_parcelHelpers.export(exports, "loadRecipe", function () {
  return loadRecipe;
});
_parcelHelpers.export(exports, "loadSearchResults", function () {
  return loadSearchResults;
});
_parcelHelpers.export(exports, "getSearchResultsPage", function () {
  return getSearchResultsPage;
});
_parcelHelpers.export(exports, "updateServings", function () {
  return updateServings;
});
_parcelHelpers.export(exports, "addBookmark", function () {
  return addBookmark;
});
_parcelHelpers.export(exports, "deleteBookmark", function () {
  return deleteBookmark;
});
_parcelHelpers.export(exports, "async", function () {
  return _regeneratorRuntime.async;
});
require('../views/recipeView.js');
var _configJs = require('./config.js');
var _helpersJs = require('./helpers.js');
var _regeneratorRuntime = require('regenerator-runtime');
const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: _configJs.RES_PER_PAGE,
    page: 1
  },
  bookmarks: []
};
const loadRecipe = async function (id) {
  try {
    const data = await _helpersJs.getJSON(`${_configJs.API_URL}/${id}`);
    const {recipe} = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time
    };
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    throw err;
  }
};
const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await _helpersJs.getJSON(`${_configJs.API_URL}?search=${query}`);
    console.log(data);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};
const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};
const updateServings = function (servings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * servings / state.recipe.servings;
  });
  state.recipe.servings = servings;
};
const addBookmark = function (recipe) {
  // Add a new bookmark
  state.bookmarks.push(recipe);
  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};
const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  // Mark current recipe as not bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};