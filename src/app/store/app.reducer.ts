import { ActionReducerMap, createReducer } from '@ngrx/store';
import * as fromShoppingList from '../shopping-list/shopping-store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../recipes/store/recipe.reducer'
import { IAppState } from '../modal';

export const AppReducer: ActionReducerMap<IAppState> = {
  auth: fromAuth.AuthReducer,
  shoppingList: fromShoppingList.shoppingListReducer,
  recipes:fromRecipes.RecipeReducer
};
