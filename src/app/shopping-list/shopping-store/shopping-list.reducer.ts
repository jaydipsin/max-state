import { Ingredient } from 'src/app/shared/ingredient.model';
import * as shoppingListAction from './shopping-list.action';
import { createReducer, on } from '@ngrx/store';
import { IShoppingListState } from 'src/app/modal';

export const InitialState: IShoppingListState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editIngredient: null,
  editIngredientIndex: -1,
};

// export function shoppingListReducer(
//   state = State,
//   action: shoppingListAction.ShoppingListAction
// ) {
//   switch (action.type) {
//     case shoppingListAction.ADD_INGREDIENT:
//       return {
//         ...state,
//         ingredients: [...state.ingredients, action.ingredient],
//       };
//     case shoppingListAction.ADD_INGREDIENTS:
//       return {
//         ...state,
//         ingredients: [...state.ingredients, ...action.Ingredient],
//       };
//     case shoppingListAction.UPDATE_INGREDIENT:
//       console.log(action);
//       return state;
//     // // const {ingredient,index} = action;
//     // const ingredient = state.ingredients[action.index];
//     // const updatedIngredient = {
//     //   ...ingredient,
//     //   ...action,
//     // };
//     // return {
//     //   ...state,
//     //   ingredients: [
//     //     ...state.ingredients,
//     //     (state.ingredients[action.index] = action.ingredient),
//     //   ],
//     // };
//     case shoppingListAction.DELETE_INGREDIENT:
//       return {
//         ...state,
//         ingredients: state.ingredients.filter(
//           (ingredient, index) => index !== action.index
//         ),
//       };
//     default: {
//       return state;
//     }
//   }
// }

export const shoppingListReducer = createReducer(
  InitialState,
  on(shoppingListAction.AddIngredientAction, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, action.ingredient],
    };
  }),
  on(shoppingListAction.AddIngredientsAction, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, ...action.Ingredient],
    };
  }),
  on(shoppingListAction.UpdateIngredient, (state, action) => {
    let updatedIngredient = [...state.ingredients];
    updatedIngredient[state.editIngredientIndex] = {
      ...state.ingredients[state.editIngredientIndex],
      ...action.ingredient,
    };
    return {
      ...state,
      ingredients: updatedIngredient,
      editIngredient:null,
      editIngredientIndex:-1,
    };
  }),
  on(shoppingListAction.DeleteIngredientAction, (state, action) => {
    return {
      ...state,
      ingredients: state.ingredients.filter(
        (data, index) => index !== state.editIngredientIndex
      ),
    };
  }),
  on(shoppingListAction.StartEditAction, (state, action) => {
    console.log('Reducer received state:', state);
    console.log('Reducer received action:', action);

    // Validate index
    if (action.index < 0 || action.index >= state.ingredients.length) {
      console.error('Invalid index:', action.index);
      return state; // Return unchanged state if index is out of bounds
    }

    const selectedIngredient = { ...state.ingredients[action.index] };
    console.log('Selected Ingredient:', selectedIngredient);

    return {
      ...state,
      editIngredientIndex: action.index,
      editIngredient: selectedIngredient,
    };
  }),
  on(shoppingListAction.StopEditAction, (state, action) => {
    return { ...state, editIngredient: null, editIngredientIndex: -1 };
  })
);
