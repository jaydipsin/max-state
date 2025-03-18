import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[RECIPES] setting recipe';
export const GET_RECIPES = '[RECIPES] getting the state';
export const ADD_RECIPES = '[RECIPES] adding recipes'
export const UPDATE_RECIPES = '[RECIPES] update recipes'
export const DELETE_RECIPES = '[RECIPES] delete recipes'
export const FETCH_RECIPES = '[RECIPES] fetching recipes'
export const STORE_RECIPES = '[RECIPES] storing the recipes in database'


export const setRecipesAction = createAction(SET_RECIPES,props<{Recipe:Recipe[]}>());
export const getRecipesAction = createAction(GET_RECIPES);
export const addRecipesAction = createAction(ADD_RECIPES,props<{recipe:Recipe}>());
export const updateRecipesAction = createAction(UPDATE_RECIPES,props<{index:number,newRecipe:Recipe}>());
export const deleteRecipesAction = createAction(DELETE_RECIPES,props<{index:number}>());
export const fetchRecipeAction = createAction(FETCH_RECIPES)
export const storeRecipeAction = createAction(STORE_RECIPES)


