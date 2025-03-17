import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[RECIPES] setting recipe';
export const GET_RECIPES = '[RECIPES] getting the state';
export const ADD_RECIPES = '[RECIPES] adding recipes'
export const UPDATE_RECIPES = '[RECIPES] update recipes'
export const DELETE_RECIPES = '[RECIPES] delete recipes'



export const setRecipesAction = createAction(SET_RECIPES,props<{Recipe:Recipe[]}>());
export const getRecipesAction = createAction(GET_RECIPES);
export const addRecipesAction = createAction(ADD_RECIPES,props<Recipe>());
export const updateRecipesAction = createAction(UPDATE_RECIPES);
export const deleteRecipesAction = createAction(DELETE_RECIPES);



