import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import { Store } from '@ngrx/store';
import { fetchRecipeAction, setRecipesAction } from './store/recipe.action';
import { Actions, ofType } from '@ngrx/effects';
import { map, take } from 'rxjs';
import * as fromModal from '../modal';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipeService,
    private store: Store<fromModal.IAppState>,
    private action$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(fetchRecipeAction());
    return this.action$.pipe(ofType(setRecipesAction),
      take(1),
      map((recipe) => recipe.Recipe)
  )
  }
}
