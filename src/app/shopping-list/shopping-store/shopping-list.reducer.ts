import { Ingredient } from 'src/app/shared/ingredient.model';

const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
};


export function shoppingListReducer(state = initialState,action){

}