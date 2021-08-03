// import { API_URL, KEY } from './config.js';
// import { getJSON, sendJSON } from './helpers.js';
// export { async } from 'regenerator-runtime';
// import { RES_PER_PAGE } from './config.js';
// import { async } from 'regenerator-runtime';

// export const state = {
//   recipe: {},
//   search: {
//     query: '',
//     results: [],
//     resultsPerPage: RES_PER_PAGE,
//     page: 1,
//   },
//   bookmarks: [],
// };
// const createRecipeObj = function (data) {
//   const { recipe } = data.data;
//   return {
//     id: recipe.id,
//     title: recipe.title,
//     publisher: recipe.publisher,
//     sourceUrl: recipe.source_url,
//     image: recipe.image_url,
//     ingredients: recipe.ingredients,
//     servings: recipe.servings,
//     cookingTime: recipe.cooking_time,
//     ...(recipe.key && { key: recipe.key }),
//   };
// };

// export const loadRecipe = async function (id) {
//   try {
//     const data = await getJSON(`${API_URL}/${id}`);

//     state.recipe = createRecipeObj(data);
//     if (state.bookmarks.some(bookmark => bookmark.id === id)) {
//       state.recipe.bookmarked = true;
//     } else {
//       state.recipe.bookmarked = false;
//     }
//   } catch (err) {
//     throw err;
//   }
// };

// export const loadSearchResults = async function (query) {
//   try {
//     state.search.query = query;
//     const data = await getJSON(`${API_URL}?search=${query}`);
//     console.log(data);
//     state.search.results = data.data.recipes.map(rec => {
//       return {
//         id: rec.id,
//         title: rec.title,
//         publisher: rec.publisher,
//         image: rec.image_url,
//       };
//     });
//     state.search.page = 1;
//   } catch (err) {
//     throw err;
//   }
// };

// export const getSearchResultsPage = function (page = state.search.page) {
//   state.search.page = page;
//   const start = (page - 1) * state.search.resultsPerPage;
//   const end = page * state.search.resultsPerPage;

//   return state.search.results.slice(start, end);
// };

// export const updateServings = function (servings) {
//   state.recipe.ingredients.forEach(ing => {
//     ing.quantity = (ing.quantity * servings) / state.recipe.servings;
//   });
//   state.recipe.servings = servings;
// };

// export const storeBookmarks = function () {
//   localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
// };

// export const addBookmark = function (recipe) {
//   // Add a new bookmark
//   state.bookmarks.push(recipe);

//   // Mark current recipe as bookmarked
//   if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

//   // Store bookmark
//   storeBookmarks();
// };

// export const deleteBookmark = function (id) {
//   // Delete bookmark
//   const index = state.bookmarks.findIndex(el => el.id === id);
//   state.bookmarks.splice(index, 1);

//   // Mark current recipe as not bookmarked
//   if (id === state.recipe.id) state.recipe.bookmarked = false;

//   // Store bookmark
//   storeBookmarks();
// };

// const init = function () {
//   const data = JSON.parse(localStorage.getItem('bookmarks'));
//   if (data) state.bookmarks = data;
// };

// init();

// export const uploadNewRecipe = async function (newRecipe) {
//   try {
//     const ingredients = Object.entries(newRecipe)
//       .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
//       .map(ing => {
//         const ingArray = ing[1].replaceAll(' ', '').split(',');
//         if (ingArray.length !== 3)
//           throw new Error('Wrong format please try again');
//         const [quantity, unit, description] = ingArray;

//         return {
//           quantity: quantity ? +quantity : null,
//           unit: unit,
//           description: description,
//         };
//       });

//     const recipe = {
//       title: newRecipe.title,
//       source_url: newRecipe.sourceUrl,
//       image_url: newRecipe.image,
//       publisher: newRecipe.publisher,
//       cooking_time: +newRecipe.cookingTime,
//       servings: +newRecipe.servings,
//       ingredients,
//     };

//     const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);

//     state.recipe = createRecipeObj(data.data.recipe);
//     addBookmark(state.recipe);
//   } catch (err) {
//     throw err;
//   }
// };

import { API_URL, KEY } from './config.js';
import { getJSON, sendJSON } from './helpers.js';
export { async } from 'regenerator-runtime';
import { RES_PER_PAGE } from './config.js';
import { async } from 'regenerator-runtime';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

// const createRecipeObj = function (recipe) {
//   return {
//     id: recipe.id,
//     title: recipe.title,
//     publisher: recipe.publisher,
//     sourceUrl: recipe.source_url,
//     image: recipe.image_url,
//     ingredients: recipe.ingredients,
//     servings: recipe.servings,
//     cookingTime: recipe.cooking_time,
//     ...(recipe.key && { key: recipe.key }),
//   };
// };
// export const loadRecipe = async function (id) {
//   try {
//     console.log(id);
//     const data = await getJSON(`${API_URL}/${id}`);

//     state.recipe = createRecipeObj(data);
//     if (state.bookmarks.some(bookmark => bookmark.id === id)) {
//       state.recipe.bookmarked = true;
//     } else {
//       state.recipe.bookmarked = false;
//     }
//   } catch (err) {
//     throw err;
//   }
// };

const createRecipeObj = function (data) {
  const { recipe } = data.data;
  console.log(recipe);
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    state.recipe = createRecipeObj(data);
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (servings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * servings) / state.recipe.servings;
  });
  state.recipe.servings = servings;
};

export const storeBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // Add a new bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  // Store bookmark
  storeBookmarks();
};

export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as not bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  // Store bookmark
  storeBookmarks();
};

const init = function () {
  const data = JSON.parse(localStorage.getItem('bookmarks'));
  if (data) state.bookmarks = data;
};

init();

export const uploadNewRecipe = async function (newRecipe) {
  try {
    console.log(Object.entries(newRecipe));
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArray = ing[1].replaceAll(' ', '').split(',');
        if (ingArray.length !== 3)
          throw new Error('Wrong format please try again');
        const [quantity, unit, description] = ingArray;

        return {
          quantity: quantity ? +quantity : null,
          unit: unit,
          description: description,
        };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    // upload data
    const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
    // set as current recipe
    state.recipe = createRecipeObj(data);
    // Make bookmarked
    addBookmark(state.recipe);
  } catch (err) {
    console.log(err);
  }
};
