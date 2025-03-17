import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAppState } from "src/app/modal";

 const recipesSelect = createFeatureSelector<IAppState>('recipes')

export const recipeSelector = createSelector(recipesSelect,(state)=>{
    console.log(state);
    
    return state
})