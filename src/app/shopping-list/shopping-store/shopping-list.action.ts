import { Action, createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = ' [shopping-list]  Add ingredient';
export const ADD_INGREDIENTS = ' [shopping-list]  Add ingredients';
export const UPDATE_INGREDIENT = ' [shopping-list]  Update ingredient';
export const DELETE_INGREDIENT = ' [shopping-list]  Delete ingredient';
export const START_EDIT = ' [shopping-list]  Start edit ';
export const STOP_EDIT = ' [shopping-list]  Stop edit';

export const AddIngredientAction = createAction(
  ADD_INGREDIENT,
  props<{ ingredient: Ingredient }>()
);

export const AddIngredientsAction = createAction(
  ADD_INGREDIENTS,
  props<{ Ingredient: Ingredient[] }>()
);

export const UpdateIngredient = createAction(
  UPDATE_INGREDIENT,
  props<{ ingredient: Ingredient }>()
);

export const DeleteIngredientAction = createAction(DELETE_INGREDIENT);
export const StartEditAction = createAction(
  '[Shopping List] Start Edit',
  props<{ index: number }>()
);

export const StopEditAction = createAction(START_EDIT);

export type ShoppingListAction =
  | ReturnType<typeof AddIngredientAction>
  | ReturnType<typeof AddIngredientsAction>
  | ReturnType<typeof UpdateIngredient>
  | ReturnType<typeof DeleteIngredientAction>
  | ReturnType<typeof StartEditAction>
  | ReturnType<typeof StopEditAction>;
