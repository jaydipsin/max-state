import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import {
  addRecipesAction,
  deleteRecipesAction,
  getRecipesAction,
  setRecipesAction,
  updateRecipesAction,
} from './recipe.action';
import { Recipe } from '../recipe.model';

export const InitialState = {
  recipes: [],
};

export const RecipeReducer = createReducer(
  InitialState,
  on(addRecipesAction, (state, action) => {
    return {
      ...state,
      recipes: [...state.recipes, action.recipe],
    };
  }),
  on(updateRecipesAction, (state, action) => {
    const updateRecipe = {
      ...state.recipes[action.index],
      ...action.newRecipe,
    };
    const updateRecipes = [...state.recipes];
    updateRecipe[action.index] = updateRecipe;

    return {
      ...state,
      recipes: updateRecipes,
    };
  }),
  on(deleteRecipesAction, (state, action) => {
    const updateRecipes = state.recipes.filter(
      (data, index) => index !== action.index
    );
    return {
      ...state,
      recipes: updateRecipes,
    };
  }),
  on(setRecipesAction, (state, action) => {
    return {
      ...state,
      recipes: [...action.Recipe],
    };
  })
);
