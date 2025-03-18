import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import {
  addRecipesAction,
  deleteRecipesAction,
  fetchRecipeAction,
  setRecipesAction,
  storeRecipeAction,
} from './recipe.action';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/modal';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Injectable()
export class RecipesEffects {
  fetchRecipe$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fetchRecipeAction),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          'https://auth-test-c4bd3-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
        );
      }),
      map((recipes) => {
        console.log(recipes);

        return recipes.map((recipe) => {
          console.log(recipe);
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipe) => {
        localStorage.setItem('recipes', JSON.stringify(recipe));
        return setRecipesAction({ Recipe: recipe });
      })
    );
  });

  storeRecipe$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(storeRecipeAction),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([_, recipeState]) => {
          return this.http.patch(
            'https://auth-test-c4bd3-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
            {...recipeState.recipes}
          );
        })
      );
    },
    { dispatch: false }
  );

  deleteRecipe$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(deleteRecipesAction),
        switchMap((action) => {
          localStorage.setItem('recipes',JSON.stringify(this.dataService.updatedStorage('recipes',action.index)));
          return this.http.delete(
            `https://auth-test-c4bd3-default-rtdb.asia-southeast1.firebasedatabase.app/recipes/${action.index}.json`
          );
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private action$: Actions,
    private store: Store<IAppState>,
    private http: HttpClient,
    private dataService:DataStorageService
  ) {}
}
