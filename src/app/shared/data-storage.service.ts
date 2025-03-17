import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { IAppState } from '../modal';
import { Store } from '@ngrx/store';
import { setRecipesAction } from '../recipes/store/recipe.action';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
    private store: Store<IAppState>
  ) {}

  storeRecipes() {
    console.log('storeRecipes');
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://auth-test-c4bd3-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://auth-test-c4bd3-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          console.log(recipes);
          this.store.dispatch(setRecipesAction({ Recipe: [...recipes] }));
          // this.recipeService.setRecipes(recipes);
        })
      );
  }
}
