import { state } from "@angular/animations"
import { createReducer, on } from "@ngrx/store"
import { getRecipesAction, setRecipesAction } from "./recipe.action"

export const InitialState = {
    recipes:[],
}



export const RecipeReducer = createReducer(InitialState,
    on(setRecipesAction,(state,action)=>{
        return {
            ...state,
            recipes:[...action.Recipe]
        }
    }),
)